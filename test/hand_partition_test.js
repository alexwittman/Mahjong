let expect = require('chai').expect;
let Tile = require('../src/game/tile').Tile;
let TileList = require('../src/game/tile').TileList;
let Hand_Partition = require('../src/game/hand_partition').Hand_Partition;
let Meld = require('../src/game/meld').Meld;
let Hand = require('../src/game/hand').Hand;
let Pair = require('../src/game/pair').Pair;
let CopyTileList = require('../src/game/tile').CopyTileList;

describe('Hand Partition', () => {

    const PONG_PIN_ONE = [new Tile(0), new Tile(0), new Tile(0)];
    const PONG_SOU_ONE = [new Tile(9), new Tile(9), new Tile(9)];
    const PONG_WAN_ONE = [new Tile(18), new Tile(18), new Tile(18)];
    const PONG_EAST = [new Tile(27), new Tile(27), new Tile(27)];

    const CHOW_PIN234 = [new Tile(1), new Tile(2), new Tile(3)];
    const CHOW_SOU234 = [new Tile(10), new Tile(11), new Tile(12)];
    const CHOW_WAN234 = [new Tile(19), new Tile(20), new Tile(21)];
    const CHOW_PIN789 = [new Tile(6), new Tile(7), new Tile(8)];

    const KONG_PIN_FIVE = [new Tile(4), new Tile(4), new Tile(4), new Tile(4)];
    const KONG_SOU_FIVE = [new Tile(13), new Tile(13), new Tile(13), new Tile(13)];
    const KONG_WAN_FIVE = [new Tile(22), new Tile(22), new Tile(22), new Tile(22)];
    const KONG_GREEN = [new Tile(31), new Tile(31), new Tile(31), new Tile(31)];

    const handPartition = new Hand_Partition();

    it('can be constructed without any parameters', () => {
        const handPartition = new Hand_Partition();
        expect(handPartition).to.exist;
    });

    it('partition() works on a hand of tiles and melds', () => {
        const pair = [new Tile(32), new Tile(32)];
        const hand = new Hand(pair, [new Meld(CopyTileList(PONG_PIN_ONE)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(PONG_WAN_ONE)), new Meld(CopyTileList(CHOW_PIN234))]);
        const partition = [[new Meld(CopyTileList(PONG_PIN_ONE)), new Meld(CopyTileList(CHOW_PIN234)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(PONG_WAN_ONE)), new Pair(pair)]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() returns [] if the hand has no possible partitions', () => {
        const tiles = [new Tile(32), new Tile(33)].concat(CopyTileList(PONG_PIN_ONE)).concat(CopyTileList(PONG_SOU_ONE)).concat(CopyTileList(PONG_EAST)).concat(CopyTileList(KONG_SOU_FIVE));
        const hand = new Hand(tiles);
        expect(handPartition.partition(hand)).to.eql([]);
    });

    it('partition() works for hand composed of all chows and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(CHOW_PIN234)).concat(CopyTileList(CHOW_PIN789)).concat(CopyTileList(CHOW_SOU234)).concat(CopyTileList(CHOW_WAN234));
        const hand = new Hand(tiles);
        const partition = [[new Meld(CopyTileList(CHOW_PIN234)), new Meld(CopyTileList(CHOW_PIN789)), new Meld(CopyTileList(CHOW_SOU234)), new Meld(CopyTileList(CHOW_WAN234)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(PONG_PIN_ONE)).concat(CopyTileList(PONG_SOU_ONE)).concat(CopyTileList(PONG_WAN_ONE)).concat(CopyTileList(PONG_EAST));
        const hand = new Hand(tiles);
        const partition = [[new Meld(CopyTileList(PONG_PIN_ONE)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(PONG_WAN_ONE)), new Meld(CopyTileList(PONG_EAST)), new Pair([new Tile(32), new Tile(32)])]];        
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)];
        const melds = [new Meld(CopyTileList(KONG_PIN_FIVE)), new Meld(CopyTileList(KONG_SOU_FIVE)), new Meld(CopyTileList(KONG_WAN_FIVE)), new Meld(CopyTileList(KONG_GREEN))];
        const hand = new Hand(tiles, melds);
        const partition = [[new Meld(CopyTileList(KONG_PIN_FIVE)), new Meld(CopyTileList(KONG_SOU_FIVE)), new Meld(CopyTileList(KONG_WAN_FIVE)), new Meld(CopyTileList(KONG_GREEN)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all chows and pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(CHOW_PIN234)).concat(CopyTileList(CHOW_PIN789)).concat(CopyTileList(PONG_SOU_ONE)).concat(CopyTileList(PONG_WAN_ONE));
        const hand = new Hand(tiles);
        const partition = [[new Meld(CopyTileList(CHOW_PIN234)), new Meld(CopyTileList(CHOW_PIN789)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(PONG_WAN_ONE)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all chows and kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(CHOW_PIN234)).concat(CopyTileList(CHOW_PIN789));
        const melds = [new Meld(CopyTileList(KONG_GREEN)), new Meld(CopyTileList(KONG_WAN_FIVE))];
        const hand = new Hand(tiles, melds);
        const partition = [[new Meld(CopyTileList(CHOW_PIN234)), new Meld(CopyTileList(CHOW_PIN789)), new Meld(CopyTileList(KONG_WAN_FIVE)), new Meld(CopyTileList(KONG_GREEN)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all kongs and pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(PONG_PIN_ONE)).concat(CopyTileList(PONG_SOU_ONE));
        const melds = [new Meld(CopyTileList(KONG_WAN_FIVE)), new Meld(CopyTileList(KONG_GREEN))];
        const hand = new Hand(tiles, melds);
        const partition = [[new Meld(CopyTileList(PONG_PIN_ONE)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(KONG_WAN_FIVE)), new Meld(CopyTileList(KONG_GREEN)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for hand composed of all chows, pongs, and kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CopyTileList(PONG_PIN_ONE)).concat(CopyTileList(PONG_SOU_ONE)).concat(CopyTileList(CHOW_SOU234));
        const melds = [new Meld(CopyTileList(KONG_WAN_FIVE))];
        const hand = new Hand(tiles, melds);
        const partition = [[new Meld(CopyTileList(PONG_PIN_ONE)), new Meld(CopyTileList(PONG_SOU_ONE)), new Meld(CopyTileList(CHOW_SOU234)), new Meld(CopyTileList(KONG_WAN_FIVE)), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for border case with chow and pong', () => {
        const tiles = TileList('s11123333WWWwww');
        const hand = new Hand(tiles);
        const partition = [[new Meld(TileList('s123')), new Meld(TileList('s333')), new Meld(TileList('WWW')), new Meld(TileList('www')), new Pair(TileList('s11'))]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for sequential pongs', () => {
        const tiles = TileList('s111222333WWWgg');
        const hand = new Hand(tiles);
        const partition = [[new Meld(TileList('s111')), new Meld(TileList('s222')), new Meld(TileList('s333')), new Meld(TileList('WWW')), new Pair(TileList('gg'))], [new Meld(TileList('s123')), new Meld(TileList('s123')), new Meld(TileList('s123')), new Meld(TileList('WWW')), new Pair(TileList('gg'))]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('partition() works for complex hand', () => {
        const tiles = TileList('s111222333444WW');
        const hand = new Hand(tiles);
        const partition = [
                            [
                                new Meld(TileList('s111')), 
                                new Meld(TileList('s222')), 
                                new Meld(TileList('s333')), 
                                new Meld(TileList('s444')),
                                new Pair(TileList('WW')) 
                            ],
                            [
                                new Meld(TileList('s111')), 
                                new Meld(TileList('s234')), 
                                new Meld(TileList('s234')), 
                                new Meld(TileList('s234')), 
                                new Pair(TileList('WW')) 
                            ],
                            [
                                new Meld(TileList('s123')), 
                                new Meld(TileList('s123')), 
                                new Meld(TileList('s123')), 
                                new Meld(TileList('s444')), 
                                new Pair(TileList('WW')) 
                            ],
                        ];
        expect(handPartition.partition(hand)).to.eql(partition);
    });

    it('SortPartition() works for a partition of all pongs', () => {
        const partition = [new Meld(TileList('s333')), new Meld(TileList('s222')), new Meld(TileList('WWW')), new Meld(TileList('s111')), new Pair(TileList('gg'))];
        const sorted = [new Meld(TileList('s111')), new Meld(TileList('s222')), new Meld(TileList('s333')), new Meld(TileList('WWW')), new Pair(TileList('gg'))];
        expect(handPartition.SortPartition(partition)).to.eql(sorted);
    });

    it('SortPartition() works for a partition of all chows', () => {
        const partition = [new Meld(TileList('s123')), new Meld(TileList('s234')), new Meld(TileList('p456')), new Meld(TileList('s789')), new Pair(TileList('gg'))];
        const sorted = [new Meld(TileList('p456')), new Meld(TileList('s123')), new Meld(TileList('s234')), new Meld(TileList('s789')), new Pair(TileList('gg'))];
        expect(handPartition.SortPartition(partition)).to.eql(sorted);
    });

    it('SortPartition() works for a partition of all kongs', () => {
        const partition = [new Meld(TileList('WWWW')), new Meld(TileList('s1111')), new Meld(TileList('s4444')), new Pair(TileList('gg')), new Meld(TileList('p1111'))];
        const sorted = [new Meld(TileList('p1111')), new Meld(TileList('s1111')), new Meld(TileList('s4444')), new Meld(TileList('WWWW')), new Pair(TileList('gg'))];
        expect(handPartition.SortPartition(partition)).to.eql(sorted);
    });

    it('SortPartition() works for a partition of a mix of melds', () => {
        const partition = [new Meld(TileList('WWW')), new Meld(TileList('s444')), new Meld(TileList('p123')), new Pair(TileList('gg')), new Meld(TileList('s1111'))];
        const sorted = [new Meld(TileList('p123')), new Meld(TileList('s1111')), new Meld(TileList('s444')), new Meld(TileList('WWW')), new Pair(TileList('gg'))];
        expect(handPartition.SortPartition(partition)).to.eql(sorted);
    });

});