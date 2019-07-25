// import { Hand } from "./hand";
// import {Tile, TileType, CopyTileList, PrintTileList, TileListCount, IndexTileList, TileListContains} from '../src/tile';
// import { Pair } from "./pair";
// import { Meld, MeldType } from "./meld";
// let Hand = require('./hand').Hand;
// let Tile = require('./tile').Tile;
let TileType = require('./tile').TileType;
let CopyTileList = require('./tile').CopyTileList;
let PrintTileList = require('./tile').PrintTileList;
let TileListCount = require('./tile').TileListCount;
let IndexTileList = require('./tile').IndexTileList;
let TileListContains = require('./tile').TileListContains;
let Pair = require('./pair').Pair;
let Meld = require('./meld').Meld;
let MeldType = require('./meld').MeldType;
class _Hand_Partition {
    cleanUpPartitions(partitions) {
        let cleanPartitions = [];
        //remove bad partitions
        for (let partition of partitions) {
            let MeldCount = 0;
            let PairCount = 0;
            for (let meld of partition) {
                if (meld instanceof _Meld)
                    MeldCount++;
                if (meld instanceof _Pair)
                    PairCount++;
            }
            if (PairCount == 1 && MeldCount == 4) {
                cleanPartitions.push(partition);
            }
        }
        //sort each partition
        for (let partition of cleanPartitions) {
            partition = this.SortPartition(partition);
        }
        let uniquePartitions = [];
        for (let partition of cleanPartitions) {
            if (!this.PartitionInList(uniquePartitions, partition)) {
                uniquePartitions.push(partition);
            }
        }
        return uniquePartitions;
    }
    PartitionInList(partitions, partitionToCheck) {
        for (let partition of partitions) {
            if (JSON.stringify(partition) == JSON.stringify(partitionToCheck))
                return true;
        }
        return false;
    }
    partition(hand) {
        return this.cleanUpPartitions(this.recurPartition(hand.tiles));
    }
    recurPartition(tiles) {
        let partition = [];
        if (tiles.length >= 4) {
            let kongTiles = CopyTileList(tiles);
            let kongPartition = this.KongPartition(kongTiles);
            if (kongPartition != null) {
                if (kongPartition.length > 0) {
                    partition = partition.concat(kongPartition);
                }
            }
        }
        if (tiles.length >= 3) {
            let pongTiles = CopyTileList(tiles);
            let pongPartition = this.PongPartition(pongTiles);
            if (pongPartition != null) {
                if (pongPartition.length > 0) {
                    partition = partition.concat(pongPartition);
                }
            }
            let chowTiles = CopyTileList(tiles);
            let chowPartition = this.ChowPartition(chowTiles);
            if (chowPartition != null) {
                if (chowPartition.length > 0) {
                    partition = partition.concat(chowPartition);
                }
            }
        }
        if (tiles.length >= 2) {
            let pairTiles = CopyTileList(tiles);
            let pairPartition = this.PairPartition(pairTiles);
            if (pairPartition != null) {
                if (pairPartition.length > 0) {
                    partition = partition.concat(pairPartition);
                }
            }
        }
        return partition;
    }
    CombinePartitions(firstElement, restOfPartition) {
        restOfPartition = restOfPartition.filter((part) => part != null);
        let numberOfPartitions = restOfPartition.length;
        let partitions = [];
        for (let i = 0; i < numberOfPartitions; i++) {
            partitions.push(firstElement);
        }
        for (let i = 0; i < numberOfPartitions; i++) {
            partitions[i] = partitions[i].concat(restOfPartition[i]);
        }
        return partitions;
    }
    KongPartition(tiles) {
        let kong = [];
        for (let tile of tiles) {
            if (TileListCount(tiles, tile) >= 4) {
                kong = [new Tile(tile.number), new Tile(tile.number), new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if (kong.length > 0) {
            const NumOfTilesToRemove = 4;
            for (let i = 0; i < NumOfTilesToRemove; i++) {
                tiles.splice(IndexTileList(tiles, kong[0]), 1);
            }
            if (tiles.length > 0) {
                return this.CombinePartitions([new Meld(kong)], this.recurPartition(tiles));
            }
            else {
                return [[new Meld(kong)]];
            }
        }
        else {
            return null;
        }
    }
    PongPartition(tiles) {
        let pong = [];
        for (let tile of tiles) {
            if (TileListCount(tiles, tile) >= 3) {
                pong = [new Tile(tile.number), new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if (pong.length > 0) {
            const NumOfTilesToRemove = 3;
            for (let i = 0; i < NumOfTilesToRemove; i++) {
                tiles.splice(IndexTileList(tiles, pong[0]), 1);
            }
            if (tiles.length > 0) {
                return this.CombinePartitions([new Meld(pong)], this.recurPartition(tiles));
            }
            else {
                return [[new Meld(pong)]];
            }
        }
        else {
            return null;
        }
    }
    ChowPartition(tiles) {
        let chow = [];
        let tempTiles = [];
        for (let tile of tiles) {
            if (!TileListContains(tempTiles, tile)) {
                tempTiles.push(new Tile(tile.number));
            }
        }
        for (let i = 0; i < tempTiles.length - 2; i++) {
            if ((new Meld(tempTiles.slice(i, i + 3)).type == MeldType.CHOW)) {
                chow = tempTiles.slice(i, i + 3);
                if (chow.length > 0) {
                    for (let tile of chow) {
                        tiles.splice(IndexTileList(tiles, tile), 1);
                    }
                    if (tiles.length > 0) {
                        return this.CombinePartitions([new Meld(chow)], this.recurPartition(tiles));
                    }
                    else {
                        return [[new Meld(chow)]];
                    }
                }
            }
        }
        if (chow.length == 0) {
            return null;
        }
    }
    PairPartition(tiles) {
        let pair = [];
        for (let tile of tiles) {
            if (TileListCount(tiles, tile) >= 2) {
                pair = [new Tile(tile.number), new Tile(tile.number)];
                break;
            }
        }
        if (pair.length > 0) {
            const NumOfTilesToRemove = 2;
            for (let i = 0; i < NumOfTilesToRemove; i++) {
                tiles.splice(IndexTileList(tiles, pair[0]), 1);
            }
            if (tiles.length > 0) {
                return this.CombinePartitions([new Pair(pair)], this.recurPartition(tiles));
            }
            else {
                return [[new Pair(pair)]];
            }
        }
        else {
            return null;
        }
    }
    SortPartition(partition) {
        let swaps = true;
        while (swaps) {
            swaps = false;
            for (let i = 0; i < partition.length - 1; i++) {
                let a = partition[i];
                let b = partition[i + 1];
                if (a instanceof _Pair) {
                    let temp = partition[i];
                    partition[i] = partition[i + 1];
                    partition[i + 1] = temp;
                    swaps = true;
                }
                if (b instanceof _Pair) {
                    continue;
                }
                if (a instanceof _Meld && b instanceof _Meld) {
                    if (a.tiles[0].number > b.tiles[0].number) {
                        let temp = partition[i];
                        partition[i] = partition[i + 1];
                        partition[i + 1] = temp;
                        swaps = true;
                    }
                    else if (a.tiles[0].number < b.tiles[0].number) {
                        continue;
                    }
                    else {
                        if ((a.type == MeldType.CHOW || a.type == MeldType.KONG) && b.type == MeldType.PONG) {
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
    PrintPartitions(partitions) {
        console.log('PARTITIONS');
        for (let partition of partitions) {
            let tiles = '';
            for (let meld of partition) {
                for (let tile of meld.tiles) {
                    tiles += tile.unicode;
                }
                tiles += ' ';
            }
            console.log(tiles);
        }
    }
}
module.exports = {
    Hand_Partition: _Hand_Partition
};
