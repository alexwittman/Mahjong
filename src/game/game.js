// import { Round } from "./round";
// import { Player } from "./player";
let Round = require('./round').Round;
let Player = require('./player').Player;

/**
 * Class to hold an instance of a mahjong game.
 */
class _Game {

    /**
     * Constructor for Game class.
     * 
     * Creates 4 players.
     */
    constructor() {
        this._players = [];
        for(let i = 0; i < 4; i++){
            this._players.push(new Player(i));
        }
    }

    /**
     * Begins a game by starting the first round.
     */
    StartGame() {
        console.log("Game Started.")
        this.StartRound();
    }

    /**
     * Starts a round of the game.
     */
    StartRound() {
        console.log("Round Started.")
        let round = new Round(this._players);
        round.StartRound();
    }
}

module.exports = {
    Game: _Game
}