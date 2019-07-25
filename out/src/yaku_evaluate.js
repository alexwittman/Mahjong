// import { Meld, MeldType } from "./meld";
// import { Pair } from "./pair";
// import * as yaku from './yaku';
// import {_Yaku} from './yaku';
// import { TileListEqual, _TileType, _Tile, CompareTiles, PrintTileList, _TileValue, CopyTileList, RemoveFromTileList, TileListContains } from "./tile";
// import { TERMINALS, HONORS, GREEN, PIN_ONE, PIN_NINE, SOU_ONE, SOU_NINE, WAN_ONE, WAN_NINE, NORTH, EAST, SOUTH, DRAGON_GREEN, DRAGON_RED, DRAGON_WHITE, WEST } from "./constants";
// import { _Hand } from "./hand";
// import { _Tenpai } from "./tenpai";
let yaku = require('./yaku');
let TileListEqual = require('./tile').TileListEqual;
let RemoveFromTileList = require('./tile').RemoveFromTileList;
class _Yaku_Evaluate {
    MeldsOfType(partition, type) {
        let melds = [];
        for (let meld of partition) {
            if (meld instanceof _Meld) {
                if (meld.type == type) {
                    melds.push(meld);
                }
            }
        }
        return melds;
    }
    PartitionTiles(partition) {
        let tiles = [];
        for (let meld of partition) {
            for (let tile of meld.tiles) {
                tiles.push(new _Tile(tile.number));
            }
        }
        tiles.sort(CompareTiles);
        return tiles;
    }
    EvaluateYaku(partition) {
        let yakuList = [];
        yakuList.push(this.NoPointsHand(partition));
        yakuList.push(this.IdenticalSequences(partition));
        yakuList.push(this.ThreeColorStraight(partition));
        yakuList.push(this.Straight(partition));
        yakuList.push(this.DoubleIdenticalSequences(partition));
        yakuList.push(this.AllTripletHand(partition));
        yakuList.push(this.ThreeClosedTriplets(partition));
        yakuList.push(this.ThreeColorTriplets(partition));
        yakuList.push(this.ThreeQuads(partition));
        yakuList.push(this.AllSimples(partition));
        yakuList.push(this.RedDragon(partition));
        yakuList.push(this.GreenDragon(partition));
        yakuList.push(this.WhiteDragon(partition));
        yakuList.push(this.NorthWind(partition));
        yakuList.push(this.EastWind(partition));
        yakuList.push(this.SouthWind(partition));
        yakuList.push(this.WestWind(partition));
        yakuList.push(this.MixedOutsideHand(partition));
        yakuList.push(this.PureOutsideHand(partition));
        yakuList.push(this.LittleThreeDragons(partition));
        yakuList.push(this.HalfFlush(partition));
        yakuList.push(this.Flush(partition));
        yakuList.push(this.BigThreeDragons(partition));
        yakuList.push(this.LittleFourWinds(partition));
        yakuList.push(this.BigFourWinds(partition));
        yakuList.push(this.AllHonors(partition));
        yakuList.push(this.AllTerminals(partition));
        yakuList.push(this.AllGreen(partition));
        yakuList.push(this.FourQuads(partition));
        yakuList = yakuList.filter(elem => elem != null);
        return yakuList;
    }
    NoPointsHand(partition) {
        let chows = this.MeldsOfType(partition, _MeldType.CHOW);
        if (chows.length == 4) {
            return new yaku.NoPointsHand;
        }
        else {
            return null;
        }
    }
    IdenticalSequences(partition) {
        let chows = this.MeldsOfType(partition, _MeldType.CHOW);
        if (chows.length < 2)
            return null;
        for (let i = 0; i < chows.length - 1; i++) {
            for (let j = i + 1; j < chows.length; j++) {
                if (TileListEqual(chows[i].tiles, chows[j].tiles)) {
                    return new yaku.IdenticalSequences;
                }
            }
        }
        return null;
    }
    ThreeColorStraight(partition) {
        let chows = this.MeldsOfType(partition, _MeldType.CHOW);
        if (chows.length < 3)
            return null;
        if (chows.length == 3) {
            if (chows[0].tiles[0].value == chows[1].tiles[0].value && chows[1].tiles[0].value == chows[2].tiles[0].value &&
                chows[0].tiles[0].type == _TileType.PIN && chows[1].tiles[0].type == _TileType.SOU && chows[2].tiles[0].type == _TileType.WAN) {
                return new yaku.ThreeColorStraight;
            }
            else {
                return null;
            }
        }
        if (chows.length == 4) {
            //1,3
            if (this.ThreeColorStraight([chows[1], chows[2], chows[3]])) {
                return new yaku.ThreeColorStraight;
            }
            //1,1,2
            if (this.ThreeColorStraight([chows[0], chows[2], chows[3]])) {
                return new yaku.ThreeColorStraight;
            }
            //2,1,1
            if (this.ThreeColorStraight([chows[0], chows[1], chows[3]])) {
                return new yaku.ThreeColorStraight;
            }
            //3,1
            if (this.ThreeColorStraight([chows[0], chows[1], chows[2]])) {
                return new yaku.ThreeColorStraight;
            }
            return null;
        }
    }
    Straight(partition) {
        let chows = this.MeldsOfType(partition, _MeldType.CHOW);
        if (chows.length < 3)
            return null;
        if (chows.length == 3) {
            if (chows[0].tiles[0].value == chows[1].tiles[0].value - 3 && chows[1].tiles[0].value == chows[2].tiles[0].value - 3 &&
                chows[0].tiles[0].type == chows[1].tiles[0].type && chows[1].tiles[0].type == chows[2].tiles[0].type) {
                return new yaku.Straight;
            }
            else {
                return null;
            }
        }
        if (chows.length == 4) {
            if (this.Straight([chows[1], chows[2], chows[3]])) {
                return new yaku.Straight;
            }
            if (this.Straight([chows[0], chows[2], chows[3]])) {
                return new yaku.Straight;
            }
            if (this.Straight([chows[0], chows[1], chows[3]])) {
                return new yaku.Straight;
            }
            if (this.Straight([chows[0], chows[1], chows[2]])) {
                return new yaku.Straight;
            }
            return null;
        }
    }
    DoubleIdenticalSequences(partition) {
        let chows = this.MeldsOfType(partition, _MeldType.CHOW);
        if (chows.length < 4)
            return null;
        if (this.IdenticalSequences([chows[0], chows[1]]) && [chows[2], chows[3]]) {
            return new yaku.DoubleIdenticalSequences;
        }
        else {
            return null;
        }
    }
    AllTripletHand(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        if (pongs.length == 4) {
            return new yaku.AllTripletHand;
        }
        else {
            return null;
        }
    }
    ThreeClosedTriplets(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        if (pongs.length < 3)
            return null;
        let closedPongCount = 0;
        for (let pong of pongs) {
            if (!pong.is_open) {
                closedPongCount++;
            }
        }
        if (closedPongCount == 3) {
            return new yaku.ThreeClosedTriplets;
        }
        else {
            return null;
        }
    }
    ThreeColorTriplets(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        if (pongs.length < 3)
            return null;
        if (pongs.length == 3) {
            if (pongs[0].tiles[0].value == pongs[1].tiles[0].value && pongs[1].tiles[0].value == pongs[2].tiles[0].value &&
                pongs[0].tiles[0].type == _TileType.PIN && pongs[1].tiles[0].type == _TileType.SOU && pongs[2].tiles[0].type == _TileType.WAN) {
                return new yaku.ThreeColorTriplets;
            }
            else {
                return null;
            }
        }
        if (pongs.length == 4) {
            if (this.ThreeColorTriplets([pongs[1], pongs[2], pongs[3]])) {
                return new yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[2], pongs[3]])) {
                return new yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[1], pongs[3]])) {
                return new yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[1], pongs[2]])) {
                return new yaku.ThreeColorTriplets;
            }
            return null;
        }
    }
    ThreeQuads(partition) {
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        if (kongs.length == 3) {
            return new yaku.ThreeQuads;
        }
        else {
            return null;
        }
    }
    AllSimples(partition) {
        let NonSimples = TERMINALS.concat(HONORS);
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (NonSimples.indexOf(tile.number) >= 0) {
                return null;
            }
        }
        return new yaku.AllSimples;
    }
    RedDragon(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == _TileValue.RED) {
                return new yaku.RedDragon;
            }
        }
        return null;
    }
    GreenDragon(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == _TileValue.GREEN) {
                return new yaku.GreenDragon;
            }
        }
        return null;
    }
    WhiteDragon(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == _TileValue.WHITE) {
                return new yaku.WhiteDragon;
            }
        }
        return null;
    }
    NorthWind(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == _TileValue.NORTH) {
                return new yaku.NorthWind;
            }
        }
        return null;
    }
    EastWind(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == _TileValue.EAST) {
                return new yaku.EastWind;
            }
        }
        return null;
    }
    SouthWind(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == _TileValue.SOUTH) {
                return new yaku.SouthWind;
            }
        }
        return null;
    }
    WestWind(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == _TileValue.WEST) {
                return new yaku.WestWind;
            }
        }
        return null;
    }
    MixedOutsideHand(partition) {
        let OutsideTiles = HONORS.concat(TERMINALS);
        let PartitionOutsideTiles = [];
        for (let meld of partition) {
            let MeldOutsideTiles = [];
            for (let tile of meld.tiles) {
                let OutsideTilesIndexes = [];
                for (let outsideTile of OutsideTiles) {
                    OutsideTilesIndexes.push(OutsideTiles.indexOf(tile.number));
                }
                MeldOutsideTiles.push(OutsideTilesIndexes.some(elem => elem >= 0));
            }
            if (MeldOutsideTiles.indexOf(true) >= 0) {
                PartitionOutsideTiles.push(true);
            }
            else {
                PartitionOutsideTiles.push(false);
            }
        }
        if (PartitionOutsideTiles.every(elem => elem)) {
            return new yaku.MixedOutsideHand;
        }
        else {
            return null;
        }
    }
    PureOutsideHand(partition) {
        let OutsideTiles = HONORS.concat(TERMINALS);
        let PartitionOutsideTiles = [];
        for (let meld of partition) {
            let MeldOutsideTiles = [];
            for (let tile of meld.tiles) {
                let OutsideTilesIndexes = [];
                for (let outsideTile of OutsideTiles) {
                    OutsideTilesIndexes.push(OutsideTiles.indexOf(tile.number));
                }
                MeldOutsideTiles.push(OutsideTilesIndexes.some(elem => elem >= 0));
            }
            if (MeldOutsideTiles.every(elem => elem)) {
                PartitionOutsideTiles.push(true);
            }
            else {
                PartitionOutsideTiles.push(false);
            }
        }
        if (PartitionOutsideTiles.every(elem => elem)) {
            return new yaku.PureOutsideHand;
        }
        else {
            return null;
        }
    }
    LittleThreeDragons(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 2)
            return null;
        if (!(partition[partition.length - 1].tiles[0].value == _TileValue.GREEN ||
            partition[partition.length - 1].tiles[0].value == _TileValue.RED ||
            partition[partition.length - 1].tiles[0].value == _TileValue.WHITE))
            return null;
        let DragonValues = [_TileValue.GREEN, _TileValue.RED, _TileValue.WHITE];
        DragonValues.splice(DragonValues.indexOf(partition[partition.length - 1].tiles[0].value), 1);
        for (let meld of melds) {
            for (let value of DragonValues) {
                if (meld.tiles[0].value == value) {
                    DragonValues.splice(DragonValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (DragonValues.length == 0) {
            return new yaku.LittleThreeDragons;
        }
        else {
            return null;
        }
    }
    HalfFlush(partition) {
        let tiles = this.PartitionTiles(partition);
        let tileTypes = [];
        for (let tile of tiles) {
            tileTypes.push(tile.type);
        }
        tileTypes = tileTypes.filter(elem => elem == _TileType.PIN || elem == _TileType.SOU || elem == _TileType.WAN);
        if (tileTypes.length == tiles.length || tileTypes.length == 0)
            return null;
        let type = tileTypes[0];
        if (tileTypes.every(elem => elem == type)) {
            return new yaku.HalfFlush;
        }
        else {
            return null;
        }
    }
    Flush(partition) {
        let tiles = this.PartitionTiles(partition);
        let tileTypes = [];
        for (let tile of tiles) {
            tileTypes.push(tile.type);
        }
        tileTypes = tileTypes.filter(elem => elem == _TileType.PIN || elem == _TileType.SOU || elem == _TileType.WAN);
        if (tileTypes.length != tiles.length || tileTypes.length == 0)
            return null;
        let type = tileTypes[0];
        if (tileTypes.every(elem => elem == type)) {
            return new yaku.Flush;
        }
        else {
            return null;
        }
    }
    ThirteenOrphans(hand, winningTile) {
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let orphans = [new _Tile(PIN_ONE), new _Tile(PIN_NINE), new _Tile(SOU_ONE), new _Tile(SOU_NINE),
            new _Tile(WAN_ONE), new _Tile(WAN_NINE), new _Tile(EAST), new _Tile(SOUTH),
            new _Tile(WEST), new _Tile(NORTH), new _Tile(DRAGON_GREEN), new _Tile(DRAGON_RED),
            new _Tile(DRAGON_WHITE)];
        //tilesWithoutWinningTile cannot equal orphans
        //tiles must contain all orphans and a pair
        if (TileListEqual(tilesWithoutWinningTile, orphans))
            return null; //takes care of double13orphans
        tiles = CopyTileList(hand.tiles);
        for (let orphan of orphans) {
            tiles = RemoveFromTileList(tiles, orphan);
        }
        if (tiles.length != 1)
            return null;
        if (TileListContains(orphans, tiles[0])) {
            return new yaku.ThirteenOrphans;
        }
        else {
            return null;
        }
    }
    DoubleThirteenOrphans(hand, winningTile) {
        let orphans = [new _Tile(PIN_ONE), new _Tile(PIN_NINE), new _Tile(SOU_ONE), new _Tile(SOU_NINE),
            new _Tile(WAN_ONE), new _Tile(WAN_NINE), new _Tile(EAST), new _Tile(SOUTH),
            new _Tile(WEST), new _Tile(NORTH), new _Tile(DRAGON_GREEN), new _Tile(DRAGON_RED),
            new _Tile(DRAGON_WHITE)];
        let tiles = CopyTileList(hand.tiles);
        let tempTiles = RemoveFromTileList(tiles, winningTile);
        if (TileListEqual(orphans, tempTiles)) {
            return new yaku.DoubleThirteenOrphans;
        }
        return null;
    }
    FourConcealedTriplets(partition, hand, winningTile) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4)
            return null;
        if (melds.some(meld => meld.is_open))
            return null;
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let tenpai = new _Tenpai(new _Hand(tilesWithoutWinningTile));
        if (tenpai.tiles.length > 1) {
            return new yaku.FourConcealedTriplets;
        }
        else {
            return null;
        }
    }
    DoubleFourConcealedTriplets(partition, hand, winningTile) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4)
            return null;
        if (melds.some(meld => meld.is_open))
            return null;
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let tenpai = new _Tenpai(new _Hand(tilesWithoutWinningTile));
        if (tenpai.tiles.length == 1) {
            return new yaku.DoubleFourConcealedTriplets;
        }
        else {
            return null;
        }
    }
    BigThreeDragons(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 3)
            return null;
        let DragonValues = [_TileValue.GREEN, _TileValue.RED, _TileValue.WHITE];
        for (let meld of melds) {
            for (let value of DragonValues) {
                if (meld.tiles[0].value == value) {
                    DragonValues.splice(DragonValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (DragonValues.length == 0) {
            return new yaku.BigThreeDragons;
        }
        else {
            return null;
        }
    }
    LittleFourWinds(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 3)
            return null;
        if (!(partition[partition.length - 1].tiles[0].value == _TileValue.NORTH ||
            partition[partition.length - 1].tiles[0].value == _TileValue.EAST ||
            partition[partition.length - 1].tiles[0].value == _TileValue.SOUTH ||
            partition[partition.length - 1].tiles[0].value == _TileValue.WEST))
            return null;
        let WindValues = [_TileValue.NORTH, _TileValue.EAST, _TileValue.SOUTH, _TileValue.WEST];
        WindValues.splice(WindValues.indexOf(partition[partition.length - 1].tiles[0].value), 1);
        for (let meld of melds) {
            for (let value of WindValues) {
                if (meld.tiles[0].value == value) {
                    WindValues.splice(WindValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (WindValues.length == 0) {
            return new yaku.LittleFourWinds;
        }
        else {
            return null;
        }
    }
    BigFourWinds(partition) {
        let pongs = this.MeldsOfType(partition, _MeldType.PONG);
        let kongs = this.MeldsOfType(partition, _MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4)
            return null;
        let WindValues = [_TileValue.NORTH, _TileValue.EAST, _TileValue.SOUTH, _TileValue.WEST];
        for (let meld of melds) {
            for (let value of WindValues) {
                if (meld.tiles[0].value == value) {
                    WindValues.splice(WindValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (WindValues.length == 0) {
            return new yaku.BigFourWinds;
        }
        else {
            return null;
        }
    }
    AllHonors(partition) {
        let Honors = HONORS;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Honors.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new yaku.AllHonors;
    }
    AllTerminals(partition) {
        let Terminals = TERMINALS;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Terminals.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new yaku.AllTerminals;
    }
    AllGreen(partition) {
        let Green = GREEN;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Green.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new yaku.AllGreen;
    }
    NineGates(hand, winningTile) {
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let tenpai = new _Tenpai(new _Hand(tilesWithoutWinningTile));
        for (let tile of tiles) {
            let tempTiles = CopyTileList(hand.tiles);
            let tilesWithoutTile = RemoveFromTileList(tempTiles, tile);
            let tenpai = new _Tenpai(new _Hand(tilesWithoutTile));
            if (tenpai.tiles.length == 9 && tile.number != winningTile.number) {
                return new yaku.NineGates;
            }
        }
        return null;
    }
    DoubleNineGates(hand, winningTile) {
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let tenpai = new _Tenpai(new _Hand(tilesWithoutWinningTile));
        if (tenpai.tiles.length == 9 && TileListContains(tenpai.tiles, winningTile)) {
            return new yaku.DoubleNineGates;
        }
        else {
            return null;
        }
    }
    FourQuads(partition) {
        let quads = this.MeldsOfType(partition, _MeldType.KONG);
        if (quads.length == 4) {
            return new yaku.FourQuads;
        }
        else {
            return null;
        }
    }
}
module.exports = {
    Yaku_Evaluate: _Yaku_Evaluate
};
