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
let Hand = require('./hand').Hand;
let Yaku_Evaluate = require('./yaku_evaluate').Yaku_Evaluate;
let Hand_Partition = require('./hand_partition').Hand_Partition;

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
                this.GetChi();
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
     * 
     * @returns {Tile} The tile the player discarded.
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
     * Prompts the player for which chow they want to make
     * if there is more than one, otherwise chi the only
     * possible chow.
     * 
     * @param {Tile} availableTile The tile available for the player to take.
     */
    GetChi(availableTile){
        let possibleChows = this.ChiMelds(availableTile);
        let chow;
        if(possibleChows.length > 1){
            let chowPrompt = '';
            for(let possibleChow of possibleChows){
                for(let chowTile of possibleChow.tiles){
                    chowPrompt.push(chowTile.unicode);
                    chowPrompt.push('|');
                }
                chowPrompt.push('  ');
            }
            console.log('Possible Chows:');
            console.log(chowPrompt);
            let pickedChow = prompt('>> ');
            chow = possibleChows[pickedChow];
        }
        else{
            chow = possibleChows[0];
        }
        this.Chi(chow, availableTile);
    }

    /**
     * Calls chi and makes the meld in the player's hand.
     * 
     * @param {Meld} chow The chow to make when calling chi.
     * @param {Tile} availableTile The tile available for the player to call chi on.
     */
    Chi(chow, availableTile){
        let chowTiles = TILE.CopyTileList(chow.tiles);
        chowTiles = TILE.RemoveFromTileList(chowTiles, availableTile);
        for(let tile of chowTiles) {
            this._hand._closedTiles = TILE.RemoveFromTileList(this._hand._closedTiles, tile);
        }
        this._hand._melds.push(new Meld(chow.tiles, true));
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
            let possibleChows = this.ChiMelds(availableTile);
            if(possibleChows.length > 0) return true;
            else return false;
        return false;
    }

    /**
     * Determines if a player can pon given the current game state.
     * 
     * @returns {boolean} True if the player can pon, false otherwise.
     */
    CanPon(availableTile) {
        if(TILE.TileListCount(this._hand.closedTiles, availableTile) >= 2) return true;
        else return false;
    }

    /**
     * Calls pon and makes the meld in the player's hand.
     * 
     * @param {TILE.Tile} availableTile The tile available for the player to take.
     */
    Pon(availableTile){
        for(let i = 0; i < 2; i++){
            this._hand.remove(availableTile);
        }
        this._hand.makeMeld(new Meld([availableTile, availableTile, availableTile], true));
    }

    /**
     * Calculates the kongs possible in the current state.
     * 
     * @param {TILE.Tile} availableTile The tile available to take.
     * @returns {Meld[]} The list of possible kongs.
     */
    KanMelds(availableTile){
        if(availableTile == null){
            let kongs = [];
            let handTilesCopy = TILE.CopyTileList(this._hand._closedTiles);
            if(this._drawnTile) handTilesCopy.push(this._drawnTile);
            let uniqueTiles = TILE.TileListRemoveDuplicates(handTilesCopy);
            for(let tile of uniqueTiles){
                let tileCount = TILE.TileListCount(this._hand.closedTiles, tile);
                if(this._drawnTile) if(this._drawnTile.number == tile.number) tileCount++;
                if(tileCount == 4){
                    kongs.push(new Meld([tile, tile, tile, tile]));
                }
                for(let meld of this._hand.melds){
                    if(meld.type == MeldType.PONG){
                        if(meld.tiles[0].number == tile.number){
                            let meldTilesCopy = TILE.CopyTileList(meld.tiles);
                            meldTilesCopy.push(tile);
                            kongs.push(new Meld(meldTilesCopy, meld.is_open));
                        }
                    }
                }
            }
            return kongs;
        }
        else {
            let kongs = [];
            if(TILE.TileListCount(this._hand.closedTiles, availableTile) == 3) {
                kongs.push(new Meld([availableTile, availableTile, availableTile, availableTile], true));
            }
            return kongs;
        }
    }

    /**
     * Determines if a player can kan given the current game state.
     * 
     * @returns {boolean} True if the player can kan, false otherwise.
     */
    CanKan(availableTile = null) {
        return this.KanMelds(availableTile).length > 0;
    }

    /**
     * Prompts the player for which kong they want to make
     * if there is more than one, otherwise kan the only
     * possible kong.
     * 
     * @param {Tile} availableTile The tile available for the player to take.
     */
    GetKan(availableTile){
        let possibleKongs = this.KanMelds(availableTile);
        let kong;
        if(possibleKongs.length > 1){
            let kongPrompt = '';
            for(let possibleKong of possibleKongs){
                for(let kongTile of possibleKong.tiles){
                    kongPrompt.push(kongTile.unicode);
                    kongPrompt.push('|');
                }
                kongPrompt.push('  ');
            }
            console.log('Possible Kongs:');
            console.log(kongPrompt);
            let pickedKong = prompt('>> ');
            chow = possibleKongs[pickedKong];
        }
        else{
            kong = possibleKongs[0];
        }
        this.Kan(kong, availableTile);
    }

    /**
     * Calls kan and makes the meld in the player's hand.
     * 
     * @param {Meld} kong The kong to make in the player's hand.
     * @param {*} availableTile The tile to take to make the meld.
     */
    Kan(kong, availableTile = null){
        if(availableTile == null){
            if(kong.is_open){ //Making kong with tile in closed tiles and open pong.
                for(let meld of this._hand.melds){
                    if(meld.type = MeldType.PONG){
                        if(meld.tiles[0].number == kong.tiles[0].number){
                            meld = kong;
                        }
                    }
                }
            }
            else{ //Making kong with 4 tiles in closed tiles.
                for(let i = 0; i < 4; i++){
                    this._hand.remove(kong.tiles[0]);
                }
                this._hand.makeMeld(kong);
            }
        }
        else{ //Making kong with 3 tiles in closed tiles and other player's discarded tile.
            for(let i = 0; i < 3; i++){
                this._hand.remove(availableTile);
            }
            this._hand.makeMeld(kong);
        }
    }
    
    /**
     * Calculates the tiles a player can discard and declare riichi.
     * 
     * @returns {Tile[]} The tiles a player can discard and declare riichi.
     */
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
     * @returns {boolean} True if the player can riichi, false otherwise.
     */
    CanRiichi() {
        if(this._hand.isOpen) return false;
        else return this.RiichiTiles().length > 0;
    }

    /**
     * Determines if a player can ron given the current game state.
     * 
     * @returns {boolean} True if the player can ron, false otherwise.
     */
    CanRon(availableTile) {
        let chiMelds = this.chiMelds(availableTile);
        let ponMelds = this.ponMelds(availableTile);
        let possibleMelds = [chiMelds].concat(ponMelds);
        for(let possibleMeld of possibleMelds){
            let handCopy = HAND.CopyHand(this._hand);
            
        }
        //If you can chi or pon the available tile
            //For each possilbe meld
                //make the meld
                //test if the hand still has value
                //return the best possible hand out of all the melds.
    }

    /**
     * Determines if a player can tsumo given the current game state.
     * 
     * @returns {boolean} True if the player can tsumo, false otherwise.
     */
    CanTsumo() {
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let handCopy = HAND.CopyHand(this._hand);
        handCopy.add(this._drawnTile);
        let partitions = handPartitioner.partition(handCopy);
        for(let partition of partitions){
            if(yakuEvaluator.EvaluateYaku(partition).length > 0){
                return true;
            }
        }
        return false;
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