// import { Player } from "./player";
// import { Set } from "./set";
// import { Action, ActionType } from "./actions";
// import { Tile } from "./tile";

let Player = require('./player').Player;
let TileSet = require('./set').TileSet;
let Action = require('./actions').Action;
let ActionType = require('./actions').ActionType;
let Tile = require('./tile').Tile;
let Discard = require('./discard').Discard;
let Value_Calculator = require('./value_calculator').Value_Calculator;

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
     * @returns {Discard} The currently available tile.
     */
    get availableTile() {
        return this._availableTile;
    }

    /**
     * Starts a round.
     */
    StartRound() {
        console.log("Round Started.");
        for (let player of this._players) {
            player.Reset();
        }
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
            console.log('\n\n\n\n\n\n\nTiles Left: ', this._set._set.length);
            console.log('Player ' + playerIndex + '\'s turn:');
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
                if (this._players.filter((player) => player._hasRiichid).every((hasRiichid) => hasRiichid)) {
                    console.log('4 riichis declared => draw');
                    this.EndRound();
                }
                break;
            case ActionType.Tsumo: {
                this.EndRound(playerAction);
                this._RoundOver = true;
            }
        }
        this.PostPlayerAction(playerAction["discard"]);
    }

    /**
     * Sets the available discard on the table for other players
     * to take.
     * 
     * @param {Discard} discard The discard available.
     */
    PostPlayerAction(discard) {
        this._availableTile = discard;
    }

    /**
     * Propmts the player if they can interject with an action.
     * Handles the player's interjection, if they execute one.
     * 
     * @param {number} playerIndex The player who might be able to interject.
     */
    PlayerInterject(playerIndex) {
        console.log('\n\nPlayer ', playerIndex, '\'s interject:');
        console.log("Available Tile: ", this._availableTile.tile.number);
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
                    this.EndRound(playerAction);
                    this._RoundOver = true;
                }
            }
        }
        return -1;
    }

    /**
     * Ends the round when the set is empty or if a player wins.
     * 
     * @param {Object} EndRoundObject
     */
    EndRound(EndRoundObject = null) {
        let valueCalculator = new Value_Calculator();
        if (EndRoundObject != null) {
            console.log("CONGRATULATIONS!!!!!!!")
            console.log(EndRoundObject);
            let points = valueCalculator.CalculateWinPoints(EndRoundObject);
        } else {
            console.log("DRAW");
            let points = valueCalculator.CalculateDrawPoints(this.GetPlayerHands());
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

    /**
     * Gets all the discards on the table.
     * 
     * @returns {Tile[]} A list of the discards.
     */
    GetDiscards() {
        let discards = [];
        for (let i = 0; i < 4; i++) {
            discards.concat(this._players._discards);
        }
        return discards;
    }

    /**
     * Gets each of the player's hands.
     * 
     * @returns {Hand[]} The list of the player's hands.
     */
    GetPlayerHands() {
        let hands = [];
        for (let i = 0; i < 4; i++) {
            hands.push(this._players[i].hand);
        }
        return hands;
    }
}

module.exports = {
    Round: Round
}