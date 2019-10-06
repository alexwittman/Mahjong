/**
 * Parent class for all yaku.
 */
class Yaku {

    /**
     * Yaku constructor for different yaku.
     * 
     * @param {number} YakuID Number to identify the yaku.
     * @param {string} NameENG English name of the yaku.
     * @param {string} NameJAP Japanese name of the yaku.
     * @param {number} HanOpen The value of the yaku when open.
     * @param {number} HanClosed The value of the yaku when closed.
     * @param {boolean} IsYakuman Whether the yaku is worth yakuman.
     */
    constructor(YakuID,
                NameENG,
                NameJAP,
                HanOpen,
                HanClosed,
                IsYakuman) {
        this._yakuID = YakuID;
        this._nameENG = NameENG;
        this._nameJAP = NameJAP;
        this._hanOpen = HanOpen;
        this._hanClosed = HanClosed;
        this._isYakuman = IsYakuman;
    }

    /**
     * Getter method for the yaku's id.
     * 
     * @returns {number} The yaku's id.
     */
    get yakuID() {
        return this._yakuID;
    }

    /**
     * Getter method for the yaku's english name.
     * 
     * @returns {string} The yaku's english name.
     */
    get nameENG() {
        return this._nameENG;
    }

    /**
     * Getter method for the yaku's japanese name.
     * 
     * @returns {string} The yaku's japanese name.
     */
    get nameJAP() {
        return this._nameJAP;
    }

    /**
     * Getter method for the yaku's value when open.
     * 
     * @returns {number} The yaku's value when open.
     */
    get hanOpen() {
        return this._hanOpen;
    }

    /**
     * Getter method for the yaku's value when closed.
     * 
     * @returns {number} The yaku's value when closed.
     */
    get hanClosed() {
        return this._hanClosed;
    }

    /**
     * Getter method for the yakuman status of the yaku.
     * 
     * @returns {boolean} True if the yaku is worth yakuman, false otherwise.
     */
    get isYakuman() {
        return this._isYakuman;
    }
}

/**
 * A hand worth no additional fu points. No triplets or quads.
 * No pair of dragons or valued winds. Cannot be in a closed,
 * edge or pair wait.
 * 
 * If no points hand and tsumo yaku are met, then count
 * the tsumo yaku and award the extra 2 fu, since it will
 * be worth more points.
 */
class NoPointsHand extends Yaku{
    constructor(){
        super(1, 'No Points Hand', 'Pinfu', NaN, 1, false);
    }
}

/**
 * One set of two sequences of the same
 * numbers in the same suit.
 */
class IdenticalSequences extends Yaku{
    constructor(){
        super(2, 'Identical Sequences', 'Iipeikou', NaN, 1, false);
    }
}

/**
 * Three sequences of the same numbers
 * in all three suits.
 */
class ThreeColorStraight extends Yaku{
    constructor(){
        super(3, 'Three Color Straight', 'Sanshoku', 1, 2, false);
    }
}

/**
 * A straight from number 1 - 9 of one
 * suit, namely, three sequences of 123, 456, and 789.
 */
class Straight extends Yaku{
    constructor(){
        super(4, 'Straight', 'Ittsuu', 1, 2, false);
    }
}

/**
 * One set of identical sequences and another set that
 * can match the first.
 * 
 * The seven pairs yaku is not counted in this case
 * because the yaku is composed of sequences instead of pairs.
 */
class DoubleIdenticalSequences extends Yaku{
    constructor(){
        super(5, 'Double Identical Sequences', 'Ryanpeikou', NaN, 3, false);
    }
}

/**
 * A hand consisting of all triplets or quads; no sequences.
 * 
 * If all four triplets/quads are closed this hand will become
 * four closed triplets worth yakuman.
 */
class AllTripletHand extends Yaku{
    constructor(){
        super(6, 'All Triplet Hand', 'Toitoi', 2, NaN, false);
    }
}

/**
 * Three sets of triplets or quads formed without calling any
 * tiles. The tiles for thr three triplets or quads must all
 * be self-drawn in order to count. The fourth set can be an
 * open triplet/quad or sequence.
 */
class ThreeClosedTriplets extends Yaku{
    constructor(){
        super(7, 'Three Closed Triplets', 'Sanankou', 2, 2, false);
    }
}

/**
 * Three triplets or quads consisting of the same numbers in all
 * three suits.
 */
class ThreeColorTriplets extends Yaku{
    constructor(){
        super(8, 'Three Color Triplets', 'Sanshoku Doukou', 2, 2, false);
    }
}

/**
 * Three quads in one hand, which can be open or closed.
 */
