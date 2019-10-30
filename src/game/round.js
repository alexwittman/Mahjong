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
    constructor(players, roundNumber, roundWind) {
        this._players = players;
        this._set = new TileSet();
        this._availableTile = null;
        this._roundWind = roundWind;
        this._roundNumber = roundNumber;
        this._doraIndicators = this._set.GetDoraIndicator();
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
        //TODO: return the final result of the round back to the game class.
    }

    /**
     * Executes a player's turn.
     * 
     * @param {number} playerIndex The player index of whose turn it is.
     */
    PlayerTurn(playerIndex) {
        this._RoundOver = !this._set.DealTile(this._players[playerIndex]); //deal tile to first player
        if (!this._RoundOver) {
            console.log('\n\n\n\n\n\n\nPlayer ' + playerIndex + '\'s turn:');
            this.PlayerAction(playerIndex);
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
        } else {
            this.EndRound();
        }
    }

    /**
     * Prompts the player whose turn it is.
     * Handles the action the player takes.
     * 
     * @param {number} playerIndex The index of player whose turn it is.
     */
    PlayerAction(playerIndex) {
        this._players[playerIndex].hand.Print();
        if (this._players[playerIndex]._drawnTile) console.log(this._players[playerIndex]._drawnTile.unicode)
        let playerAction = this._players[playerIndex].GetAction(this.GetGameState());
        switch (playerAction["action"]) {
            case ActionType.Discard:
                break;
            case ActionType.Kan: {
                this._doraIndicators.concat(this._set.GetDoraIndicator());
                if (!this._set.DealDeadWall(this._players[playerIndex])) {
                    console.log("5 kongs declared => draw");
                    this.EndRound();
                }
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

    /**
     * Propmts the player if they can interject with an action.
     * Handles the player's interjection, if they execute one.
     * 
     * @param {number} playerIndex The player who might be able to interject.
     */
    PlayerInterject(playerIndex) {
        console.log('\n\nPlayer ', playerIndex, '\'s interject:');
        console.log("Available Tile: ", this._availableTile.number);
        this._players[playerIndex].hand.Print();
        let playerAction = this._players[playerIndex].GetInterject(this.GetGameState());
        if (playerAction != null) {
            switch (playerAction["action"]) {
                case ActionType.Chi:
                case ActionType.Pon:
                case ActionType.Kan: {
                    //draw tile from dead wall // TODO
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

    /**
     * Ends the round when the set is empty or if a player wins.
     * 
     * @param {Object} WinningHand 
     */
    EndRound(WinningHand = null) {
        if (WinningHand != null) {
            console.log("CONGRATULATIONS!!!!!!!")
            console.log(WinningHand);
        } else {
            console.log("DRAW");
        }
    }

    /**
     * Gets the game state that the current player can see.
     */
    GetGameState() {
        return {
            "roundWind": this._roundWind,
            "roundNumber": this._roundNumber,
            "doraIndicators": this._doraIndicators,
            "discards": this.GetDiscards(),
            "availableTile": this._availableTile
        }
    }

    GetDiscards() {
        let discards = [];
        for (let i = 0; i < 4; i++) {
            discards.concat(this._players._discards);
        }
        return discards;
    }
}

module.exports = {
    Round: Round
}