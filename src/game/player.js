// import { Hand } from "./hand";
// import { Tile, PrintTileList } from "./tile";
// import { Action, ActionType } from "./actions";

let readline = require('readline');
//let Hand = require('./hand').Hand;
//let Tile = require('./tile').Tile;
//let PrintTileList = require('./tile').PrintTileList;
let Action = require('./actions').Action;
let ActionType = require('./actions').ActionType;
let Tenpai = require('./tenpai').Tenpai;
//let TileListContains = require('./tile').TileListContains;
//let TileListCount = require('./tile').TileListCount;
//let TileListRemoveDuplicates = require('./tile').TileListRemoveDuplicates;
let MeldType = require('./meld').MeldType;
let Meld = require('./meld').Meld;
//let CompareTiles = require('./tile').CompareTiles;
//let CopyTileList = require('./tile').CopyTileList;
let TILE = require('./tile');
let HAND = require('./hand');
let Yaku_Evaluate = require('./yaku_evaluate').Yaku_Evaluate;
let Hand_Partiton = require('./hand_partition').Hand_Partition;

let prompt = require('prompt-sync')();

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

/**
 * Class to hold player information.
 */
class _Player {

    /**
     * Constructor for player class.
     * 
     * @param {number} index The player number for the game.
     */
    constructor(index) {
        this._index = index;
        this._score = 25000;
    }

    /**
     * Getter method for the player's hand.
     * 
     * @returns {HAND.Hand} The player's hand.
     */
    get hand() {
        return this._hand;
    }

    /**
     * Setter method for the player's hand.
     * 
     * @param {HAND.Hand} hand The hand to set as the player's hand.
     */
    set hand(hand) {
        this._hand = hand;
    }

    /**
     * Getter method for the player's score.
     * 
     * @returns {number} The player's score.
     */
    get score() {
        return this._score;
    }

    /**
     * Getter method for the player's index.
     * 
     * @returns {number} The player's index.
     */
    get index() {
        return this._index;
    }

    /**
     * Setter method for the player's drawn tile.
     * 
     * @param {TILE.Tile} tile The tile the player drew.
     */
    set drawnTile(tile) {
        this._drawnTile = tile;
    }

    /**
     * Promts the player for an action when it is their turn.
     */
    GetAction() {
        let actions = this.CalculateActions();
        console.log(this.GetActionStrings(actions));
        let action = prompt(">> ");
        switch(action){
            case '0': { //Discard
                console.log("Discard");
                let discard = this.GetDiscard();
                return {
                    "action": ActionType.Discard,
                    "discard": discard
                };
            }
            case '3': { //Kan
                //TODO
                return ActionType.Kan;
            }
            case '4': { //Riichi
                //TODO
                return ActionType.Riichi;
            }
            case '6': { //Tsumo
                //TODO
                return ActionType.Tsumo;
            }
        }
    }

    /**
     * Promts the player for an action when they can do something
     * and it is not their turn.
     * 
     * @param {TILE.Tile} availableTile The tile available on the table.
     */
    GetInterject(availableTile) {
        //TODO
        let actions = this.CalculateActions(availableTile);
        console.log(this.GetActionStrings(actions));
        let action = prompt(">> ");
        switch(action){
            case '1': { //Chi
                //TODO
                return ActionType.Chi;
            }
            case '2': { //Pon
                //TODO
                return ActionType.Pon;
            }
            case '3': { //Kan
                //TODO
                return ActionType.Kan;
            }
            case '5': { //Ron
                //TODO
                return ActionType.Ron;
            }
        }
    }

    /**
     * Gets the tile the player wants to discard.
     * Adds the drawn tile to the player's hand.
     * Removes that tile from the player's hand.
     */
    GetDiscard() {
        TILE.PrintTileList(this._hand.tiles, this._drawnTile);
        let input = Number(prompt("Enter the tile to discard: "));
        let discard;
        if(input == -1){
            discard = this._drawnTile;
            this._drawnTile = null;
        }
        else{
            discard = this._hand.tiles[input];
            this._hand.remove(this._hand.tiles[input]);
            this._hand.add(this._drawnTile);
            this._drawnTile = null;
        }
        TILE.PrintTileList(this._hand.tiles);
        return discard; 
    }

    /**
     * Calculates all available actions for a player based on the current available tile.
     * 
     * @param {TILE.Tile} availableTile The tile available on the table.
     * @returns {ActionType[]} A list of all possible actions for the player.
     */
    CalculateActions(availableTile) {
        let actions = [ActionType.Discard];
        if(this.CanKan())          actions.push(ActionType.Kan);
        if(this.CanRiichi()) actions.push(ActionType.Riichi);
        if(this.CanTsumo())  actions.push(ActionType.Tsumo);
        return actions;
    }

