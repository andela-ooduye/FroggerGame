var gameOver = false;
var paused = false;
var sound = document.getElementById("fallIntoWater");
var sound1 = document.getElementById("collisionSound");
var sound2 = document.getElementById("playerFootstep");
var sound3 = document.getElementById("gameoverSound");

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // define initial positions and initial speed of enemies
  this.x;
  this.y;
  this.speed = Math.floor((Math.random() * 100) + 50);
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'; 
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (paused) {
    return;
  }
  // When the enemies get outside the canvas visible, they should be recreated
  if(this.x > 600){
    this.createEnemy();
  }
  // update x
  this.x += dt * this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  checkCollisions(this, player);
}

Enemy.prototype.createEnemy = function(){
  // create a random y and a fixed x coordinate value for the enemies to start from
  var y = Math.floor((Math.random() * 4) + 1);
  if(y == 1){
    this.y = 300;
  }
  else if(y == 2){
    this.y = 220;
  }
  else if(y == 3){
    this.y = 140;
  }
  else if(y == 4){
    this.y = 60;
  }
  this.x = -130;
}
// For every time the enemies collide with the player, the live should be decreased by 1
// When the life is zero, player should return to start position and be unable to move
var countLife = function(){
  if(document.getElementById('live').innerHTML > 0){
    document.getElementById('live').innerHTML = document.getElementById('live').innerHTML - 1;
  }
  if(document.getElementById('live').innerHTML <= 0){
    if (sound3) {
      sound3.currentTime = 0;
      sound3.play();
    }
    player.x = 201;
    player.y = 380;
    gameOver = true;
    document.getElementById('over').innerHTML = "Game Over";
    document.getElementById('reload').innerHTML = "<a href='#' onClick = 'location.reload()'>Try Again</a>";
  }
}
// Whenever the enemies and the player collides, call the countLife function which reduces a life
var checkCollisions = function(enemy, player){
  if(enemy.y == player.y) {
    if ((player.x <= enemy.x + 75) && (player.x >= enemy.x - 75)){
      player.x = 201;
      player.y = 380;
      countLife();
      if (sound1) {
        sound1.currentTime = 0;
        sound1.play();
      }
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.x = 201;
  this.y = 380;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Whenever the up, down, right or left key is pressed, the player should move accordingly
// only if the game is not over
// Whenever the space bar key is pressed, the game should pause
Player.prototype.handleInput = function(arg){
  if(arg === "space" ){
    pauseGame();
  }
  if(!gameOver){
    if(arg === "left"){
      if(this.x - 100 >= 1){
        this.x = this.x - 100;
        if (sound2) {
          sound2.currentTime = 0;
          sound2.play();
        }
      }
    }
    else if(arg === "right"){
      if(this.x + 100 <= 401){
        this.x = this.x + 100;
        if (sound2) {
          sound2.currentTime = 0;
          sound2.play();
        }
      }
    }
    else if(arg === "up"){
      if(this.y - 80 >= 60){
        this.y = this.y - 80;
        if (sound2) {
          sound2.currentTime = 0;
          sound2.play();
        }
      }
      else {
        this.x = 201;
        this.y = 380;
        document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 10;
        for(var x in allEnemies){
          allEnemies[x].speed = allEnemies[x].speed + Math.floor((Math.random() * 50) + 25);
        }
        if (sound) {
          sound.currentTime = 0;
          sound.play();
        }
      }
    }
    else if(arg === "down"){
      if(this.y + 80 <= 380){
        this.y = this.y + 80;
        if (sound2) {
          sound2.currentTime = 0;
          sound2.play();
        }
      }
    }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var x = 1; x <= 5; x++){
  var enemy1 = new Enemy();
  enemy1.createEnemy();
  allEnemies.push(enemy1);
}
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
// When the how to play help link is clicked, a modal window displaying information on how to
// play the game appears and the game pauses
document.getElementById('opensModal').addEventListener("click", function(e) {
  // When the X button is clicked, the game should resume from its paused state
  document.getElementById('closeModal').addEventListener("click", function(e){
    pauseGame();
  });
  //call the function that will pause the game
  pauseGame();
});
// When the first image of the right is selected, the player name and character should be Tunde
document.getElementById('selectBoy').addEventListener("click", function(e){
  document.getElementById('charName').innerHTML = "Tunde";
  var name = document.getElementsByClassName('name');
  for (var x = 0; x < name.length; x++) {
    name[x].innerHTML = 'Tunde';
  }
  var noun = document.getElementsByClassName('noun');
  for (var x = 0; x < noun.length; x++){
    noun[x].innerHTML = 'boy'
  }
  var upperp = document.getElementsByClassName('upper-p');
  for (var x = 0; x < upperp.length; x++){
    upperp[x].innerHTML = 'He';
  }
  var lowerp = document.getElementsByClassName('lower-p');
  for (var x = 0; x < lowerp.length; x++){
    lowerp[x].innerHTML = 'he';
  }
  var secondp = document.getElementsByClassName('second-p');
  for (var x = 0; x < secondp.length; x++){
    secondp[x].innerHTML = 'his';
  }
  var nameu = document.getElementsByClassName('name-u');
  for (var x = 0; x < nameu.length; x++){
    nameu[x].innerHTML = 'TUNDE!!';
  }
  player.sprite = 'images/char-boy.png';
});
// When the second image on the right is selected, the player name and character should be Seyi
document.getElementById('selectCatGirl').addEventListener("click", function(e){
  document.getElementById('charName').innerHTML = "Seyi";
  var name = document.getElementsByClassName('name');
  for (var x = 0; x < name.length; x++) {
    name[x].innerHTML = 'Seyi';
  }
  var noun = document.getElementsByClassName('noun');
  for (var x = 0; x < noun.length; x++){
    noun[x].innerHTML = 'girl'
  }
  var upperp = document.getElementsByClassName('upper-p');
  for (var x = 0; x < upperp.length; x++){
    upperp[x].innerHTML = 'She';
  }
  var lowerp = document.getElementsByClassName('lower-p');
  for (var x = 0; x < lowerp.length; x++){
    lowerp[x].innerHTML = 'she';
  }
  var secondp = document.getElementsByClassName('second-p');
  for (var x = 0; x < secondp.length; x++){
    secondp[x].innerHTML = 'her';
  }
  var nameu = document.getElementsByClassName('name-u');
  for (var x = 0; x < nameu.length; x++){
    nameu[x].innerHTML = 'SEYI!!';
  }
  player.sprite = 'images/char-cat-girl.png';
});
// When the third image on the right is selected, the player name and character should be Ejiro
document.getElementById('selectHornGirl').addEventListener("click", function(e){
  document.getElementById('charName').innerHTML = "Ejiro";
  var name = document.getElementsByClassName('name');
  for (var x = 0; x < name.length; x++) {
    name[x].innerHTML = 'Ejiro';
  }
  var noun = document.getElementsByClassName('noun');
  for (var x = 0; x < noun.length; x++){
    noun[x].innerHTML = 'girl'
  }
  var upperp = document.getElementsByClassName('upper-p');
  for (var x = 0; x < upperp.length; x++){
    upperp[x].innerHTML = 'She';
  }
  var lowerp = document.getElementsByClassName('lower-p');
  for (var x = 0; x < lowerp.length; x++){
    lowerp[x].innerHTML = 'she';
  }
  var secondp = document.getElementsByClassName('second-p');
  for (var x = 0; x < secondp.length; x++){
    secondp[x].innerHTML = 'her';
  }
  var nameu = document.getElementsByClassName('name-u');
  for (var x = 0; x < nameu.length; x++){
    nameu[x].innerHTML = 'EJIRO!!';
  }
  player.sprite = 'images/char-horn-girl.png'; 
});
// When the fourth image on the right is selected, the player name and character should be Sayo
document.getElementById('selectPinkGirl').addEventListener("click", function(e){
  document.getElementById('charName').innerHTML = "Sayo";
  var name = document.getElementsByClassName('name');
  for (var x = 0; x < name.length; x++) {
    name[x].innerHTML = 'Sayo';
  }
  var noun = document.getElementsByClassName('noun');
  for (var x = 0; x < noun.length; x++){
    noun[x].innerHTML = 'girl'
  }
  var upperp = document.getElementsByClassName('upper-p');
  for (var x = 0; x < upperp.length; x++){
    upperp[x].innerHTML = 'She';
  }
  var lowerp = document.getElementsByClassName('lower-p');
  for (var x = 0; x < lowerp.length; x++){
    lowerp[x].innerHTML = 'she';
  }
  var secondp = document.getElementsByClassName('second-p');
  for (var x = 0; x < secondp.length; x++){
    secondp[x].innerHTML = 'her';
  }
  var nameu = document.getElementsByClassName('name-u');
  for (var x = 0; x < nameu.length; x++){
    nameu[x].innerHTML = 'SAYO!!';
  }
  player.sprite = 'images/char-pink-girl.png'; 
});
// When the fifth image on the right is selected, the player name and character should be Princess
document.getElementById('selectPrincessGirl').addEventListener("click", function(e){
  document.getElementById('charName').innerHTML = "Princess";
  var name = document.getElementsByClassName('name');
  for (var x = 0; x < name.length; x++) {
    name[x].innerHTML = 'Princess';
  }
  var noun = document.getElementsByClassName('noun');
  for (var x = 0; x < noun.length; x++){
    noun[x].innerHTML = 'girl'
  }
  var upperp = document.getElementsByClassName('upper-p');
  for (var x = 0; x < upperp.length; x++){
    upperp[x].innerHTML = 'She';
  }
  var lowerp = document.getElementsByClassName('lower-p');
  for (var x = 0; x < lowerp.length; x++){
    lowerp[x].innerHTML = 'she';
  }
  var secondp = document.getElementsByClassName('second-p');
  for (var x = 0; x < secondp.length; x++){
    secondp[x].innerHTML = 'her';
  }
  var nameu = document.getElementsByClassName('name-u');
  for (var x = 0; x < nameu.length; x++){
    nameu[x].innerHTML = 'PRINCESS!!';
  }
  player.sprite = 'images/char-princess-girl.png';
});
// This function is called to pause the game
var pauseGame = function(){
  gameOver = (gameOver) ? false : true; //if the gameOver is false make it true and if true make it false
  paused = (paused) ? false : true; // if the paused is false make it true and if true make it false
}