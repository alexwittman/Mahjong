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
class Round {

    /**
     * Constructs a new round with the given players.
     * 
     * @param {Player[]} players The list of 4 players to participate in the round.
     */
    constructor(players) {
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
    PlayerTurn(playerIndex) {
        console.log('\n\n\n\n\n\n\nPlayer ' + playerIndex + '\'s turn:');
        this._set.DealTile(this._players[playerIndex]); //deal tile to first player
        this.PlayerAction(playerIndex);
        if (!this._RoundOver) {
            let newIndex = -1;
            for (let i = 1; i <= 3; i++) {
                newIndex = this.PlayerInterject((playerIndex + i) % 4);
                if (newIndex != -1) break;
            }
            if (!this._RoundOver) {
                if (newIndex == -1) {
                    if (!this._RoundOver) this.PlayerTurn((playerIndex + 1) % 4);
                } else if (!this._RoundOver) this.PlayerAction(newIndex);
                if (!this._RoundOver) this.PlayerTurn((newIndex + 1) % 4);
            }
        }
    }

    PlayerAction(playerIndex) {
        this._players[playerIndex].hand.Print();
        if (this._players[playerIndex]._drawnTile) console.log(this._players[playerIndex]._drawnTile.unicode)
        let playerAction = this._players[playerIndex].GetAction();
        switch (playerAction["action"]) {
            case ActionType.Discard:
                break;
            case ActionType.Kan: {
                //draw tile from dead wall
                this._set.DealTile(this._players[playerIndex]); //TODO: change this to draw from dead wall.
                this.PlayerAction(playerIndex);
            }
            case ActionType.Riichi:
                break;
            case ActionType.Tsumo: {
                this.EndRound(playerAction['value']);
                this._RoundOver = true;
            }
        }
        this.PostPlayerAction(playerAction["discard"]);
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
        console.log('\n\nPlayer ', playerIndex, '\'s interject:');
        console.log("Available Tile: ", this._availableTile.number);
        this._players[playerIndex].hand.Print();
        let playerAction = this._players[playerIndex].GetInterject(this._availableTile);
        if (playerAction != null) {
            switch (playerAction["action"]) {
                case ActionType.Chi:
                case ActionType.Pon:
                case ActionType.Kan: {
                    //draw tile from dead wall
                    return playerIndex;
                }
                case ActionType.Ron: {
                    this.EndRound(playerAction['value']);
                    this._RoundOver = true;
                }
            }
        }
        return -1;
    }

    EndRound(WinningHand) {
        console.log("CONGRATULATIONS!!!!!!!")
        console.log(WinningHand);
    }
}

module.exports = {
    Round: Round
}