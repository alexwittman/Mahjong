// import { Player } from "./player";
// import { Set } from "./set";
// import { Action, ActionType } from "./actions";
// import { Tile } from "./tile";

let Player = require('./player').Player;
let TileSet = require('./set').TileSet;
let Action = require('./actions').Action;
let ActionType = require('./actions').ActionType;
let Tile = require('./tile').Tile;

/**
 * Class to hold round information.
 */
class _Round {

    /**
     * Constructs a new round with the given players.
     * 
     * @param {Player[]} players The list of 4 players to participate in the round.
     */
    constructor(players){
        this._players = players;
        this._set = new TileSet();
        this._availableTile = null;
    }

    /**
     * Getter method for the currently available tile to steal.
     * 
     * @returns {Tile} The currently available tile.
     */
    get availableTile() {
        return this._availableTile;
    }

    /**
     * Starts a round.
     */
    StartRound() {
        console.log("Round Started.");
        this._set.DealHands(this._players);
        this.PlayerTurn(0);
    }

    /**
     * Executes a player's turn.
     * 
     * @param {number} playerIndex The player index of whose turn it is.
     */
    async PlayerTurn(playerIndex){
        //if set is not empty
        console.log('Player ' + playerIndex + '\'s turn:');
        this._set.DealTile(this._players[playerIndex]); //deal tile to first player
        // console.log(this._players);
        // console.log(playerIndex);
        // console.log(this._players[playerIndex].GetAction());
        let playerAction = this._players[playerIndex].GetAction(this._availableTile);
        switch(playerAction["action"]){
            case ActionType.Discard: {
                this.PostPlayerAction(playerIndex, playerAction["discard"]);
            }
            case ActionType.Chi: {
                //not possible
            }
            case ActionType.Pon: {
                //not possible
            }
            case ActionType.Kan: {
                //declare kan
                //see if any other player can rob the kong
                //if they take an action start their turn
                //draw from dead wall

                this.PostPlayerAction(playerIndex);
            }
            case ActionType.Riichi: {
                //declare riichi

                this.PostPlayerAction(playerIndex);
            }
            case ActionType.Ron: {
                // not possible
            }
            case ActionType.Tsumo: {
                //declare tsumo
                //end round
            }
        }
        //start next player's turn
        playerIndex = (playerIndex + 1) % 4;
        this.PlayerTurn(playerIndex);
    }

    /**
     * 
     * 
     * @param {*} playerIndex 
     */
    PostPlayerAction(playerIndex, availableTile) {
        this._availableTile = availableTile;
        this.PlayerInterject(playerIndex);
    }

    PlayerInterject(playerIndex) {
        //calculate all other player actions besides playerIndex's
        //present each player with possible actions
        //if they take an action, start their turn
    }
}

module.exports = {
    Round: _Round
}