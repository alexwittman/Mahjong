// import { Hand } from './hand';
// import { Tile, PrintTileList } from './tile';
// import { Action, ActionType } from './actions';

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
let Pair = require('./pair').Pair;
let Value_Calculator = require('./value_calculator').Value_Calculator;
let Discard = require('./discard').Discard;

let prompt = require('prompt-sync')();

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Class to hold player information.
 */
class Player {
    /**
     * Constructor for player class.
     * 
     * @param {number} index The player number for the game.
     */
    constructor(index) {
        this._index = index;
        this._discards = [];
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
     * 
     * @param {Object} gameState The current state of the game visible to the player.
     * @returns {Object} The object containing their action.
     */
    GetAction(gameState) {
        let actions = this.CalculateActions(gameState);
        let action = '0';
        if (actions.length > 1) {
            console.log(this.GetActionStrings(actions));
            action = prompt('>> ');
        }
        switch (action) {
            case '3': { //Kan
                this.GetKan();
                return {
                    'action': ActionType.Kan
                };
            }
            case '4': { //Riichi
                //TODO
                return ActionType.Riichi;
            }
            case '6': { //Tsumo
                let value = this.Tsumo();
                return {
                    'action': ActionType.Tsumo,
                    'value': value
                }
            }
            default: { //Discard
                let discard = this.GetDiscard();
                return {
                    'action': ActionType.Discard,
                    'discard': discard
                };
            }
        }
    }

    /**
     * Promts the player for an action when they can do something
     * and it is not their turn.
     * 
     * @param {Object} gameState The current game state visible to the player.
     */
    GetInterject(gameState) {
        let availableTile = gameState['availableTile'].tile;
        let actions = this.CalculateInterject(gameState);
        console.log(this.GetActionStrings(actions));
        let action = '0';
        if (actions.length > 0) {
            action = prompt('>> ');
        }
        switch (action) {
            case '1': { //Chi
                this.GetChi(availableTile);
                return {
                    'action': ActionType.Chi
                }
            }
            case '2': { //Pon
                this._hand = this.Pon(this._hand, availableTile);
                return {
                    'action': ActionType.Pon
                };
            }
            case '3': { //Kan
                this.GetKan(availableTile);
                return {
                    'action': ActionType.Kan
                }
            }
            case '5': { //Ron
                let value = this.Ron(availableTile);
                return {
                    'action': ActionType.Ron,
                    'value': value,
                    'discard': gameState['availableTile'],
                }
            }
        }
        return null;
    }

    /**
     * Gets the tile the player wants to discard.
     * Adds the drawn tile to the player's hand.
     * Removes that tile from the player's hand.
     * 
     * @returns {Discard} The tile the player discarded.
     */
    GetDiscard() {
        //TILE.PrintTileList(this._hand.tiles, this._drawnTile);
        //if (this._drawnTile) TILE.PrintTileList([this._drawnTile]);
        let rawInput = prompt('Enter the tile to discard: ');
        let input;
        if (rawInput == '') input = this._drawnTile.number;
        else input = Number(rawInput);
        let discard;
        if (this._drawnTile != null && input == this._drawnTile.number) {
            discard = this._drawnTile;
            this._drawnTile = null;
        } else {
            discard = new TILE.Tile(input);
            if (this._hand.remove(discard)) {
                if (this._drawnTile) this._hand.add(this._drawnTile);
            }
            this._drawnTile = null;
        }
        //TILE.PrintTileList(this._hand.tiles);
        this._hand.Print();
        this._discards.push(discard);
        return new Discard(discard, this._index);
    }

    /**
     * Prompts the player for which chow they want to make
     * if there is more than one, otherwise chi the only
     * possible chow.
     * 
     * @param {Tile} availableTile The tile available for the player to take.
     */
    GetChi(availableTile) {
        let possibleChows = this.ChiMelds(availableTile);
        let chow;
        if (possibleChows.length > 1) {
            let chowPrompt = '';
            for (let possibleChow of possibleChows) {
                for (let chowTile of possibleChow.tiles) {
                    chowPrompt += (chowTile.unicode);
                    chowPrompt += '|';
                }
                chowPrompt += '  ';
            }
            console.log('Possible Chows:');
            console.log(chowPrompt);
            let pickedChow = prompt('>> ');
            chow = possibleChows[pickedChow];
        } else {
            chow = possibleChows[0];
        }
        this._hand = this.Chi(this._hand, chow, availableTile);
    }

    /**
     * Calls chi and makes the meld in the player's hand.
     * 
     * @param {HAND.Hand} hand The hand to add the chow to.
     * @param {Meld} chow The chow to make when calling chi.
     * @param {Tile} availableTile The tile available for the player to call chi on.
     * @returns {HAND.Hand} The hand with the chow added to it.
     */
    Chi(hand, chow, availableTile, makeHandOpen = true) {
        let chowTiles = TILE.CopyTileList(chow.tiles);
        chowTiles = TILE.RemoveFromTileList(chowTiles, availableTile);
        for (let tile of chowTiles) {
            hand._closedTiles = TILE.RemoveFromTileList(hand._closedTiles, tile);
        }
        hand._melds.push(new Meld(chow.tiles, true));
        if (makeHandOpen) hand.isOpen = true;
        return hand;
    }

    /**
     * Calculates all available actions for a player based on the current available tile.
     * 
     * @param {Object} gameState The current state of the game visible to the player.
     * @returns {ActionType[]} A list of all possible actions for the player.
     */
    CalculateActions(gameState) {
        let actions = [ActionType.Discard];
        if (this.CanKan()) actions.push(ActionType.Kan);
        if (this.CanRiichi()) actions.push(ActionType.Riichi);
        if (this.CanTsumo()) actions.push(ActionType.Tsumo);
        return actions;
    }

    /**
     * Calculates all available actions for a player based on the current available tile.
     * 
     * @param {Object} gameState The current state of the game visible by the player.
     * @returns {ActionType[]} A list of all possible actions for the player.
     */
    CalculateInterject(gameState) {
        let actions = [];
        let availableTile = gameState['availableTile'];
        if (this.CanChi(gameState['availableTile'])) actions.push(ActionType.Chi);
        if (this.CanPon(availableTile)) actions.push(ActionType.Pon);
        if (this.CanKan(availableTile)) actions.push(ActionType.Kan);
        if (this.CanRon(availableTile)) actions.push(ActionType.Ron);
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
        for (let i = 0; i < uniqueSuitTiles.length - 1; i++) {
            let potentialMeld = new Meld([uniqueSuitTiles[i], uniqueSuitTiles[i + 1], availableTile].sort(TILE.CompareTiles), true);
            if (potentialMeld.type == MeldType.CHOW) {
                melds.push(potentialMeld);
            }
        }
        return melds;
    }

    /**
     * Determines if a player can chi given the current game state.
     * 
     * @param {Discard} availableDiscard The discard object available to take.
     * @returns {boolean} True if the player is able to chi, false otherwise.
     */
    CanChi(availableDiscard) {
        if (availableDiscard.playerIndex == (this._index - 1) % 4) {
            let availableTile = availableDiscard.tile;
            let possibleChows = this.ChiMelds(availableTile);
            if (possibleChows.length > 0) return true;
            else return false;
        }
        return false;
    }

    /**
     * Determines if a player can pon given the current game state.
     * 
     * @returns {boolean} True if the player can pon, false otherwise.
     */
    CanPon(availableTile) {
        if (TILE.TileListCount(this._hand.closedTiles, availableTile) >= 2) return true;
        else return false;
    }

    /**
     * Calls pon and makes the meld in the player's hand.
     * 
     * @param {HAND.Hand} hand The hand to add the pong to.
     * @param {TILE.Tile} availableTile The tile available for the player to take.
     * @returns {HAND.Hand} The hand with the pong added to it.
     */
    Pon(hand, availableTile, makeHandOpen = true) {
        for (let i = 0; i < 2; i++) {
            hand.remove(availableTile);
        }
        hand.makeMeld(new Meld([availableTile, availableTile, availableTile], true));
        if (makeHandOpen) hand.isOpen = true;
        return hand;
    }

    /**
     * Calculates the kongs possible in the current state.
     * 
     * @param {TILE.Tile} availableTile The tile available to take.
     * @returns {Meld[]} The list of possible kongs.
     */
    KanMelds(availableTile) {
        if (availableTile == null) {
            let kongs = [];
            let handTilesCopy = TILE.CopyTileList(this._hand._closedTiles);
            if (this._drawnTile) handTilesCopy.push(this._drawnTile);
            let uniqueTiles = TILE.TileListRemoveDuplicates(handTilesCopy);
            for (let tile of uniqueTiles) {
                let tileCount = TILE.TileListCount(this._hand.closedTiles, tile);
                if (this._drawnTile)
                    if (this._drawnTile.number == tile.number) tileCount++;
                if (tileCount == 4) {
                    kongs.push(new Meld([tile, tile, tile, tile]));
                }
                for (let meld of this._hand.melds) {
                    if (meld.type == MeldType.PONG) {
                        if (meld.tiles[0].number == tile.number) {
                            let meldTilesCopy = TILE.CopyTileList(meld.tiles);
                            meldTilesCopy.push(tile);
                            kongs.push(new Meld(meldTilesCopy, meld.is_open));
                        }
                    }
                }
            }
            return kongs;
        } else {
            let kongs = [];
            if (TILE.TileListCount(this._hand.closedTiles, availableTile) == 3) {
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
    GetKan(availableTile = null) {
        let possibleKongs = this.KanMelds(availableTile);
        let kong;
        if (possibleKongs.length > 1) {
            let kongPrompt = '';
            for (let possibleKong of possibleKongs) {
                for (let kongTile of possibleKong.tiles) {
                    kongPrompt.push(kongTile.unicode);
                    kongPrompt.push('|');
                }
                kongPrompt.push('  ');
            }
            console.log('Possible Kongs:');
            console.log(kongPrompt);
            let pickedKong = prompt('>> ');
            chow = possibleKongs[pickedKong];
        } else {
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
    Kan(kong, availableTile = null, makeHandOpen = true) {
        if (availableTile == null) {
            if (kong.is_open) { //Making kong with tile in closed tiles and open pong.
                for (let meld of this._hand.melds) {
                    if (meld.type == MeldType.PONG) {
                        if (meld.tiles[0].number == kong.tiles[0].number) {
                            meld = kong;
                        }
                    }
                }
            } else { //Making kong with 4 tiles in closed tiles.
                for (let i = 0; i < 4; i++) {
                    this._hand.remove(kong.tiles[0]);
                }
                this._hand.makeMeld(kong);
            }
        } else { //Making kong with 3 tiles in closed tiles and other player's discarded tile.
            for (let i = 0; i < 3; i++) {
                this._hand.remove(availableTile);
            }
            this._hand.makeMeld(kong);
            if (makeHandOpen) this._hand.isOpen = true;
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
        for (let tile of uniqueTiles) {
            //remove it from the hand
            handCopy.remove(tile);
            //test if there are any tenpai tiles
            let tenpai = new Tenpai(handCopy);
            //if so add them to array and return the array
            if (tenpai.tiles.length > 0) {
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
        if (this._hand.isOpen) return false;
        else return this.RiichiTiles().length > 0;
    }

    /**
     * Calculates the available melds to make that
     * complete the player's hand and has value.
     * 
     * @param {TILE.Tile} availableTile The tile available to make the melds.
     * @returns {Meld[]} The list of melds that a player can make to complete their hand.
     */
    RonMelds(availableTile) {
        let ronMelds = [];
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let chiMelds = this.ChiMelds(availableTile);
        let ponMelds = [];
        if (this.CanPon(availableTile)) {
            ponMelds.push(new Meld([availableTile, availableTile, availableTile], true));
        }
        let possibleMelds = chiMelds.concat(ponMelds);
        for (let possibleMeld of possibleMelds) {
            let handCopy = HAND.CopyHand(this._hand);
            if (possibleMeld.type == MeldType.PONG) {
                handCopy = this.Pon(handCopy, availableTile, false);
            } else if (possibleMeld.type == MeldType.CHOW) {
                handCopy = this.Chi(handCopy, possibleMeld, availableTile, false)
            }
            let partitions = handPartitioner.partition(handCopy);
            for (let partition of partitions) {
                let yakuList = yakuEvaluator.EvaluateYaku(partition, handCopy, availableTile);
                if (yakuList.length > 0) {
                    ronMelds.push(possibleMeld);
                }
            }
        }
        let handCopy = HAND.CopyHand(this._hand);
        handCopy.add(availableTile);
        let partitions = handPartitioner.partition(handCopy);
        for (let partition of partitions) {
            let yakuList = yakuEvaluator.EvaluateYaku(partition, handCopy, availableTile);
            if (yakuList.length > 0) {
                for (let part of partition) {
                    if (part instanceof Pair) {
                        if (part.tiles[0].number == availableTile.number) {
                            ronMelds.push(part);
                        }
                    }
                }
            }
        }
        return ronMelds;
    }

    /**
     * Determines if a player can ron given the current game state.
     * 
     * @returns {boolean} True if the player can ron, false otherwise.
     */
    CanRon(availableTile) {
        return this.RonMelds(availableTile).length > 0;
    }

    /**
     * Calls ron and takes the discard available to complete the player's hand.
     * 
     * @param {TILE.Tile} availableTile The tile available for the player to take.
     * @returns {{han: number, partition: (Meld | Pair)[], yakuList: Yaku[]}} The highest value of all possible winning hands.
     */
    Ron(availableTile) {
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let valueCalculator = new Value_Calculator();
        let ronMelds = this.RonMelds(availableTile);
        let highestValue = {
            'han': 0,
            'partition': null,
            'yakuList': [],
            'isOpen': this.hand.isOpen()
        };
        this._hand.add(availableTile);
        for (let meld of ronMelds) {
            let handCopy = HAND.CopyHand(this._hand);
            for (let tile of meld.tiles) {
                handCopy.remove(tile);
            }
            handCopy.makeMeld(meld);
            let partitions = handPartitioner.partition(handCopy);
            for (let partition of partitions) {
                let yakuList = yakuEvaluator.EvaluateYaku(partition, handCopy, availableTile);
                let partitionHan = valueCalculator.CalculateHan(yakuList, handCopy.isOpen);
                if (partitionHan > highestValue['han']) {
                    highestValue = {
                        'han': partitionHan,
                        'partition': partition,
                        'yakuList': yakuList,
                        'isOpen': this.hand.isOpen()
                    };
                }
            }
        }
        return highestValue;
    }

    /**
     * Calls tsumo and uses drawn tile to complete the player's hand.
     * 
     * @returns {{han: number, partition: (Meld | Pair)[], yakuList: Yaku[]}} The highest value of all possible winning hands.
     */
    Tsumo() {
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let valueCalculator = new Value_Calculator();
        let highestValue = {
            'han': 0,
            'partition': null,
            'yakuList': []
        };
        this._hand.add(this._drawnTile);
        let partitions = handPartitioner.partition(this._hand);
        for (let partition of partitions) {
            let yakuList = yakuEvaluator.EvaluateYaku(partition, this._hand, this._drawnTile);
            let partitionHan = valueCalculator.CalculateHan(yakuList, this._hand.isOpen);
            if (partitionHan > highestValue['han']) {
                highestValue = {
                    'han': partitionHan,
                    'partition': partition,
                    'yakuList': yakuList
                };
            }
        }
        return highestValue;
    }

    /**
     * Determines if a player can tsumo given the current game state.
     * 
     * @returns {boolean} True if the player can tsumo, false otherwise.
     */
    CanTsumo() {
        if (this._drawnTile) {
            let handPartitioner = new Hand_Partition();
            let yakuEvaluator = new Yaku_Evaluate();
            let handCopy = HAND.CopyHand(this._hand);
            handCopy.add(this._drawnTile);
            let partitions = handPartitioner.partition(handCopy);
            for (let partition of partitions) {
                if (yakuEvaluator.EvaluateYaku(partition, handCopy, this._drawnTile).length > 0) {
                    return true;
                }
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
        for (let action of actions) {
            switch (action) {
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
    Player: Player
}