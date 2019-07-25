// import { Round } from "./round";
// import { Player } from "./player";
let Round = require('./round').Round;
let Player = require('./player').Player;

class _Game {
    private _players;

    constructor() {
        this._players = [];
        for(let i : number = 0; i < 4; i++){
            this._players.push(new Player(i));
        }
    }

    StartGame() {
        console.log("Game Started.")
        this.StartRound();
    }

    StartRound() {
        console.log("Round Started.")
        let round = new Round(this._players);
        round.StartRound();
    }
}

module.exports = {
    Game: _Game
}