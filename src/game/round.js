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
    PlayerTurn(playerIndex){
        console.log('\n\n\n\n\n\n\nPlayer ' + playerIndex + '\'s turn:');
        this._set.DealTile(this._players[playerIndex]); //deal tile to first player
        let didPlayerWin = this.PlayerAction(playerIndex);
        if(!didPlayerWin){
            let newIndex = -1;
            for(let i = 1; i <= 3; i++){
                newIndex = this.PlayerInterject((playerIndex + 1) % 4);
                if(newIndex != -1) break;
            }
            if(newIndex != -2){
                playerIndex = (newIndex == -1) ? (playerIndex + 1) % 4 : newIndex;
                this.PlayerTurn(playerIndex);
            }
        }
    }

    PlayerAction(playerIndex) {
        let playerAction = this._players[playerIndex].GetAction();
        switch(playerAction["action"]){
            case ActionType.Discard: break;
            case ActionType.Kan: {
                //draw tile from dead wall
                this._set.DealTile(this._players[playerIndex]); //TODO: change this to draw from dead wall.
                this.PlayerAction(playerIndex);
            }
            case ActionType.Riichi: break;
            case ActionType.Tsumo: {
                this.EndRound(playerAction['value']);
                return true;
            }
        }
        this.PostPlayerAction(playerAction["discard"]);
        return false;
    }

    /**
     * 
     * 
     * @param {*} playerIndex 
     */
    PostPlayerAction(availableTile) {
        this._availableTile = availableTile;
    }

    PlayerInterject(playerIndex) {
        let playerAction = this._players[playerIndex].GetInterject(this._availableTile);
        if(playerAction != null){
            switch(playerAction["action"]){
                case ActionType.Chi:
                case ActionType.Pon:
                case ActionType.Kan: {
                    //draw tile from dead wall
                    return playerIndex;
                }
                case ActionType.Ron: {
                    this.EndRound(playerAction['value']);
                    return -2;
                }
            }
        }
        return -1;
    }

    EndRound(WinningHand){
        console.log("CONGRATULATIONS!!!!!!!")
        console.log(WinningHand);
    }
}

module.exports = {
    Round: _Round
}