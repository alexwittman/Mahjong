// import { Hand } from "./hand";
// import { Tile, CopyTileList, PrintTileList } from "./tile";
// import { DRAGON_WHITE } from "./constants";
// import { Hand_Partition } from "./hand_partition";
// import { Meld } from "./meld";
// import { Pair } from "./pair";
// import { Yaku_Evaluate } from "./yaku_evaluate";
// let Hand = require('./hand').Hand;
// let Tile = require('./tile').Tile;
// let CopyTileList = require('./tile').CopyTileList;
// let PrintTileList = require('./tile').PrintTileList;
// let DRAGON_WHITE = require('./constants').DRAGON_WHITE;
let Hand_Partition = require('./hand_partition').Hand_Partition;
// let Meld = require('./meld').Meld;
// let Pair = require('./pair').Pair;
let Yaku_Evaluate = require('./yaku_evaluate').Yaku_Evaluate;
class _Tenpai {
    constructor(hand) {
        this._tiles = this.GetTiles(hand);
    }
    get tiles() {
        return this._tiles;
    }
    get isTenpai() {
        return this._tiles.length > 0;
    }
    GetTiles(hand) {
        let handPartitioner = new Hand_Partition();
        let yakuEvaluator = new Yaku_Evaluate();
        let handTiles = CopyTileList(hand.tiles);
        let tilesToComplete = [];
        for (let i = 0; i <= DRAGON_WHITE; i++) {
            let tile = new Tile(i);
            let tempTiles = handTiles.concat(tile);
            let tempHand = new Hand(tempTiles);
            let partitions = handPartitioner.partition(tempHand);
            for (let partition of partitions) {
                if (yakuEvaluator.EvaluateYaku(partition).length > 0) {
                    tilesToComplete.push(tile);
                }
            }
        }
        return tilesToComplete;
    }
    PrintTiles() {
        console.log('Tenpai Tiles:');
        if (this.isTenpai) {
            PrintTileList(this._tiles);
        }
        else {
            console.log('NONE');
        }
    }
}
module.exports = {
    Tenpai: _Tenpai
};
