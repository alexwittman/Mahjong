import { expect } from 'chai';
import { Hand_Partition } from '../src/hand_partition';
import { Tile, TileList } from '../src/tile';
import { Meld } from '../src/meld';
import { Hand } from '../src/hand';
import { Pair } from '../src/pair';
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
        const hand = new Hand(pair, [new Meld(PONG_PIN_ONE), new Meld(PONG_SOU_ONE), new Meld(PONG_WAN_ONE), new Meld(CHOW_PIN234)]);
        const partition = [[new Meld(PONG_PIN_ONE), new Meld(CHOW_PIN234), new Meld(PONG_SOU_ONE), new Meld(PONG_WAN_ONE), new Pair(pair)]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() returns [] if the hand has no possible partitions', () => {
        const tiles = [new Tile(32), new Tile(33)].concat(PONG_PIN_ONE).concat(PONG_SOU_ONE).concat(PONG_EAST).concat(KONG_SOU_FIVE);
        const hand = new Hand(tiles);
        expect(handPartition.partition(hand)).to.eql([]);
    });
    it('partition() works for hand composed of all chows and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CHOW_PIN234).concat(CHOW_PIN789).concat(CHOW_SOU234).concat(CHOW_WAN234);
        const hand = new Hand(tiles);
        const partition = [[new Meld(CHOW_PIN234), new Meld(CHOW_PIN789), new Meld(CHOW_SOU234), new Meld(CHOW_WAN234), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(PONG_PIN_ONE).concat(PONG_SOU_ONE).concat(PONG_WAN_ONE).concat(PONG_EAST);
        const hand = new Hand(tiles);
        const partition = [[new Meld(PONG_PIN_ONE), new Meld(PONG_SOU_ONE), new Meld(PONG_WAN_ONE), new Meld(PONG_EAST), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(KONG_PIN_FIVE).concat(KONG_SOU_FIVE).concat(KONG_WAN_FIVE).concat(KONG_GREEN);
        const hand = new Hand(tiles);
        const partition = [[new Meld(KONG_PIN_FIVE), new Meld(KONG_SOU_FIVE), new Meld(KONG_WAN_FIVE), new Meld(KONG_GREEN), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all chows and pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CHOW_PIN234).concat(CHOW_PIN789).concat(PONG_SOU_ONE).concat(PONG_WAN_ONE);
        const hand = new Hand(tiles);
        const partition = [[new Meld(CHOW_PIN234), new Meld(CHOW_PIN789), new Meld(PONG_SOU_ONE), new Meld(PONG_WAN_ONE), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all chows and kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(CHOW_PIN234).concat(CHOW_PIN789).concat(KONG_GREEN).concat(KONG_WAN_FIVE);
        const hand = new Hand(tiles);
        const partition = [[new Meld(CHOW_PIN234), new Meld(CHOW_PIN789), new Meld(KONG_WAN_FIVE), new Meld(KONG_GREEN), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all kongs and pongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(PONG_PIN_ONE).concat(PONG_SOU_ONE).concat(KONG_WAN_FIVE).concat(KONG_GREEN);
        const hand = new Hand(tiles);
        const partition = [[new Meld(PONG_PIN_ONE), new Meld(PONG_SOU_ONE), new Meld(KONG_WAN_FIVE), new Meld(KONG_GREEN), new Pair([new Tile(32), new Tile(32)])]];
        expect(handPartition.partition(hand)).to.eql(partition);
    });
    it('partition() works for hand composed of all chows, pongs, and kongs and a pair', () => {
        const tiles = [new Tile(32), new Tile(32)].concat(PONG_PIN_ONE).concat(PONG_SOU_ONE).concat(CHOW_SOU234).concat(KONG_WAN_FIVE);
        const hand = new Hand(tiles);
        const partition = [[new Meld(PONG_PIN_ONE), new Meld(PONG_SOU_ONE), new Meld(CHOW_SOU234), new Meld(KONG_WAN_FIVE), new Pair([new Tile(32), new Tile(32)])]];
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
