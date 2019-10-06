// import { Hand } from "./hand";
// import {Tile, TileType, CopyTileList, PrintTileList, TileListCount, IndexTileList, TileListContains} from '../src/tile';
// import { Pair } from "./pair";
// import { Meld, MeldType } from "./meld";

let Hand = require('./hand').Hand;
let Tile = require('./tile').Tile;
let TileType = require('./tile').TileType;
let CopyTileList = require('./tile').CopyTileList;
let PrintTileList = require('./tile').PrintTileList;
let TileListCount = require('./tile').TileListCount;
let IndexTileList = require('./tile').IndexTileList;
let TileListContains = require('./tile').TileListContains;
let Pair = require('./pair').Pair;
let Meld = require('./meld').Meld;
let MeldType = require('./meld').MeldType;

/**
 * Class to compute a partition of a hand.
 */
class _Hand_Partition {

    /**
     * Removes invalid partitions from the list of partitions.
     * 
     * Valid partitions contain one pair and four melds.
     * 
     * @param {(Meld | Pair)[][]} partitions List of partitions to clean up.
     * @returns {(Meld | Pair}[][])} List of valid and unique partitions.
     */
    cleanUpPartitions(partitions) {
        let cleanPartitions = [];
        //remove bad partitions
        for(let partition of partitions){
            let MeldCount = 0;
            let PairCount = 0;
            for(let meld of partition){
                if(meld instanceof Meld) MeldCount++;
                if(meld instanceof Pair) PairCount++;
            }
            if(PairCount == 1 && MeldCount == 4){
                cleanPartitions.push(partition);
            }
        }

        //sort each partition
        for(let partition of cleanPartitions){
            partition = this.SortPartition(partition);
        }

        let uniquePartitions = [];
        for(let partition of cleanPartitions){
            if(!this.PartitionInList(uniquePartitions, partition)){
                uniquePartitions.push(partition);
            }
        }
        return uniquePartitions;
    }

    /**
     * Checks if the given partition list contains the given partition.
     * 
     * @param {(Meld | Pair)[][]} partitions List of partitions.
     * @param {(Meld | Pair)[]} partitionToCheck Partition to check if it is contained in the list.
     * @returns {boolean} Whether or not the partition was in the list.
     */
    PartitionInList(partitions, partitionToCheck) {
        for(let partition of partitions){
            if(JSON.stringify(partition) == JSON.stringify(partitionToCheck)) return true;
        }
        return false;
    }
    
    /**
     * Adds the declared melds of a hand to the partitions of
     * the closed tiles.
     * 
     * @param {(Meld | Pair)[][]} partitions The partitions of the hand's closed tiles.
     * @param {Meld[]} handMelds The declared melds of the hand.
     * @returns {(Meld | Pair)[][]} The complete partitions of the hand.
     */
    AddHandMelds(partitions, handMelds){
        for(let partition of partitions){
            for(let meld of handMelds){
                partition.push(meld);
            }
        }
        return partitions;
    }

    /**
     * Partitions the hand into a list of melds and pairs.
     * 
     * @param {Hand} hand Hand to partition into melds and pairs.
     * @returns {(Meld | Pair)[][]} List of valid and unique partitions of the hand.
     */
    partition(hand) {
        return this.cleanUpPartitions(this.AddHandMelds(this.recurPartition(hand.closedTiles), hand.melds));
    }

    /**
     * Recursively and parallely removes melds from a list of tiles.
     * 
     * If a hand contains a kong and a pong, this function will start two
     * different "threads" to partition the tiles separately.
     * 
     * @param {[Tile]} tiles Tiles of the hand to partition.
     * @returns {(Meld | Pair)[][]} All possible partitions of the tiles.
     */
    recurPartition(tiles) {
        let partition = [];
        // if(tiles.length >= 4){
        //     let kongTiles = CopyTileList(tiles);
        //     let kongPartition = this.KongPartition(kongTiles);
        //     if(kongPartition != null){
        //         if(kongPartition.length > 0){
        //             partition = partition.concat(kongPartition);
        //         }
        //     }
        // }
        if(tiles.length >= 3){
            let pongTiles = CopyTileList(tiles);
            let pongPartition = this.PongPartition(pongTiles);
            if(pongPartition != null) {
                if(pongPartition.length > 0){
                    partition = partition.concat(pongPartition);
                }
            }

            let chowTiles = CopyTileList(tiles);
            let chowPartition = this.ChowPartition(chowTiles);
            if(chowPartition != null) {
                if(chowPartition.length > 0){
                    partition = partition.concat(chowPartition);
                }
            }
        }
        if(tiles.length >= 2){
            let pairTiles = CopyTileList(tiles);
            let pairPartition = this.PairPartition(pairTiles);
            if(pairPartition != null) {
                if(pairPartition.length > 0){
                    partition = partition.concat(pairPartition);
                }
            }
        }
        return partition;
    }

    /**
     * Expands a tree-like structure of partitions
     * into a list of flat partitions.
     * 
     * @param {(Meld | Pair)} firstElement First meld or pair to expand the partitions with.
     * @param {(Meld | Pair)[][]} restOfPartition Nested list of melds and or pairs to be 
     *                                            combined with the first meld.
     * @returns {(Meld | Pair)[][]} Combined list of partitions.
     */
    CombinePartitions(firstElement, restOfPartition) {
        restOfPartition = restOfPartition.filter((part) => part != null);
        let numberOfPartitions = restOfPartition.length;
        let partitions = [];
        for(let i = 0; i < numberOfPartitions; i++){
            partitions.push(firstElement);
        }
        for(let i = 0; i < numberOfPartitions; i++){
            partitions[i] = partitions[i].concat(restOfPartition[i]);
        }
        return partitions;
    }

