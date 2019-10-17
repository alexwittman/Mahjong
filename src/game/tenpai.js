// import { Hand } from "./hand";
// import { Tile, CopyTileList, PrintTileList } from "./tile";
// import { DRAGON_WHITE } from "./constants";
// import { Hand_Partition } from "./hand_partition";
// import { Meld } from "./meld";
// import { Pair } from "./pair";
// import { Yaku_Evaluate } from "./yaku_evaluate";

let Hand = require('./hand').Hand;
let Tile = require('./tile').Tile;
let CopyTileList = require('./tile').CopyTileList;
let PrintTileList = require('./tile').PrintTileList;
let DRAGON_WHITE = require('./constants').DRAGON_WHITE;
let Hand_Partition = require('./hand_partition').Hand_Partition;
let Meld = require('./meld').Meld;
let Pair = require('./pair').Pair;
let Yaku_Evaluate = require('./yaku_evaluate').Yaku_Evaluate;
let CopyHand = require('./hand').CopyHand;


/**
 * Class to see if a hand is in tenpai.
 */
class Tenpai {

    /**
     * Constructor to create tenpai class for a hand.
     * 
     * @param {Hand} hand The hand to evaluate.
     */
    constructor(hand) {
        this._tiles = this.GetTiles(hand);
    }

    /**
     * Getter method for tiles to complete the hand.
     * 
     * @returns {Tile[]} A list of tiles that will complete the hand.
     */
    get tiles() {
        return this._tiles;
    }

    /**
     * Getter method for if the hand is in tenpai.
     * 
     * @returns {boolean} True if there are tiles that will complete the hand, false otherwise.
     */
    get isTenpai() {
        return this._tiles.length > 0;
    }

    /**
     * Gets all tiles that will complete a hand.
     * 
     * @param {Hand} hand The hand to try and complete.
     * @returns {Tile[]} A list of tiles that will complete the hand.
     */
    GetTiles(hand) {
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let handCopy = CopyHand(hand);
        let tilesToComplete = [];
        for (let i = 0; i <= DRAGON_WHITE; i++) {
            let tile = new Tile(i);
            handCopy.add(tile);
            let partitions = handPartitioner.partition(handCopy);
            for (let partition of partitions) {
                if (yakuEvaluator.EvaluateYaku(partition, handCopy, tile).length > 0) {
                    tilesToComplete.push(tile);
                }
            }
            handCopy.remove(tile);
        }
        return tilesToComplete;
    }

    /**
     * Prints the tiles that complete the hand.
     */
    PrintTiles() {
        console.log('Tenpai Tiles:');
        if (this.isTenpai) {
            PrintTileList(this._tiles);
        } else {
            console.log('NONE');
        }
    }
}

module.exports.Tenpai = Tenpai;