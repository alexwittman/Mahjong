let Yaku = require('./yaku');
let TileListEqual = require('./tile').TileListEqual;
let RemoveFromTileList = require('./tile').RemoveFromTileList;
let MeldType = require('./meld').MeldType;
let Meld = require('./meld').Meld;
let Pair = require('./pair').Pair;
let TERMINALS = require('./constants').TERMINALS;
let HONORS = require('./constants').HONORS;
let CompareTiles = require('./tile').CompareTiles;
let TileValue = require('./tile').TileValue;
let TileType = require('./tile').TileType;
let CopyTileList = require('./tile').CopyTileList;
let GREEN = require('./constants').GREEN;
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
let TileListContains = require('./tile').TileListContains;
let Tile = require('./tile').Tile;
let Hand = require('./hand').Hand;
let TileListRemoveDuplicates = require('./tile').TileListRemoveDuplicates;
let TileListCount = require('./tile').TileListCount;
let TileList = require('./tile').TileList;


/**
 * Class to evaluate the yaku value of a partition of a hand.
 */
class Yaku_Evaluate {

    /**
     * Retrieves the melds of the given type from a partition of a hand.
     * 
     * @param {(Meld | Pair)[]} partition Partition of a hand to pick meld types from.
     * @param {MeldType} type The type of meld to retrieve.
     * @returns {Meld[]} The list of melds that match the given type.
     */
    MeldsOfType(partition, type) {
        let melds = []
        for (let meld of partition) {
            if (meld instanceof Meld) {
                if (meld.type == type) {
                    melds.push(meld);
                }
            }
        }
        return melds;
    }

    /**
     * Converts a partition into a list of tiles.
     * 
     * @param {(Meld | Pair)[]} partition The partition to retrieve tiles from.
     * @returns {Tile[]} The list of tiles that make up the partition.
     */
    PartitionTiles(partition) {
        let tiles = [];
        for (let meld of partition) {
            for (let tile of meld.tiles) {
                tiles.push(new Tile(tile.number));
            }
        }
        tiles.sort(CompareTiles);
        return tiles;
    }

    /**
     * Evaluates the yaku of a partition of a hand.
     * 
     * @param {(Meld | Pair)[]} partition Partition to evaluate for yaku.
     * @param {Hand} hand The hand to evaluate for yaku.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.Yaku[]} List of yaku the partition satisfies.
     */
    EvaluateYaku(partition, hand, winningTile) {
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
        yakuList.push(this.ThirteenOrphans(hand, winningTile));
        yakuList.push(this.DoubleThirteenOrphans(hand, winningTile));
        yakuList.push(this.FourConcealedTriplets(partition, hand, winningTile));
        yakuList.push(this.DoubleFourConcealedTriplets(partition, hand, winningTile));
        yakuList.push(this.BigThreeDragons(partition));
        yakuList.push(this.LittleFourWinds(partition));
        yakuList.push(this.BigFourWinds(partition));
        yakuList.push(this.AllHonors(partition));
        yakuList.push(this.AllTerminals(partition));
        yakuList.push(this.AllGreen(partition));
        yakuList.push(this.NineGates(partition, hand, winningTile));
        yakuList.push(this.DoubleNineGates(partition, hand, winningTile));
        yakuList.push(this.FourQuads(partition));
        yakuList.push(this.SevenPairs(partition));

        yakuList = yakuList.filter(elem => elem != null);

        return yakuList;
    }

