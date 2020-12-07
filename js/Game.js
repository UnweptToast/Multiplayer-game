class Game {
    constructor() {

    }

    getState() {
        var stateRef = database.ref('gameState');
        stateRef.on("value", function(data) {
            gameState = data.val();
        });
    }

    updateState(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    start() {
        if(gameState === 2) {
            form = new Form();
            form.display();
            player = new Player();
            player.getCount();

            /*if(player.index === 2) {
                Player.getPlayerInfo();
                opponentControlling = allPlayers[0].controlling;
                if(opponentControlling === "Red") {
                   player.changeControl("Blue")
                }
                else if(opponentControlling === "Blue") {
                    player.changeControl("Red")
                }
                console.log(opponentControlling)
              }
            */
        }
    }

    play() {
        if(gameState !== 2) {
            form.hide();
        }
        else if(gameState === 2 && frameCount%50 === 0) {
            this.getState();
        }
    }
}