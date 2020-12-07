class Player {
    constructor() {
        this.name = null;
        this.index = null;
        this.controlling = "";
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function(data) {
            playerCount = data.val();
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        if(this.index === 1) {
        database.ref(playerIndex).set({
            x: p1.x,
            y: p1.y,
            name: this.name,
            controlling: this.controlling
        })
        }
        else if(this.index === 2) {
            database.ref(playerIndex).set({
                x: p2.x,
                y: p2.y,
                name: this.name,
                controlling: this.controlling
            })
        }
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    changeControl(playerColor) {
        database.ref("players/player2").update({
            controlling: playerColor
        });
    }

    static getPlayerInfo() {
        var playerCountRef = database.ref('players');
        playerCountRef.on("value", function(data) {
            allPlayers = data.val();
        })
    }

}