    /**
     * Calculates all available actions for a player based on the current available tile.
     * 
     * @param {TILE.Tile} availableTile The tile available on the table.
     * @returns {ActionType[]} A list of all possible actions for the player.
     */
    CalculateInterject(availableTile) {
        let tenpai = new Tenpai(this._hand);
        let actions = [];
        if(CanChi(availableTile)) actions.push(ActionType.Chi);
        if(CanPon(availableTile)) actions.push(ActionType.Pon);
        if(CanKan(availableTile)) actions.push(ActionType.Kan);
        if(CanRon(tenpai))        actions.push(ActionType.Ron);
        return actions;
    }

    /**
     * Calculates the chows possible with the current available tile.
     * 
     * @param {TILE.Tile} availableTile The tile available to take.
     * @returns {Meld[]} The list of possible chows.
     */
    ChiMelds(availableTile) {
        let melds = [];
        let suitTiles = this._hand.closedTiles.filter(tile => tile.type == availableTile.type);
        let uniqueSuitTiles = TILE.TileListRemoveDuplicates(suitTiles);
        for(let i = 0; i < uniqueSuitTiles.length - 1; i++){
            let potentialMeld = new Meld([uniqueSuitTiles[i], uniqueSuitTiles[i + 1], availableTile].sort(TILE.CompareTiles));
            if(potentialMeld.type == MeldType.CHOW){
                melds.push(potentialMeld);
            }
        }
        return melds;
    }

    /**
     * Determines if a player can chi given the current game state.
     * 
     * @param {TILE.Tile} availableTile The tile available to take.
     * @returns {boolean} True if the player is able to chi, false otherwise.
     */
    CanChi(availableTile) {
        //if player is the one to the left.
            let possibleChows = ChiMelds(availableTile);
            if(possibleChows.length > 0) return true;
            else return false;
        return false;
    }

    /**
     * Determines if a player can pon given the current game state.
     */
    CanPon(availableTile) {
        return false;
    }

    /**
     * Determines if a player can kan given the current game state.
     */
    CanKan(availableTile = null) {
        if(availableTile == null){
            for(let tile of TILE.TileListRemoveDuplicates(this._hand.tiles)){
                if(TILE.TileListCount(this._hand.tiles, tile) == 4) return true;
            }
            for(let meld of this._hand.melds){
                if(meld.type == MeldType.PONG){
                    if(meld.tiles[0].number == this._drawnTile.number){
                        return true;
                    }
                }
            }
            return false;
        }
        else {
            if(TILE.TileListCount(this._hand.tiles, availableTile) == 3) return true;
        }
        return false;
    }
    
    RiichiTiles() {
        let riichiTiles = [];
        //copy the hand add the available tile
        let handCopy = HAND.CopyHand(this._hand);
        handCopy.add(this._drawnTile);
        let uniqueTiles = TILE.TileListRemoveDuplicates(handCopy.closedTiles);
        //for each tile in the hand
        for(let tile of uniqueTiles) {
            //remove it from the hand
            handCopy.remove(tile);
            //test if there are any tenpai tiles
            let tenpai = new Tenpai(handCopy);
            //if so add them to array and return the array
            if(tenpai.tiles.length > 0){
                riichiTiles.push(new TILE.Tile(tile.number));
            }
            //add the tile back to the hand.
            handCopy.add(tile);
        }
        return riichiTiles;
    }

    /**
     * Determines if a player can riichi given the current game state.
     * 
     * @param {Tile} availableTile The tile available
     */
    CanRiichi() {
        if(this._hand.isOpen) return false;
        else return this.RiichiTiles().length > 0;
    }

    /**
     * Determines if a player can ron given the current game state.
     */
    CanRon(availableTile) {
        //TODO
    }

    /**
     * Determines if a player can tsumo given the current game state.
     */
    CanTsumo() {
        //TODO
    }

    /**
     * Gets a string representation of all available actions.
     * 
     * @param {ActionType[]} actions List of all possible actions.
     * @returns {string} The string of all actions.
     */
    GetActionStrings(actions) {
        let actionString = '';
        for(let action of actions){
            switch(action){
                case ActionType.Discard: {
                    actionString += 'Discard - 0 \n';
                    break;
                }
                case ActionType.Chi: {
                    actionString += 'Chi - 1 \n';
                    break;
                }
                case ActionType.Pon: {
                    actionString += 'Pon - 2 \n';
                    break;
                }
                case ActionType.Kan: {
                    actionString += 'Kan - 3 \n';
                    break;
                }
                case ActionType.Riichi: {
                    actionString += 'Riichi - 4 \n';
                    break;
                }
                case ActionType.Ron: {
                    actionString += 'Ron - 5 \n';
                    break;
                }
                case ActionType.Tsumo: {
                    actionString += 'Tsumo - 6 \n';
                    break;
                }
            }
        }
        actionString += '\n>>';
        return actionString;
    }
}

module.exports = {
    Player: _Player
}