let TileSet = require('./set').TileSet;
let CopyTileList = require('./tile').CopyTileList;
let MinimalTileSet = require('./set').MinimalTileSet;
let Hand = require('./hand').Hand;
let Tenpai = require('./tenpai').Tenpai;
let PrintTileList = require('./tile').PrintTileList;
let Hand_Partition = require('./hand_partition').Hand_Partition;
let Tile = require('./tile').Tile;
let fs = require('fs');

/**
 * Utility class for AI implementation.
 */
class AI_Util {

    /**
     * Removes combinations of tiles from the hand and evaluates possible
     * obtainable hands.
     * 
     * @param {Hand} hand Hand to have future tiles calculated.
     * @param {number} depth The number of tiles to remove to test possible hands.
     */
    TilesToTenpai(hand, depth) {
        PrintTileList(hand.tiles);
        for (let i = 0; i <= depth; i++) {
            let handPartitioner = new Hand_Partition();
            // console.log("Hand:");
            // PrintTileList(hand.tiles);
            let combinations = this.TileCombinations(hand.tiles, i)
            //console.log(combinations);
            for (let combination of combinations) {
                // console.log('Combination:', combination);
                let tempHand = new Hand(CopyTileList(hand.tiles));
                //remove every combination of k tiles from the hand
                // console.log("tempHand before remove:");
                // PrintTileList(tempHand.tiles);
                // console.log(tempHand);
                tempHand.remove(combination);
                // console.log("tempHand after remove:");
                // PrintTileList(tempHand.tiles);
                // console.log(tempHand);
                //replace every removed tile with every combination of k tiles from the set
                for (let setCombination of this.TileCombinations(MinimalTileSet(), i)) {
                    // console.log('Tiles to add:');
                    // PrintTileList(setCombination);
                    tempHand.add(setCombination);
                    // console.log("tempHand after add:");
                    // PrintTileList(tempHand.tiles);
                    for (let tile of MinimalTileSet()) {
                        tempHand.add(tile);
                        let partitions = handPartitioner.partition(tempHand);
                        if (partitions.length) {
                            console.log('Remove: ');
                            PrintTileList(combination);
                            console.log('Add: ');
                            PrintTileList(setCombination);
                        }
                        tempHand.remove(tile);
                    }
                    // let tenpai = new Tenpai(tempHand);
                    // if(tenpai.isTenpai){
                    //     console.log('Remove: ');
                    //     PrintTileList(combination);
                    //     console.log('Add: ');
                    //     PrintTileList(setCombination);
                    // }
                    tempHand.remove(setCombination);
                }
                //check if the hand is in tenpai
            }
        }
        console.log('end of tiles to tenpai');
    }

    /**
     * Computes all possible k-combinations of the given tile list.
     * 
     * @param {[Tile]} set The list of tiles to compute combinations for.
     * @param {number} k The number of tiles to be in each combination.
     * @returns {[[Tile]]} The list of all possible combinations.
     */
    TileCombinations(set, k) {
        var i, j, combs, head, tailcombs;
        if (k > set.length || k <= 0) {
            return [];
        }
        if (k == set.length) {
            return [set];
        }
        if (k == 1) {
            combs = [];
            for (i = 0; i < set.length; i++) {
                combs.push([set[i]]);
            }
            return combs;
        }
        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
            head = set.slice(i, i + 1);
            tailcombs = this.TileCombinations(set.slice(i + 1), k - 1);
            for (j = 0; j < tailcombs.length; j++) {
                combs.push(head.concat(tailcombs[j]));
            }
        }
        return combs;
    }

    /**
     * Creates a list of all possible 9 vectors, 
     * whose value goes from 0..4 that add to <= 13.
     * 
     * This will be used to create a lookup table 
     * for the AI to use for fast processing.
     */
    All9Vectors() {
        let vectors = [];
        for (let a = 0; a <= 4; a++) {
            for (let b = 0; b <= 4; b++) {
                for (let c = 0; c <= 4; c++) {
                    for (let d = 0; d <= 4; d++) {
                        for (let e = 0; e <= 4; e++) {
                            for (let f = 0; f <= 4; f++) {
                                for (let g = 0; g <= 4; g++) {
                                    for (let h = 0; h <= 4; h++) {
                                        for (let i = 0; i <= 4; i++) {
                                            if (a + b + c + d + e + f + g + h + i <= 13) {
                                                vectors.push([a, b, c, d, e, f, g, h, i]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        let shantenTiles = [];
        //for(let vector of vectors){
        shantenTiles.push(this.CalculateShantenTiles(this.NineVectorToHand(vectors[94])));
        //}
        console.log(vectors.length);
        return vectors;
    }

    HandStates() {
        let states = [];
        for (let singles = 0; singles <= 14; singles++) {
            for (let pairs = 0; pairs <= 7; pairs++) {
                for (let almostChows = 0; almostChows <= 7; almostChows++) {
                    for (let chows = 0; chows <= 4; chows++) {
                        for (let pongs = 0; pongs <= 4; pongs++) {
                            for (let kongs = 0; kongs <= 4; kongs++) {
                                if (singles + 2 * pairs + 2 * almostChows + 3 * chows + 3 * pongs + 4 * kongs == 14 + kongs) {
                                    let isTerminalState = 0;
                                    if ((pairs == 1 && chows + pongs + kongs == 4) || (pairs == 7)) isTerminalState = 1;
                                    states.push([singles, pairs, almostChows, chows, pongs, kongs, isTerminalState]);
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(states);
        console.log(states.length);
        console.log(states.filter(state => state[6] == 1).length);
        return states;
    }

    /**
     * Converts a 9-vector into a hand of tiles.
     * 
     * @param {[number]} vector The 9-vector of tiles to convert into a hand.
     * @returns {Hand} The hand containing the tiles represented in the 9-vector.
     */
    NineVectorToHand(vector) {
        let hand = new Hand();
        for (let tile = 0; tile < 9; tile++) {
            for (let i = 0; i < vector[tile]; i++) {
                hand.add(new Tile(tile));
            }
        }
        return hand;
    }

    /**
     * 
     * 
     * @param {Hand} hand 
     */
    CalculateShantenTiles(hand) {
        let handPartitioner = new Hand_Partition();
        handPartitioner.PrintPartitions(handPartitioner.recurPartition(hand.tiles));
        return [];
    }

}

module.exports = {
    AI_Util: AI_Util
}