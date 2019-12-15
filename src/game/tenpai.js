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
let Hand_Partition = require('./hand_partition').Hand_Partition;
let Meld = require('./meld').Meld;
let Pair = require('./pair').Pair;
let Yaku_Evaluate = require('./yaku_evaluate').Yaku_Evaluate;
let CopyHand = require('./hand').CopyHand;
let RemoveFromTileList = require('./tile').RemoveFromTileList;
let TileListContains = require('./tile').TileListContains;
let PIN_ONE = require('./constants').PIN_ONE;
let PIN_NINE = require('./constants').PIN_NINE;
let SOU_ONE = require('./constants').SOU_ONE;
let SOU_NINE = require('./constants').SOU_NINE;
let WAN_ONE = require('./constants').WAN_ONE;
let WAN_NINE = require('./constants').WAN_NINE;
let NORTH = require('./constants').NORTH;
let EAST = require('./constants').EAST;
let SOUTH = require('./constants').SOUTH;
let WEST = require('./constants').WEST;
let DRAGON_GREEN = require('./constants').DRAGON_GREEN;
let DRAGON_RED = require('./constants').DRAGON_RED;
let DRAGON_WHITE = require('./constants').DRAGON_WHITE;


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
        tilesToComplete = tilesToComplete.concat(this.GetThirteenOrphanTiles(hand.closedTiles));
        return tilesToComplete;
    }

    GetThirteenOrphanTiles(tiles) {
        let tenpaiTiles = [];
        let orphans = [new Tile(PIN_ONE), new Tile(PIN_NINE), new Tile(SOU_ONE), new Tile(SOU_NINE),
            new Tile(WAN_ONE), new Tile(WAN_NINE), new Tile(EAST), new Tile(SOUTH),
            new Tile(WEST), new Tile(NORTH), new Tile(DRAGON_GREEN), new Tile(DRAGON_RED),
            new Tile(DRAGON_WHITE)
        ];
        let tilesCopy = CopyTileList(tiles);
        for (let orphan of orphans) {
            tilesCopy = RemoveFromTileList(tilesCopy, orphan);
        }
        if (tilesCopy.length > 1) tenpaiTiles = []; //contains less than 13 orphans
        if (tilesCopy.length == 0) tenpaiTiles = orphans; //contains all 13 orphans, but missing pair.
        if (tilesCopy.length == 1) { //contains 12 orphans and a pair.
            if (TileListContains(orphans, tilesCopy[0])) {
                let orphansCopy = CopyTileList(orphans);
                for (let tile of tiles) {
                    orphansCopy = RemoveFromTileList(orphansCopy, tile);
                }
                if (orphansCopy.length == 1) tenpaiTiles = orphansCopy;
            }
        }
        return tenpaiTiles;
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