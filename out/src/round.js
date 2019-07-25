// import { Player } from "./player";
// import { Set } from "./set";
// import { Action, ActionType } from "./actions";
// import { Tile } from "./tile";
//let Player = require('./player').Player;
let TileSet = require('./set').TileSet;
let Action = require('./actions').Action;
let ActionType = require('./actions').ActionType;
//let Tile = require('./tile').Tile;
class _Round {
    constructor(players) {
        this._players = players;
        this._set = new TileSet();
        this._availableTile = null;
    }
    get availableTile() {
        return this._availableTile;
    }
    StartRound() {
        console.log("Round Started.");
        this._set.DealHands(this._players);
        //this.PlayerTurn(0);
    }
    PlayerTurn(playerIndex) {
        //if set is not empty
        console.log('Player ' + playerIndex + '\'s turn:');
        this._set.DealTile(this._players[playerIndex]); //deal tile to first player
        let playerAction = this._players[playerIndex].GetAction(this._availableTile);
        switch (playerAction.type) {
            case ActionType.Discard: {
                this.PostPlayerAction(playerIndex);
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
    PostPlayerAction(playerIndex) {
        this._availableTile = this._players[playerIndex].GetDiscard();
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
};
