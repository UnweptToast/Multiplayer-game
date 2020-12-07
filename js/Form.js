class Form {
    constructor() 
    {
        this.input = createInput("Name");
        this.input.position(280, 350)
        this.buttonr = createButton("Play as Red");
        this.buttonr.size(90, 25)
        this.buttonr.position(260, 400)
        this.buttonb = createButton("Play as Blue");
        this.buttonb.size(90, 25)
        this.buttonb.position(360, 400)
        this.greeting;
        this.title = createElement('h1');
        this.title.html("Multiplayer Game");
        this.title.position(240, 150)
    }

    display() {
        var name;
        var controlRef;
        var Controll;
        var ControL;
        //var opponentControlling;
        this.buttonb.mousePressed(() => {
            this.buttonr.hide();
            this.buttonb.hide();
            this.input.hide();

            name = this.input.value();
            this.greeting = createElement('h4');
            this.greeting.html("Hi " + name + ". Waiting for the other player to join");
            this.greeting.position(200, 350)

            playerCount += 1;
            player.updateCount(playerCount);
            player.index = playerCount;
            player.name = name;
            player.controlling = "Blue";
            player.update();

            if(playerCount === 2) {
                gameState = 1;
                game.updateState(gameState)
            }

            if(player.index === 2) {
                controlRef = database.ref('players/player1');
                controlRef.on("value", function(data) {
                    Controll = data.val();
                    ControL = Controll.controlling;
                })

                if(ControL === "Red") {
                    player.controlling = "Blue";
                }
                else if(ControL === "Blue") {
                    player.controlling = "Red";
                }
                player.update();
            }
           
           
           
            /* if(player.index === 2) {
                Player.getPlayerInfo();
                opponentControlling = allPlayers[0].controlling;
                if(opponentControlling === "Red") {
                   player.changeControl("Blue")
                }
                else if(opponentControlling === "Blue") {
                    player.changeControl("Red")
                }
            }

                console.log(opponentControlling)
                */
        });
        this.buttonr.mousePressed(() => {
            this.buttonr.hide();
            this.buttonb.hide();
            this.input.hide();

            name = this.input.value();
            this.greeting = createElement('h4');
            this.greeting.html("Hi " + name + ". Waiting for the other player to join");
            this.greeting.position(200, 350)

            playerCount += 1;
            player.updateCount(playerCount);
            player.index = playerCount;
            player.name = name;
            player.controlling = "Red";
            player.update();

            if(playerCount === 2) {
                gameState = 1;
                console.log("Hii")
                game.updateState(gameState)
            }


            if(player.index === 2) {
                controlRef = database.ref('players/player1');
                controlRef.on("value", function(data) {
                    Controll = data.val();
                    ControL = Controll.controlling;
                })

                if(ControL === "Red") {
                    player.controlling = "Blue";
                }
                else if(ControL === "Blue") {
                    player.controlling = "Red";
                }
                player.update();
            }
            /*
            if(player.index === 2) {
                Player.getPlayerInfo();
                opponentControlling = allPlayers[0].controlling;
                if(opponentControlling === "Red") {
                   player.changeControl("Blue")
                }
                else if(opponentControlling === "Blue") {
                    player.changeControl("Red")
                }
            }
                console.log(opponentControlling)
                */
        })

        
    }

    hide() {
        this.title.hide();
        this.input.hide();
        this.greeting.hide();
        this.buttonb.hide();
        this.buttonr.hide();
    }
}