// import { Round } from "./round";
// import { Player } from "./player";
let Round = require('./round').Round;
let Player = require('./player').Player;
let CONST = require('./constants');
let AI = require('./ai').AI;

/**
 * Class to hold an instance of a mahjong game.
 */
class _Game {
    /**
     * Constructor for Game class.
     *
     * Creates 4 players.
     *
     * @param {number} length The number of winds to go through for the game, 1-4.
     */
    constructor(length) {
        this._players = [];
        this._players.push(new Player(0, CONST.EAST, new AI()));
        this._players.push(new Player(1, CONST.SOUTH, new AI()));
        this._players.push(new Player(2, CONST.WEST, new AI()));
        this._players.push(new Player(3, CONST.NORTH, new AI()));
        this._length = length;
    }

    /**
     * Begins a game by starting the first round.
     */
    StartGame() {
        console.log('Game Started.');
        let roundWind = CONST.EAST;
        for (let i = 0; i < this._length; i++, roundWind++) {
            for (let i = 1; i <= 4; i++) {
                this.StartRound(i, roundWind);
            }
        }
    }

    /**
     * Starts a round of the game.
     */
    StartRound(roundNumber, roundWind) {
        console.log('Round ' + roundNumber + ' Started.');
        let round = new Round(this._players, roundNumber, roundWind);
        round.StartRound();
    }
}

module.exports = {
    Game: _Game
};