class ThreeQuads extends Yaku{
    constructor(){
        super(9, 'Three Quads', 'San Kantsu', 2, 2, false);
    }
}

/**
 * No 1s or 9s. Only numbered tiles from 2 through 8 are
 * used, eliminating terminals and honors.
 */
class AllSimples extends Yaku{
    constructor(){
        super(10, 'All Simples', 'Tan\'yao', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of red dragon tiles.
 */
class RedDragon extends Yaku{
    constructor(){
        super(11, 'Red Dragon', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of green dragon tiles.
 */
class GreenDragon extends Yaku{
    constructor(){
        super(12, 'Green Dragon', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of white dragon tiles.
 */
class WhiteDragon extends Yaku{
    constructor(){
        super(13, 'White Dragon', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of north wind tiles if
 * north is the round wind or the player's seat wind.
 */
class NorthWind extends Yaku{
    constructor(){
        super(14, 'North Wind', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of east wind tiles if
 * east is the round wind or the player's seat wind.
 */
class EastWind extends Yaku{
    constructor(){
        super(15, 'East Wind', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of south wind tiles if
 * south is the round wind or the player's seat wind.
 */
class SouthWind extends Yaku{
    constructor(){
        super(16, 'South Wind', '', 1, 1, false);
    }
}

/**
 * A triplet or quad composed of west wind tiles if
 * west is the round wind or the player's seat wind.
 */
class WestWind extends Yaku{
    constructor(){
        super(17, 'West Wind', '', 1, 1, false);
    }
}

/**
 * The sequences in the hand must be 123 or 789, and triplets
 * or quads and the pair must be terminals or honor tiles.
 * The hand must contain at least one sequence.
 */
class MixedOutsideHand extends Yaku{
    constructor(){
        super(18, 'Mixed Outside Hand', 'Chanta', 1, 2, false);
    }
}

/**
 * The sequences in the hand must be 123 or 789, and triplets
 * or quads and the pair must be 1s or 9s. The hand must not
 * contain an honor tile. The hand must contain at least one
 * sequence.
 */
class PureOutsideHand extends Yaku{
    constructor(){
        super(19, 'Pure Outside Hand', 'Junchan', 2, 3, false);
    }
}

/**
 * Two triplets or quads of dragons plus a pair of the third.
 */
class LittleThreeDragons extends Yaku{
    constructor(){
        super(20, 'Little Three Dragons', 'Shousangen', 2, 2, false);
    }
}

/**
 * The hand contains tiles from one suit and honors. The 
 * honors can be two or more sets. The hand can be seven pairs.
 */
class HalfFlush extends Yaku{
    constructor(){
        super(21, 'Half Flush', 'Hon\'itsu', 2, 3, false);
    }
}

/**
 * All tiles in the hand are exclusively of one suit with
 * no honor tiles.
 */
class Flush extends Yaku{
    constructor(){
        super(22, 'Flush', 'Chin\'itsu', 5, 6, false);
    }
}

/**
 * One of each dragon tile, one of each wind tile, a 1 and 9
 * from each suit, plus any tile that matches anything else
 * in the hand.
 * 
 * Must not be in a 13 tile wait.
 */
class ThirteenOrphans extends Yaku{
    constructor(){
        super(23, 'Thirteen Orphans', 'Kokushi Musou', NaN, 13, true);
    }
}

/**
 * One of each dragon tile, one of each wind tile, a 1 and 9
 * from each suit, plus any tile that matches anything else
 * in the hand.
 * 
 * Must be in a 13 tile wait.
 */
class DoubleThirteenOrphans extends Yaku{
    constructor(){
        super(24, 'Double Thirteen Orphans', 'Daburu Kokushi Musou', NaN, 26, true);
    }
}

/**
 * A hand that has four closed triplets/quads.
 * 
 * Must be in a two tile wait and must draw winning tile, otherwise
 * it is only three closed triplets.
 */
class FourConcealedTriplets extends Yaku{
    constructor(){
        super(25, 'Four Concealed Triplets', 'Suu Ankou', NaN, 13, true);
    }
}

/**
 * A hand that has four closed triplets/quads.
 * 
 * Must be in a one tile wait and can draw or steal winning tile.
 */
class DoubleFourConcealedTriplets extends Yaku{
    constructor(){
        super(26, 'Double Four Concealed Triplets', 'Daburu Suu Ankou', NaN, 26, true);
    }
}

/**
 * A triplet or quad of each type of dragon tile.
 */
class BigThreeDragons extends Yaku{
    constructor(){
        super(27, 'Big Three Dragons', 'Daisangen', 13, 13, true);
    }
}

/**
 * A hand consisting of three triplets/quads of winds and
 * a pair of the fourth wind.
 */
class LittleFourWinds extends Yaku{
    constructor(){
        super(28, 'Little Four Winds', 'Shousuushii', 13, 13, true);
    }
}

/**
 * A hand consisting of four triplets/quads of winds.
 */
class BigFourWinds extends Yaku{
    constructor(){
        super(29, 'Big Four Winds', 'Daisuushii', 26, 26, true);
    }
}

/**
 * A hand composed of only honor tiles.
 */
class AllHonors extends Yaku{
    constructor(){
        super(30, 'All Honors', 'Tsuuiisou', 13, 13, true);
    }
}

/**
 * A hand composed of only 1s and 9s.
 */
class AllTerminals extends Yaku{
    constructor(){
        super(31, 'All Terminals', 'Chinroutou', 13, 13, true);
    }
}

/**
 * A hand consisting of only green tiles. Green tiles include
 * 23468 of bamboo and green dragon tiles.
 */
class AllGreen extends Yaku{
    constructor(){
        super(32, 'All Green', 'Ryuuiisou', 13, 13, true);
    }
}

/**
 * A hand composed of 1112345678999 of one suit plus any
 * other tile of the same suit.
 * 
 * Must not be in a 9 tile wait.
 */
class NineGates extends Yaku{
    constructor(){
        super(33, 'Nine Gates', 'Chuuren Poutou', NaN, 13, true);
    }
}

/**
 * A hand composed of 1112345678999 of one suit plus any 
 * other tile of the same suit.
 * 
 * Must be in a 9 tile wait.
 */
class DoubleNineGates extends Yaku{
    constructor(){
        super(34, 'Double Nine Gates', 'Daburu Chuuren Poutou', NaN, 26, true);
    }
}

/**
 * Four quads in one hand, which can be open or closed. Normally,
 * a hand is a draw when four quads are made by two or more players.
 * However, when the four quads are drawn by one player, the play
 * continues until the player claims a win or a fifth quad is made
 * by another player.
 */
class FourQuads extends Yaku{
    constructor(){
        super(35, 'Four Quads', 'Suu Kantsu', 13, 13, true);
    }
}

/**
 * When a player's hand needs only one tile to win and the player
 * has not claimed another player's discards to make open melds,
 * then the player has the option to declare riici. The player
 * does not need to declare riichi, but must declare it to 
 * add this yaku to a winning hand.
 * 
 * To make a declaration, the player calls out "riichi", discards
 * their tile sideways, and places a 1000 point stick on the table
 * as a deposit. From this point onward, the player must discard
 * any drawn tile that does not allow them to win. Also, they may
 * not change the content of their hand under any circumstances
 */
class ReadyHand extends Yaku{
    constructor(){
        super(36, 'Ready Hand', 'Riichi', NaN, 1, false);
    }
}

/**
 * A hand must be a non-abortive draw.
 * None of the player's discards have been called.
 * The player's discards are all terminals and honors.
 */
class DiscardOnlyHonorsAndTerminals extends Yaku{
    constructor(){
        super(37, 'DiscardOnlyHonorsAndTerminals', 'Nagashi Mangan', 5, 5, false);
    }
}

/**
 * When a player has a closed hand and draws a winning tile
 * from the wall or the dead wall, one han is added including
 * when the hand previously had no yaku.
 * Open hands are not applicable.
 */
class SelfDraw extends Yaku{
    constructor(){
        super(38, 'Self Draw', 'Tsumo', NaN, 1, false);
    }
}

/**
 * If a player declares riichi and then completes their hand
 * within one go-around of play, it adds one han to the hand's
 * value. The winning tile can be either a discard or a self
 * drawn tile. One shot no longer applies when another player 
 * makes an open meld, including closed quads.
 */
class OneShot extends Yaku{
    constructor(){
        super(39, 'One Shot', 'Ippatsu', NaN, 1, false);
    }
}

/**
 * If the last self-drawn tile that the last player draws before
 * reaching the dead wall completes that player's hand, the hand's
 * value increases by one han.
 */
class LastTile extends Yaku{
    constructor(){
        super(40, 'Last Tile', 'Haitei', 1, 1, false);
    }
}

/**
 * One han is added if a player wins on the last discard, that is,
 * the tile discarded by the last player that drew the last tile
 * from the wall.
 */
class LastDiscard extends Yaku{
    constructor(){
        super(41, 'Last Discard', 'Houtei', 1, 1, false);
    }
}

/**
 * When a player declares a quad, they must draw a supplemental
 * tile from the dead wall to keep the number of tiles in the 
 * hand consistent. If that tile completes the hand, it adds
 * one han to the hand's value.
 */
class DeadWallDraw extends Yaku{
    constructor(){
        super(42, 'Dead Wall Draw', 'Rinshan', 1, 1, false);
    }
}

/**
 * If a player has an open triplet and draws the fourth tile,
 * they can add it to the triplet to make the quad. At the time
 * another player player can win on the tile, namely, they can
 * "rob" that tile.
 */
class RobbingAQuad extends Yaku{
    constructor(){
        super(43, 'Robbing a Quad', 'Chankan', 1, 1, false);
    }
}

/**
 * If a player can declare riichi within the first go-around of
 * a hand, they can call "double riichi" to declare riichi for 
 * two han instead of one. 
 */
class DoubleReady extends Yaku{
    constructor(){
        super(44, 'Double Ready', 'Daburii', NaN, 2, false);
    }
}

/**
 * If the 14 tiles that the dealer draws complete a hand, yakuman
 * is awarded regardless of its contents. The one yaku minimum
 * requirement is satisfied with the self-pick yaku because the
 * hand is closed and the 14th tile is considered a drawn tile.
 */
class HeavenlyHand extends Yaku{
    constructor(){
        super(45, 'Heavenly Hand', 'Tenhou', NaN, 13, true);
    }
}

/**
 * If a non-dealer is dealt 13 tiles that are one tile away from
 * completing a hand, and then draws the 14th tile from the wall
 * to complete it on the first draw when no open meld declaration
 * has been made, the hand is given yakuman points. The one yaku 
 * minimum requirement is satisfied with the self-pick yaku because
 * the hand is closed and the 14th tile is considered a drawn tile.
 */
class HandOfEarth extends Yaku{
    constructor(){
        super(46, 'Hand of Earth', 'Chiihou', NaN, 13, true);
    }
}

/**
 * If a non-dealer completes a hand with a discard before the
 * player draws its first tile when no one has declared open
 * melds, then the yaku is awarded.
 */
class HandOfMan extends Yaku{
    constructor(){
        super(47, 'Hand of Man', 'Renhou', NaN, 13, true);
    }
}

module.exports.Yaku = Yaku;
module.exports.NoPointsHand = NoPointsHand;
module.exports.IdenticalSequences = IdenticalSequences;
module.exports.ThreeColorStraight = ThreeColorStraight;
module.exports.Straight = Straight;
module.exports.DoubleIdenticalSequences = DoubleIdenticalSequences;
module.exports.AllTripletHand = AllTripletHand;
module.exports.ThreeClosedTriplets = ThreeClosedTriplets;
module.exports.ThreeColorTriplets = ThreeColorTriplets;
module.exports.ThreeQuads = ThreeQuads;
module.exports.AllSimples = AllSimples;
module.exports.RedDragon = RedDragon;
module.exports.GreenDragon = GreenDragon;
module.exports.WhiteDragon = WhiteDragon;
module.exports.NorthWind = NorthWind;
module.exports.EastWind = EastWind;
module.exports.SouthWind = SouthWind;
module.exports.WestWind = WestWind;
module.exports.MixedOutsideHand = MixedOutsideHand;
module.exports.PureOutsideHand = PureOutsideHand;
module.exports.LittleThreeDragons = LittleThreeDragons;
module.exports.HalfFlush = HalfFlush;
module.exports.Flush = Flush;
module.exports.ThirteenOrphans = ThirteenOrphans;
module.exports.DoubleThirteenOrphans = DoubleThirteenOrphans;
module.exports.FourConcealedTriplets = FourConcealedTriplets;
module.exports.DoubleFourConcealedTriplets = DoubleFourConcealedTriplets;
module.exports.BigThreeDragons = BigThreeDragons;
module.exports.LittleFourWinds = LittleFourWinds;
module.exports.BigFourWinds = BigFourWinds;
module.exports.AllHonors = AllHonors;
module.exports.AllTerminals = AllTerminals;
module.exports.AllGreen = AllGreen;
module.exports.NineGates = NineGates;
module.exports.DoubleNineGates = DoubleNineGates;
module.exports.FourQuads = FourQuads;
module.exports.ReadyHand = ReadyHand;
module.exports.DiscardOnlyHonorsAndTerminals = DiscardOnlyHonorsAndTerminals;
module.exports.SelfDraw = SelfDraw;
module.exports.OneShot = OneShot;
module.exports.LastTile = LastTile;
module.exports.LastDiscard = LastDiscard;
module.exports.DeadWallDraw = DeadWallDraw;
module.exports.RobbingAQuad = RobbingAQuad;
module.exports.DoubleReady = DoubleReady;
module.exports.HeavenlyHand = HeavenlyHand;
module.exports.HandOfEarth = HandOfEarth;
module.exports.HandOfMan = HandOfMan;