    /**
     * Checks if a partition satisfies a no points hand.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for a no points hand.
     * @returns {Yaku.NoPointsHand} The no points hand yaku.
     */
    NoPointsHand(partition) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        if (chows.length == 4) {
            return new Yaku.NoPointsHand;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with identical sequences.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for identical sequences.
     * @returns {Yaku.IdenticalSequences} The identical sequences yaku.
     */
    IdenticalSequences(partition) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        if (chows.length < 2) return null;
        for (let i = 0; i < chows.length - 1; i++) {
            for (let j = i + 1; j < chows.length; j++) {
                if (TileListEqual(chows[i].tiles, chows[j].tiles)) {
                    return new Yaku.IdenticalSequences;
                }
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with three color straight.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for three color straight.
     * @returns {Yaku.ThreeColorStraight} The three color straight yaku.
     */
    ThreeColorStraight(partition) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        if (chows.length < 3) return null;
        if (chows.length == 3) {
            if (chows[0].tiles[0].value == chows[1].tiles[0].value && chows[1].tiles[0].value == chows[2].tiles[0].value &&
                chows[0].tiles[0].type == TileType.PIN && chows[1].tiles[0].type == TileType.SOU && chows[2].tiles[0].type == TileType.WAN) {
                return new Yaku.ThreeColorStraight;
            } else {
                return null;
            }
        }
        if (chows.length == 4) {
            //1,3
            if (this.ThreeColorStraight([chows[1], chows[2], chows[3]])) {
                return new Yaku.ThreeColorStraight;
            }
            //1,1,2
            if (this.ThreeColorStraight([chows[0], chows[2], chows[3]])) {
                return new Yaku.ThreeColorStraight;
            }
            //2,1,1
            if (this.ThreeColorStraight([chows[0], chows[1], chows[3]])) {
                return new Yaku.ThreeColorStraight;
            }
            //3,1
            if (this.ThreeColorStraight([chows[0], chows[1], chows[2]])) {
                return new Yaku.ThreeColorStraight;
            }
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with straight.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for straight.
     * @returns {Yaku.Straight} The straight yaku.
     */
    Straight(partition) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        if (chows.length < 3) return null;
        if (chows.length == 3) {
            if (chows[0].tiles[0].value == chows[1].tiles[0].value - 3 && chows[1].tiles[0].value == chows[2].tiles[0].value - 3 &&
                chows[0].tiles[0].type == chows[1].tiles[0].type && chows[1].tiles[0].type == chows[2].tiles[0].type) {
                return new Yaku.Straight;
            } else {
                return null;
            }
        }
        if (chows.length == 4) {
            if (this.Straight([chows[1], chows[2], chows[3]])) {
                return new Yaku.Straight;
            }
            if (this.Straight([chows[0], chows[2], chows[3]])) {
                return new Yaku.Straight;
            }
            if (this.Straight([chows[0], chows[1], chows[3]])) {
                return new Yaku.Straight;
            }
            if (this.Straight([chows[0], chows[1], chows[2]])) {
                return new Yaku.Straight;
            }
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with double identical sequences.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for double identical sequences.
     * @returns {Yaku.DoubleIdenticalSequences} The double identical sequences yaku.
     */
    DoubleIdenticalSequences(partition) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        if (chows.length < 4) return null;
        if (this.IdenticalSequences([chows[0], chows[1]]) && [chows[2], chows[3]]) {
            return new Yaku.DoubleIdenticalSequences;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with all triplet hand.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for all triplet hand.
     * @returns {Yaku.AllTripletHand} The all triplet hand yaku.
     */
    AllTripletHand(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        if (pongs.length == 4) {
            return new Yaku.AllTripletHand;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with three closed triplets.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for three closed triplets.
     * @returns {Yaku.ThreeClosedTriplets} The three closed triplets yaku.
     */
    ThreeClosedTriplets(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        if (pongs.length < 3) return null;
        let closedPongCount = 0;
        for (let pong of pongs) {
            if (!pong.is_open) {
                closedPongCount++;
            }
        }
        if (closedPongCount == 3) {
            return new Yaku.ThreeClosedTriplets;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with three color triplets.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for three color triplets.
     * @returns {Yaku.ThreeColorTriplets} The three color triplets yaku.
     */
    ThreeColorTriplets(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        if (pongs.length < 3) return null;
        if (pongs.length == 3) {
            if (pongs[0].tiles[0].value == pongs[1].tiles[0].value && pongs[1].tiles[0].value == pongs[2].tiles[0].value &&
                pongs[0].tiles[0].type == TileType.PIN && pongs[1].tiles[0].type == TileType.SOU && pongs[2].tiles[0].type == TileType.WAN) {
                return new Yaku.ThreeColorTriplets;
            } else {
                return null;
            }
        }
        if (pongs.length == 4) {
            if (this.ThreeColorTriplets([pongs[1], pongs[2], pongs[3]])) {
                return new Yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[2], pongs[3]])) {
                return new Yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[1], pongs[3]])) {
                return new Yaku.ThreeColorTriplets;
            }
            if (this.ThreeColorTriplets([pongs[0], pongs[1], pongs[2]])) {
                return new Yaku.ThreeColorTriplets;
            }
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with three quads.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for three quads.
     * @returns {Yaku.ThreeQuads} The three quads yaku.
     */
    ThreeQuads(partition) {
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        if (kongs.length == 3) {
            return new Yaku.ThreeQuads;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with all simples.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for all simples.
     * @returns {Yaku.AllSimples} The all simples yaku.
     */
    AllSimples(partition) {
        let NonSimples = TERMINALS.concat(HONORS);
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (NonSimples.indexOf(tile.number) >= 0) {
                return null;
            }
        }
        return new Yaku.AllSimples;
    }

    /**
     * Checks if a partition satisfies a hand with red dragon.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for red dragon.
     * @returns {Yaku.RedDragon} The red dragon yaku.
     */
    RedDragon(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == TileValue.RED) {
                return new Yaku.RedDragon;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with green dragon.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for green dragon.
     * @returns {Yaku.GreenDragon} The green dragon yaku.
     */
    GreenDragon(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == TileValue.GREEN) {
                return new Yaku.GreenDragon;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with white dragon.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for white dragon.
     * @returns {Yaku.WhiteDragon} The white dragon yaku.
     */
    WhiteDragon(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        for (let pong of pongs) {
            if (pong.tiles[0].value == TileValue.WHITE) {
                return new Yaku.WhiteDragon;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with north wind.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for north wind.
     * @returns {Yaku.NorthWind} The north wind yaku.
     */
    NorthWind(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == TileValue.NORTH) {
                return new Yaku.NorthWind;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with east wind.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for east wind.
     * @returns {Yaku.EastWind} The east wind yaku.
     */
    EastWind(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == TileValue.EAST) {
                return new Yaku.EastWind;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with south wind.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for south wind.
     * @returns {Yaku.SouthWind} The south wind yaku.
     */
    SouthWind(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == TileValue.SOUTH) {
                return new Yaku.SouthWind;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with west wind.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for west wind.
     * @returns {Yaku.WestWind} The west wind yaku.
     */
    WestWind(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        for (let meld of melds) {
            if (meld.tiles[0].value == TileValue.WEST) {
                return new Yaku.WestWind;
            }
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with mixed outside hand.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for mixed outside hand.
     * @returns {Yaku.MixedOutsideHand} The mixed outside hand yaku.
     */
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
            } else {
                PartitionOutsideTiles.push(false);
            }
        }
        if (PartitionOutsideTiles.every(elem => elem)) {
            return new Yaku.MixedOutsideHand;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with pure outside hand.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for pure outside hand.
     * @returns {Yaku.PureOutsideHand} The pure outside hand yaku.
     */
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
            } else {
                PartitionOutsideTiles.push(false);
            }
        }
        if (PartitionOutsideTiles.every(elem => elem)) {
            return new Yaku.PureOutsideHand;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with little three dragons.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for little three dragons.
     * @returns {Yaku.LittleThreeDragons} The little three dragons yaku.
     */
    LittleThreeDragons(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 2) return null;
        if (!(partition[partition.length - 1].tiles[0].value == TileValue.GREEN ||
                partition[partition.length - 1].tiles[0].value == TileValue.RED ||
                partition[partition.length - 1].tiles[0].value == TileValue.WHITE)) return null;
        let DragonValues = [TileValue.GREEN, TileValue.RED, TileValue.WHITE];
        DragonValues.splice(DragonValues.indexOf(partition[partition.length - 1].tiles[0].value), 1);
        for (let meld of melds) {
            for (let value of DragonValues) {
                if (meld.tiles[0].value == value) {
                    DragonValues.splice(DragonValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (DragonValues.length == 0) {
            return new Yaku.LittleThreeDragons;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with half flush.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for half flush.
     * @returns {Yaku.HalfFlush} The half flush yaku.
     */
    HalfFlush(partition) {
        let tiles = this.PartitionTiles(partition);
        let tileTypes = [];
        for (let tile of tiles) {
            tileTypes.push(tile.type);
        }
        tileTypes = tileTypes.filter(elem => elem == TileType.PIN || elem == TileType.SOU || elem == TileType.WAN);
        if (tileTypes.length == tiles.length || tileTypes.length == 0) return null;
        let type = tileTypes[0];
        if (tileTypes.every(elem => elem == type)) {
            return new Yaku.HalfFlush;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with flush.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for flush.
     * @returns {Yaku.Flush} The flush yaku.
     */
    Flush(partition) {
        let tiles = this.PartitionTiles(partition);
        let tileTypes = [];
        for (let tile of tiles) {
            tileTypes.push(tile.type);
        }
        tileTypes = tileTypes.filter(elem => elem == TileType.PIN || elem == TileType.SOU || elem == TileType.WAN);
        if (tileTypes.length != tiles.length || tileTypes.length == 0) return null;
        let type = tileTypes[0];
        if (tileTypes.every(elem => elem == type)) {
            return new Yaku.Flush;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with thirteen orphans.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for thirteen orphans.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.ThirteenOrphans} The thirteen orphans yaku.
     */
    ThirteenOrphans(hand, winningTile) {
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        let orphans = [new Tile(PIN_ONE), new Tile(PIN_NINE), new Tile(SOU_ONE), new Tile(SOU_NINE),
            new Tile(WAN_ONE), new Tile(WAN_NINE), new Tile(EAST), new Tile(SOUTH),
            new Tile(WEST), new Tile(NORTH), new Tile(DRAGON_GREEN), new Tile(DRAGON_RED),
            new Tile(DRAGON_WHITE)
        ];

        //tilesWithoutWinningTile cannot equal orphans
        //tiles must contain all orphans and a pair
        if (TileListEqual(tilesWithoutWinningTile, orphans)) return null; //takes care of double13orphans
        tiles = CopyTileList(hand.tiles);
        for (let orphan of orphans) {
            tiles = RemoveFromTileList(tiles, orphan);
        }
        if (tiles.length != 1) return null;
        if (TileListContains(orphans, tiles[0])) {
            return new Yaku.ThirteenOrphans;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with double thirteen orphans.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for double thirteen orphans.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.DoubleThirteenOrphans} The double thirteen orphans yaku.
     */
    DoubleThirteenOrphans(hand, winningTile) {
        let orphans = [new Tile(PIN_ONE), new Tile(PIN_NINE), new Tile(SOU_ONE), new Tile(SOU_NINE),
            new Tile(WAN_ONE), new Tile(WAN_NINE), new Tile(EAST), new Tile(SOUTH),
            new Tile(WEST), new Tile(NORTH), new Tile(DRAGON_GREEN), new Tile(DRAGON_RED),
            new Tile(DRAGON_WHITE)
        ];
        let tiles = CopyTileList(hand.tiles);
        let tempTiles = RemoveFromTileList(tiles, winningTile);
        if (TileListEqual(orphans, tempTiles)) {
            return new Yaku.DoubleThirteenOrphans;
        }
        return null;
    }

    /**
     * Checks if a partition satisfies a hand with four concealed triplets.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for four concealed triplets.
     * @param {Hand} hand The hand used to make the partition.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.FourConcealedTriplets} The four concealed triplets yaku.
     */
    FourConcealedTriplets(partition, hand, winningTile) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4) return null;
        if (melds.some(meld => meld.is_open)) return null;
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);

        //need to ensure tiles without winning tile has two pair.
        let uniqueTiles = TileListRemoveDuplicates(tilesWithoutWinningTile);
        let tileCounts = [];
        for (let uniqueTile of uniqueTiles) {
            tileCounts.push(TileListCount(tilesWithoutWinningTile, uniqueTile));
        }
        if (tileCounts.filter((count) => count == 2).length == 2) {
            return Yaku.FourConcealedTriplets;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with double four concealed triplets.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for double four concealed triplets.
     * @param {Hand} hand The hand used to make the partition.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.DoubleFourConcealedTriplets} The double four concealed triplets yaku.
     */
    DoubleFourConcealedTriplets(partition, hand, winningTile) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4) return null;
        if (melds.some(meld => meld.is_open)) return null;
        let tiles = CopyTileList(hand.tiles);
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);

        //ensure tiles without winning tile has a singular tile wait.
        let uniqueTiles = TileListRemoveDuplicates(tilesWithoutWinningTile);
        let tileCounts = [];
        for (let uniqueTile of uniqueTiles) {
            tileCounts.push(TileListCount(tilesWithoutWinningTile, uniqueTile));
        }
        if (tileCounts.filter((count) => count == 1).length == 1) {
            return new Yaku.DoubleFourConcealedTriplets;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with big three dragons.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for big three dragons.
     * @returns {Yaku.BigThreeDragons} The big three dragons yaku.
     */
    BigThreeDragons(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 3) return null;
        let DragonValues = [TileValue.GREEN, TileValue.RED, TileValue.WHITE];
        for (let meld of melds) {
            for (let value of DragonValues) {
                if (meld.tiles[0].value == value) {
                    DragonValues.splice(DragonValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (DragonValues.length == 0) {
            return new Yaku.BigThreeDragons;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with little four winds.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for little four winds.
     * @returns {Yaku.LittleFourWinds} The little four winds yaku.
     */
    LittleFourWinds(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 3) return null;
        if (!(partition[partition.length - 1].tiles[0].value == TileValue.NORTH ||
                partition[partition.length - 1].tiles[0].value == TileValue.EAST ||
                partition[partition.length - 1].tiles[0].value == TileValue.SOUTH ||
                partition[partition.length - 1].tiles[0].value == TileValue.WEST)) return null;
        let WindValues = [TileValue.NORTH, TileValue.EAST, TileValue.SOUTH, TileValue.WEST];
        WindValues.splice(WindValues.indexOf(partition[partition.length - 1].tiles[0].value), 1);
        for (let meld of melds) {
            for (let value of WindValues) {
                if (meld.tiles[0].value == value) {
                    WindValues.splice(WindValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (WindValues.length == 0) {
            return new Yaku.LittleFourWinds;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with big four winds.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for big four winds.
     * @returns {Yaku.BigFourWinds} The big four winds yaku.
     */
    BigFourWinds(partition) {
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = pongs.concat(kongs);
        if (melds.length < 4) return null;
        let WindValues = [TileValue.NORTH, TileValue.EAST, TileValue.SOUTH, TileValue.WEST];
        for (let meld of melds) {
            for (let value of WindValues) {
                if (meld.tiles[0].value == value) {
                    WindValues.splice(WindValues.indexOf(meld.tiles[0].value), 1);
                }
            }
        }
        if (WindValues.length == 0) {
            return new Yaku.BigFourWinds;
        } else {
            return null;
        }
    }

    /**
     * Checks if a partition satisfies a hand with all honors.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for all honors.
     * @returns {Yaku.AllHonors} The all honors yaku.
     */
    AllHonors(partition) {
        let Honors = HONORS;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Honors.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new Yaku.AllHonors;
    }

    /**
     * Checks if a partition satisfies a hand with all terminals.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for all terminals.
     * @returns {Yaku.AllTerminals} The all terminals yaku.
     */
    AllTerminals(partition) {
        let Terminals = TERMINALS;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Terminals.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new Yaku.AllTerminals;
    }

    /**
     * Checks if a partition satisfies a hand with all green.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for all green.
     * @returns {Yaku.AllGreen} The all green yaku.
     */
    AllGreen(partition) {
        let Green = GREEN;
        let tiles = this.PartitionTiles(partition);
        for (let tile of tiles) {
            if (Green.indexOf(tile.number) == -1) {
                return null;
            }
        }
        return new Yaku.AllGreen;
    }

    /**
     * Checks if a partition satisfies a hand with nine gates.
     * 
     * @param {(Meld | Pair)[]} partition A partition of the hand.
     * @param {Hand} hand The hand used to make the partition.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.NineGates} The nine gates yaku.
     */
    NineGates(partition, hand, winningTile) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = chows.concat(pongs.concat(kongs));
        if (melds.length < 4) return null;
        if (melds.some(meld => meld.is_open)) return null;

        let tiles = CopyTileList(hand.tiles);
        let suit = tiles[0].type;
        let suitString = '';
        if (suit == TileType.PIN) suitString = 'p';
        else if (suit == TileType.SOU) suitString = 's';
        else if (suit == TileType.WAN) suitString = 'a';
        let gatesCore = TileList(suitString + '1112345678999');

        //Ensure all tiles are the same suit.
        if (tiles.filter((tile) => tile.type == suit).length != tiles.length) return null;

        //Ensure it is not PureNineGates.
        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        if (TileListEqual(tilesWithoutWinningTile, gatesCore)) return null;

        tiles = CopyTileList(hand.tiles);
        //Ensure it contains 1112345678999 of suit plus one other tile of that suit.
        for (let gate of gatesCore) {
            if (TileListContains(tiles, gate)) {
                tiles = RemoveFromTileList(tiles, gate);
            } else { //Tiles do not contain the 9 gates tiles.
                return null;
            }
        }
        if (TileListContains(gatesCore, tiles[0])) return Yaku.NineGates;
        else return null;
    }

    /**
     * Checks if a partition satisfies a hand with double nine gates.
     * 
     * @param {(Meld | Pair)[]} partition A partition of the hand.
     * @param {Hand} hand The hand used to make the partition.
     * @param {Tile} winningTile The tile used to complete the hand.
     * @returns {Yaku.DoubleNineGates} The double nine gates yaku.
     */
    DoubleNineGates(partition, hand, winningTile) {
        let chows = this.MeldsOfType(partition, MeldType.CHOW);
        let pongs = this.MeldsOfType(partition, MeldType.PONG);
        let kongs = this.MeldsOfType(partition, MeldType.KONG);
        let melds = chows.concat(pongs.concat(kongs));
        if (melds.length < 4) return null;
        if (melds.some(meld => meld.is_open)) return null;

        let tiles = CopyTileList(hand.tiles);
        let suit = tiles[0].type;
        let suitString = '';
        if (suit == TileType.PIN) suitString = 'p';
        else if (suit == TileType.SOU) suitString = 's';
        else if (suit == TileType.WAN) suitString = 'a';
        let gatesCore = TileList(suitString + '1112345678999');

        //Ensure all tiles are the same suit.
        if (tiles.filter((tile) => tile.type == suit).length != tiles.length) return null;

        let tilesWithoutWinningTile = RemoveFromTileList(tiles, winningTile);
        if (TileListEqual(tilesWithoutWinningTile, gatesCore)) {
            if (TileListContains(gatesCore, winningTile)) return Yaku.DoubleNineGates;
            else return null;
        } else return null;
    }

    /**
     * Checks if a partition satisfies a hand with four quads.
     * 
     * @param {(Meld | Pair)[]} partition The partition to check for four quads.
     * @returns {Yaku.FourQuads} The four quads yaku.
     */
    FourQuads(partition) {
        let quads = this.MeldsOfType(partition, MeldType.KONG);
        if (quads.length == 4) {
            return new Yaku.FourQuads;
        } else {
            return null;
        }
    }

    SevenPairs(partition) {
        if (partition.length == 7) {
            let uniqueTiles = TileListRemoveDuplicates(this.PartitionTiles(partition));
            if (uniqueTiles.length == 7) return new Yaku.SevenPairs;
        }
        return null;
    }
}

module.exports = {
    Yaku_Evaluate: Yaku_Evaluate
}