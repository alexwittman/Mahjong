class _Yaku {
    private _yakuID : number;
    private _nameENG : string;
    private _nameJAP : string;
    private _hanOpen : number;
    private _hanClosed : number;
    private _isYakuman : boolean;

    constructor(YakuID : number,
                NameENG : string,
                NameJAP : string,
                HanOpen : number,
                HanClosed : number,
                IsYakuman : boolean) {
        this._yakuID = YakuID;
        this._nameENG = NameENG;
        this._nameJAP = NameJAP;
        this._hanOpen = HanOpen;
        this._hanClosed = HanClosed;
        this._isYakuman = IsYakuman;
    }

    get yakuID() : number {
        return this._yakuID;
    }

    get nameENG() : string {
        return this._nameENG;
    }

    get nameJAP() : string {
        return this._nameJAP;
    }

    get hanOpen() : number {
        return this._hanOpen;
    }

    get hanClosed() : number {
        return this._hanClosed;
    }

    get isYakuman() : boolean {
        return this._isYakuman;
    }
}

class _NoPointsHand extends _Yaku{
    constructor(){
        super(1, 'No Points Hand', 'Pinfu', NaN, 1, false);
    }
}

class _IdenticalSequences extends _Yaku{
    constructor(){
        super(2, 'Identical Sequences', 'Iipeikou', NaN, 1, false);
    }
}

class _ThreeColorStraight extends _Yaku{
    constructor(){
        super(3, 'Three Color Straight', 'Sanshoku', 1, 2, false);
    }
}

class _Straight extends _Yaku{
    constructor(){
        super(4, 'Straight', 'Ittsuu', 1, 2, false);
    }
}

class _DoubleIdenticalSequences extends _Yaku{
    constructor(){
        super(5, 'Double Identical Sequences', 'Ryanpeikou', NaN, 3, false);
    }
}

class _AllTripletHand extends _Yaku{
    constructor(){
        super(6, 'All Triplet Hand', 'Toitoi', 2, NaN, false);
    }
}

class _ThreeClosedTriplets extends _Yaku{
    constructor(){
        super(7, 'Three Closed Triplets', 'Sanankou', 2, 2, false);
    }
}

class _ThreeColorTriplets extends _Yaku{
    constructor(){
        super(8, 'Three Color Triplets', 'Sanshoku Doukou', 2, 2, false);
    }
}

class _ThreeQuads extends _Yaku{
    constructor(){
        super(9, 'Three Quads', 'San Kantsu', 2, 2, false);
    }
}

class _AllSimples extends _Yaku{
    constructor(){
        super(10, 'All Simples', 'Tan\'yao', 1, 1, false);
    }
}

class _RedDragon extends _Yaku{
    constructor(){
        super(11, 'Red Dragon', '', 1, 1, false);
    }
}

class _GreenDragon extends _Yaku{
    constructor(){
        super(12, 'Green Dragon', '', 1, 1, false);
    }
}

class _WhiteDragon extends _Yaku{
    constructor(){
        super(13, 'White Dragon', '', 1, 1, false);
    }
}

class _NorthWind extends _Yaku{
    constructor(){
        super(14, 'North Wind', '', 1, 1, false);
    }
}

class _EastWind extends _Yaku{
    constructor(){
        super(15, 'East Wind', '', 1, 1, false);
    }
}

class _SouthWind extends _Yaku{
    constructor(){
        super(16, 'South Wind', '', 1, 1, false);
    }
}

class _WestWind extends _Yaku{
    constructor(){
        super(17, 'West Wind', '', 1, 1, false);
    }
}

class _MixedOutsideHand extends _Yaku{
    constructor(){
        super(18, 'Mixed Outside Hand', 'Chanta', 1, 2, false);
    }
}

class _PureOutsideHand extends _Yaku{
    constructor(){
        super(19, 'Pure Outside Hand', 'Junchan', 2, 3, false);
    }
}

class _LittleThreeDragons extends _Yaku{
    constructor(){
        super(20, 'Little Three Dragons', 'Shousangen', 2, 2, false);
    }
}

class _HalfFlush extends _Yaku{
    constructor(){
        super(21, 'Half Flush', 'Hon\'itsu', 2, 3, false);
    }
}

class _Flush extends _Yaku{
    constructor(){
        super(22, 'Flush', 'Chin\'itsu', 5, 6, false);
    }
}

class _ThirteenOrphans extends _Yaku{
    constructor(){
        super(23, 'Thirteen Orphans', 'Kokushi Musou', NaN, 13, true);
    }
}

class _DoubleThirteenOrphans extends _Yaku{
    constructor(){
        super(24, 'Double Thirteen Orphans', 'Daburu Kokushi Musou', NaN, 26, true);
    }
}

class _FourConcealedTriplets extends _Yaku{
    constructor(){
        super(25, 'Four Concealed Triplets', 'Suu Ankou', NaN, 13, true);
    }
}

class _DoubleFourConcealedTriplets extends _Yaku{
    constructor(){
        super(26, 'Double Four Concealed Triplets', 'Daburu Suu Ankou', NaN, 26, true);
    }
}

class _BigThreeDragons extends _Yaku{
    constructor(){
        super(27, 'Big Three Dragons', 'Daisangen', 13, 13, true);
    }
}