    /**
     * Pulls all possible kongs out of a list of tiles
     * and partitions the rest of the tiles.
     * 
     * @param {Tile[]} tiles The tiles to have checked for kong partitions.
     * @returns {(Meld | Pair)[][]} List of all possible partitions with a kong.
     */
    KongPartition(tiles) {
        let kong = [];
        for(let tile of tiles){
            if(TileListCount(tiles, tile) >= 4){
                kong = [new Tile(tile.number), new Tile(tile.number), new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if(kong.length > 0){
            const NumOfTilesToRemove = 4;
            for(let i = 0; i < NumOfTilesToRemove; i++){
                tiles.splice(IndexTileList(tiles, kong[0]), 1);
            }
            if(tiles.length > 0){
                return this.CombinePartitions([new Meld(kong)], this.recurPartition(tiles));
            }
            else {
                return [[new Meld(kong)]];
            }
        }
        else{
            return null;
        }
    }

    /**
     * Pulls all possible pongs out of a list of tiles
     * and partitions the rest of the tiles.
     * 
     * @param {Tile[]} tiles The tiles to have checked for pong partitions.
     * @returns {(Meld | Pair)[][]} List of all possible partitions with a pong.
     */
    PongPartition(tiles) {
        let pong = [];
        for(let tile of tiles){
            if(TileListCount(tiles, tile) >= 3){
                pong = [new Tile(tile.number), new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if(pong.length > 0){
            const NumOfTilesToRemove = 3;
            for(let i = 0; i < NumOfTilesToRemove; i++){
                tiles.splice(IndexTileList(tiles, pong[0]), 1);
            }
            if(tiles.length > 0){
                return this.CombinePartitions([new Meld(pong)], this.recurPartition(tiles));
            }
            else {
                return [[new Meld(pong)]];
            }
        }
        else{
            return null;
        }
    }

    /**
     * Pulls all possible chows out of a list of tiles
     * and partitions the rest of the tiles.
     * 
     * @param {Tile[]} tiles The tiles to have checked for chow partitions.
     * @returns {(Meld | Pair)[][]} List of all possible partitions with a chow.
     */
    ChowPartition(tiles) {
        let chow = [];

        let tempTiles = [];
        for(let tile of tiles) {
            if(!TileListContains(tempTiles, tile)){
                tempTiles.push(new Tile(tile.number));
            }
        }

        for(let i = 0; i < tempTiles.length - 2; i++){
            if((new Meld(tempTiles.slice(i, i + 3)).type == MeldType.CHOW)){
                chow = tempTiles.slice(i, i + 3);
                if(chow.length > 0){
                    for(let tile of chow){
                        tiles.splice(IndexTileList(tiles, tile), 1);
                    }
                    if(tiles.length > 0){
                        return this.CombinePartitions([new Meld(chow)], this.recurPartition(tiles));
                    }
                    else{
                        return [[new Meld(chow)]];
                    }
                }
            }
        }
        if(chow.length == 0){
            return null;
        }

    }

    /**
     * Pulls all possible pairs out of a list of tiles
     * and partitions the rest of the tiles.
     * 
     * @param {Tile[]} tiles The tiles to have checked for pair partitions.
     * @returns {(Meld | Pair)[][]} List of all possible partitions with a pair.
     */
    PairPartition(tiles) {
        let pair = [];
        for(let tile of tiles){
            if(TileListCount(tiles, tile) >= 2){
                pair = [new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if(pair.length > 0){
            const NumOfTilesToRemove = 2;
            for(let i = 0; i < NumOfTilesToRemove; i++){
                tiles.splice(IndexTileList(tiles, pair[0]), 1);
            }
            if(tiles.length > 0){
                return this.CombinePartitions([new Pair(pair)], this.recurPartition(tiles));
            }
            else {
                return [[new Pair(pair)]];
            }
        }
        else{
            return null;
        }
    }

    /**
     * Sorts a parition:
     * 
     *      pair goes last,
     * 
     *      melds are ordered by tile value.
     * 
     * @param {(Meld | Pair)[]} partition The partition to sort.
     * @returns {(Meld | Pair)[]} The sorted partition.
     */
    SortPartition(partition) {
        let swaps = true;
        while(swaps){
            swaps = false;
            for(let i = 0; i < partition.length - 1; i++){
                let a = partition[i];
                let b = partition[i + 1];
                if(a instanceof Pair){
                    let temp = partition[i];
                    partition[i] = partition[i + 1];
                    partition[i + 1] = temp;
                    swaps = true;
                }
                if(b instanceof Pair){
                    continue;
                }
                if(a instanceof Meld && b instanceof Meld){
                    if(a.tiles[0].number > b.tiles[0].number){
                        let temp = partition[i];
                        partition[i] = partition[i + 1];
                        partition[i + 1] = temp;
                        swaps = true;
                    }
                    else if(a.tiles[0].number < b.tiles[0].number) {
                        continue;
                    }
                    else{
                        if((a.type == MeldType.CHOW || a.type == MeldType.KONG) && b.type == MeldType.PONG){
                            let temp = partition[i];
                            partition[i] = partition[i + 1];
                            partition[i + 1] = temp;
                            swaps = true;
                        }
                    }
                }
            }
        }
        return partition;
    }

    /**
     * Prints a list of partitions with proper spacing.
     * 
     * @param {(Meld | Pair)[][]} partitions The list of partitions to print.
     */
    PrintPartitions(partitions) {
        console.log('PARTITIONS');
        for(let partition of partitions){
            let tiles = '';
            for(let meld of partition){
                for(let tile of meld.tiles){
                    tiles += tile.unicode;
                    tiles += ' ';
                }
                tiles += ' ';
            }
            console.log(tiles);
        }
    }
}

module.exports = {
    Hand_Partition: _Hand_Partition
}