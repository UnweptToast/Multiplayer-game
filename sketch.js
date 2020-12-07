var p1, p2;
var controlling = "None";
var p1Select, p2Select;
var database;
var p1position, p2position;
var  wallUp, wallDown, wallLeft, wallRight;
var wallGroup;
var selection;




var gameState = 1;
var allPlayers;
var playerCount;
var form, player, game;

function setup() {
    database = firebase.database();
    createCanvas(500, 500);

    wallGroup = new Group();
    
    wallUp = createSprite(width/2, -10, width, 20);
    wallDown = createSprite(width/2, height+10, width, 20);
    wallLeft = createSprite(-10, height/2, 20, height);
    wallRight = createSprite(width+10, height/2, 20, height);
    wallGroup.add(wallUp)
    wallGroup.add(wallDown)
    wallGroup.add(wallRight)
    wallGroup.add(wallLeft)

    p1Select = createSprite(0, 0, 100, 30);
    p1Select.shapeColor = "red"

    p1Select = createSprite(width, 0, 100, 30);
    p1Select.shapeColor = "blue"

    p1 = createSprite(100, 100, 20, 20);
    p1.shapeColor = "red";

    p2 = createSprite(400, 400, 30, 30)
    p2.shapeColor = "blue"
    var p1loc = database.ref('players/player1')
    p1loc.on("value", readp1Pos, giveError);

    var p2loc = database.ref('players/player2');
    p2loc.on("value", readp2Pos, giveError);

    var sate = database.ref('gameState');
    sate.on("value", readState, giveError);
    database.ref('/').update({'gameState': 2})

    game = new Game();
    game.getState();
    game.start();

}

function draw() {
    game.play();
    //console.log(gameState);
    background("lightgreen");
    controlling = player.controlling;

    p1.collide(wallGroup);
    p2.collide(wallGroup);

    /*if(p1.x > width || p1.x < 0) {
        p1.velocityX = 0;
    }
    if(p1.y > height || p1.y < 0) {
        p1.velocityY = 0;
    }*/

    if(p1.isTouching(p2)) {
        setState(0);
    }

    if(gameState === 1 || gameState === 0) {

        drawSprites();
        fill(0)
        textSize(20);text("Controlling: " + controlling, 170, 20)
    }

    if(gameState === 1) {
        if(controlling === "Red") {
            if(keyDown("UP_ARROW")) {
                p1.velocityY = -4;
            }
            else if(keyWentUp("UP_ARROW")) {
                p1.velocityY = 0
            }
            if(keyDown("DOWN_ARROW")) {
                p1.velocityY = 4;
            }
            else if(keyWentUp("DOWN_ARROW")) {
                p1.velocityY = 0
            }
            if(keyDown("RIGHT_ARROW")) {
                p1.velocityX = 4;
            }
            else if(keyWentUp("RIGHT_ARROW")) {
                p1.velocityX = 0
            }
            if(keyDown("LEFT_ARROW")) {
                p1.velocityX = -4;
            }
            else if(keyWentUp("LEFT_ARROW")) {
                p1.velocityX = 0
            }

            updatep1Position();

        }
        if(controlling === "Blue") {
            if(keyDown("UP_ARROW")) {
                p2.velocityY = -4;
            }
            else if(keyWentUp("UP_ARROW")) {
                p2.velocityY = 0
            }
            if(keyDown("DOWN_ARROW")) {
                p2.velocityY = 4;
            }
            else if(keyWentUp("DOWN_ARROW")) {
                p2.velocityY = 0
            }
            if(keyDown("RIGHT_ARROW")) {
                p2.velocityX = 4;
            }
            else if(keyWentUp("RIGHT_ARROW")) {
                p2.velocityX = 0
            }
            if(keyDown("LEFT_ARROW")) {
                p2.velocityX = -4;
            }
            else if(keyWentUp("LEFT_ARROW")) {
                p2.velocityX = 0
            }

            updatep2Position();

        }
    }

    else if(gameState === 0) {
        p1.velocityX = 0;
        p1.velocityY = 0;
        p2.velocityX = 0;
        p2.velocityY = 0;
        if(controlling === "Blue") {
            fill(color("black"));
            textSize(45)
            text("YOU WIN!", 150, 250)
        }
        if(controlling === "Red") {
            fill("black");
            textSize(45)
            text("YOU LOSE!", 150, 250)
        }
    }
}

function mouseClicked() {
    if(gameState === 1) {
        if((mouseX >= 0 && mouseX <= 100) && (mouseY >= 0 && mouseY <= 30)) {
            controlling = "Red";
        }

        if((mouseX >= width-100 && mouseX <= width) && (mouseY >= 0 && mouseY <= 30)) {
            controlling = "Blue";
        }
    }
}

function readp1Pos(data) {
    p1position = data.val();
    p1.x = p1position.x;
    p1.y = p1position.y;
}

function giveError() {
    console.log("ERROR");
}

function updatep1Position() {
    database.ref('players/player1').update({
        'x': p1.x,
        'y': p1.y
    })
}

function readp2Pos(data) {
    var p2position = data.val();
    p2.x = p2position.x;
    p2.y = p2position.y;
}

function updatep2Position() {
    database.ref('players/player2').update({
        'x': p2.x,
        'y': p2.y
    })
}

function readState(data) {
    var temp = data.val();
    gameState = temp;
}

function setState(state) {
    gameState = state;
    database.ref('/').update({
        'gameState': state
    })
}

