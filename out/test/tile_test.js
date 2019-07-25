import { expect } from 'chai';
import { Tile, TileType, TileValue, CompareTiles, CopyTileList, TileListCount, IndexTileList, TileList, TileListEqual } from '../src/tile';
describe('Tile', () => {
    it('can be constructed with a number', () => {
        const tile = new Tile(0);
        expect(tile).to.exist;
    });
    it('.number returns the correct number', () => {
        const zero = new Tile(0);
        expect(zero.number).to.equal(0);
        const one = new Tile(0);
        expect(one.number).to.equal(0);
        const two = new Tile(0);
        expect(two.number).to.equal(0);
        const three = new Tile(0);
        expect(three.number).to.equal(0);
        const four = new Tile(0);
        expect(four.number).to.equal(0);
    });
    it('.type returns the correct type', () => {
        const PIN = new Tile(0);
        expect(PIN.type).to.equal(TileType.PIN);
        const SOU = new Tile(9);
        expect(SOU.type).to.equal(TileType.SOU);
        const WAN = new Tile(18);
        expect(WAN.type).to.equal(TileType.WAN);
        const WIND = new Tile(27);
        expect(WIND.type).to.equal(TileType.WIND);
        const DRAGON = new Tile(31);
        expect(DRAGON.type).to.equal(TileType.DRAGON);
    });
    it('.value returns the correct value', () => {
        const ONE = new Tile(0);
        expect(ONE.value).to.equal(TileValue.ONE);
        const NINE = new Tile(8);
        expect(NINE.value).to.equal(TileValue.NINE);
        const EAST = new Tile(27);
        expect(EAST.value).to.equal(TileValue.EAST);
        const SOUTH = new Tile(28);
        expect(SOUTH.value).to.equal(TileValue.SOUTH);
        const WEST = new Tile(29);
        expect(WEST.value).to.equal(TileValue.WEST);
        const NORTH = new Tile(30);
        expect(NORTH.value).to.equal(TileValue.NORTH);
        const GREEN = new Tile(31);
        expect(GREEN.value).to.equal(TileValue.GREEN);
        const RED = new Tile(32);
        expect(RED.value).to.equal(TileValue.RED);
        const WHITE = new Tile(33);
        expect(WHITE.value).to.equal(TileValue.WHITE);
    });
    it('CompareTiles, a and b, where a < b returns -1', () => {
        let a = new Tile(0);
        let b = new Tile(20);
        expect(CompareTiles(a, b)).to.equal(-1);
    });
    it('CompareTiles, a and b, where a > b returns 1', () => {
        let a = new Tile(20);
        let b = new Tile(0);
        expect(CompareTiles(a, b)).to.equal(1);
    });
    it('CompareTiles, a and b, where a == b returns 0', () => {
        let a = new Tile(0);
        let b = new Tile(0);
        expect(CompareTiles(a, b)).to.equal(0);
    });
    it('CopyTileList returns [] when copying []', () => {
        expect(CopyTileList([])).to.eql([]);
    });
    it('CopyTileList returns correct value for list of one tile', () => {
        let tile = new Tile(0);
        expect(CopyTileList([tile])).to.eql([tile]);
    });
    it('CopyTileList returns correct value for list of many tiles', () => {
        let tiles = [new Tile(0), new Tile(1), new Tile(2), new Tile(3), new Tile(4)];
        expect(CopyTileList(tiles)).to.eql(tiles);
    });
    it('.unicodes returns the correct value', () => {
        const PIN = new Tile(0);
        expect(PIN.unicode).to.equal('\u{0001F019}');
        const SOU = new Tile(9);
        expect(SOU.unicode).to.equal('\u{0001F010}');
        const WAN = new Tile(18);
        expect(WAN.unicode).to.equal('\u{0001F007}');
        const WIND = new Tile(27);
        expect(WIND.unicode).to.equal('\u{0001F000}');
        const DRAGON = new Tile(31);
        expect(DRAGON.unicode).to.equal('\u{0001F005}');
    });
    it('TileListCount returns 0 for a list without the tile', () => {
        const tile = new Tile(0);
        const tiles = [new Tile(1), new Tile(2), new Tile(3)];
        expect(TileListCount(tiles, tile)).to.equal(0);
    });
    it('TileListCount returns 0 for an empty list', () => {
        const tile = new Tile(0);
        const tiles = [];
        expect(TileListCount(tiles, tile)).to.equal(0);
    });
    it('TileListCount returns the correct value for a list with that tile', () => {
        const tile = new Tile(0);
        const tiles = [new Tile(0), new Tile(2), new Tile(3)];
        expect(TileListCount(tiles, tile)).to.equal(1);
    });
    it('IndexTileList returns -1 for empty list', () => {
        const tile = new Tile(0);
        const tiles = [];
        expect(IndexTileList(tiles, tile)).to.equal(-1);
    });
    it('IndexTileList returns -1 for list without tile', () => {
        const tile = new Tile(0);
        const tiles = [new Tile(1), new Tile(2), new Tile(3)];
        expect(IndexTileList(tiles, tile)).to.equal(-1);
    });
    it('IndexTileList returns correct value for a list with that tile', () => {
        const tile = new Tile(0);
        const tiles = [new Tile(0), new Tile(2), new Tile(3)];
        expect(IndexTileList(tiles, tile)).to.equal(0);
    });
    it('TileList() returns an empty list for empty parameters', () => {
        const tiles = [];
        expect(TileList('')).to.eql([]);
    });
    it('TileList() returns a correct list for one type of tile parameter', () => {
        const pinTiles = [new Tile(0), new Tile(1), new Tile(2), new Tile(3), new Tile(4)];
        const pinStringTiles = 'p12345';
        expect(TileList(pinStringTiles)).to.eql(pinTiles);
        const souTiles = [new Tile(9), new Tile(10), new Tile(11), new Tile(12), new Tile(13)];
        const souStringTiles = 's12345';
        expect(TileList(souStringTiles)).to.eql(souTiles);
        const wanTiles = [new Tile(18), new Tile(19), new Tile(20), new Tile(21), new Tile(22)];
        const wanStringTiles = 'a12345';
        expect(TileList(wanStringTiles)).to.eql(wanTiles);
        const windTiles = [new Tile(30), new Tile(27), new Tile(28), new Tile(29)];
        const windStringTiles = 'NESW';
        expect(TileList(windStringTiles)).to.eql(windTiles);
        const dragonTiles = [new Tile(31), new Tile(32), new Tile(33)];
        const dragonStringTiles = 'grw';
        expect(TileList(dragonStringTiles)).to.eql(dragonTiles);
    });
    it('TileList() returns a correct list for multiple types of tile parameter', () => {
        const tiles = [new Tile(0), new Tile(1), new Tile(2), new Tile(9), new Tile(10), new Tile(11), new Tile(18), new Tile(19), new Tile(20), new Tile(30), new Tile(27), new Tile(28), new Tile(29), new Tile(31), new Tile(32), new Tile(33)];
        const stringTiles = 'p123s123a123NESWgrw';
        expect(TileList(stringTiles)).to.eql(tiles);
    });
    it('TileListEqual() returns true for lists with the same tiles', () => {
        const tiles = TileList('s123');
        expect(TileListEqual(tiles, tiles)).to.eql(true);
    });
    it('TileListEqual() returns false for lists without the same tiles', () => {
        const a = TileList('s123');
        const b = TileList('p123');
        expect(TileListEqual(a, b)).to.eql(false);
    });
    it('TileListEqual() returns false for lists without the same tile length', () => {
        const a = TileList('s1111');
        const b = TileList('p111');
        expect(TileListEqual(a, b)).to.eql(false);
    });
});