class _LittleFourWinds extends _Yaku{
    constructor(){
        super(28, 'Little Four Winds', 'Shousuushii', 13, 13, true);
    }
}

class _BigFourWinds extends _Yaku{
    constructor(){
        super(29, 'Big Four Winds', 'Daisuushii', 26, 26, true);
    }
}

class _AllHonors extends _Yaku{
    constructor(){
        super(30, 'All Honors', 'Tsuuiisou', 13, 13, true);
    }
}

class _AllTerminals extends _Yaku{
    constructor(){
        super(31, 'All Terminals', 'Chinroutou', 13, 13, true);
    }
}

class _AllGreen extends _Yaku{
    constructor(){
        super(32, 'All Green', 'Ryuuiisou', 13, 13, true);
    }
}

class _NineGates extends _Yaku{
    constructor(){
        super(33, 'Nine Gates', 'Chuuren Poutou', NaN, 13, true);
    }
}

class _DoubleNineGates extends _Yaku{
    constructor(){
        super(34, 'Double Nine Gates', 'Daburu Chuuren Poutou', NaN, 26, true);
    }
}

class _FourQuads extends _Yaku{
    constructor(){
        super(35, 'Four Quads', 'Suu Kantsu', 13, 13, true);
    }
}

class _ReadyHand extends _Yaku{
    constructor(){
        super(36, 'Ready Hand', 'Riichi', NaN, 1, false);
    }
}

class _DiscardOnlyHonorsAndTerminals extends _Yaku{
    constructor(){
        super(37, 'DiscardOnlyHonorsAndTerminals', 'Nagashi Mangan', 5, 5, false);
    }
}

class _SelfDraw extends _Yaku{
    constructor(){
        super(38, 'Self Draw', 'Tsumo', NaN, 1, false);
    }
}

class _OneShot extends _Yaku{
    constructor(){
        super(39, 'One Shot', 'Ippatsu', NaN, 1, false);
    }
}

class _LastTile extends _Yaku{
    constructor(){
        super(40, 'Last Tile', 'Haitei', 1, 1, false);
    }
}

class _LastDiscard extends _Yaku{
    constructor(){
        super(41, 'Last Discard', 'Houtei', 1, 1, false);
    }
}

class _DeadWallDraw extends _Yaku{
    constructor(){
        super(42, 'Dead Wall Draw', 'Rinshan', 1, 1, false);
    }
}

class _RobbingAQuad extends _Yaku{
    constructor(){
        super(43, 'Robbing a Quad', 'Chankan', 1, 1, false);
    }
}

class _DoubleReady extends _Yaku{
    constructor(){
        super(44, 'Double Ready', 'Daburii', NaN, 2, false);
    }
}

class _HeavenlyHand extends _Yaku{
    constructor(){
        super(45, 'Heavenly Hand', 'Tenhou', NaN, 13, true);
    }
}

class _HandOfEarth extends _Yaku{
    constructor(){
        super(46, 'Hand of Earth', 'Chiihou', NaN, 13, true);
    }
}

class _HandOfMan extends _Yaku{
    constructor(){
        super(47, 'Hand of Man', 'Renhou', NaN, 13, true);
    }
}

module.exports = {
    Yaku: _Yaku,
    NoPointsHand: _NoPointsHand,
    IdenticalSequences: _IdenticalSequences,
    ThreeColorStraight: _ThreeColorStraight,
    Straight: _Straight,
    ThreeQuads: _ThreeQuads,
    AllSimples: _AllSimples,
    RedDragon: _RedDragon,
    GreenDragon: _GreenDragon,
    WhiteDragon: _WhiteDragon,
    NorthWind: _NorthWind,
    EastWind: _EastWind,
    SouthWind: _SouthWind,
    WestWind: _WestWind,
    MixedOutsideHand: _MixedOutsideHand,
    PureOutsideHand: _PureOutsideHand,
    LittleThreeDragons: _LittleThreeDragons,
    HalfFlush: _HalfFlush,
    Flush: _Flush,
    ThirteenOrphans: _ThirteenOrphans,
    DoubleThirteenOrphans: _DoubleThirteenOrphans,
    FourConcealedTriplets: _FourConcealedTriplets,
    DoubleFourConcealedTriplets: _DoubleFourConcealedTriplets,
    BigThreeDragons: _BigThreeDragons,
    LittleFourWinds: _LittleFourWinds,
    BigFourWinds: _BigFourWinds,
    AllHonors: _AllHonors,
    AllTerminals: _AllTerminals,
    AllGreen: _AllGreen,
    NineGates: _NineGates,
    DoubleNineGates: _DoubleNineGates,
    FourQuads: _FourQuads,
    ReadyHand: _ReadyHand,
    DiscardOnlyHonorsAndTerminals: _DiscardOnlyHonorsAndTerminals,
    SelfDraw: _SelfDraw,
    OneShot: _OneShot,
    LastTile: _LastTile,
    LastDiscard: _LastDiscard,
    DeadWallDraw: _DeadWallDraw,
    RobbingAQuad: _RobbingAQuad,
    DoubleReady: _DoubleReady,
    HeavenlyHand: _HeavenlyHand,
    HandOfEarth: _HandOfEarth,
    HandOfMan: _HandOfMan
}