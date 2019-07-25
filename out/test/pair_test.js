import { expect } from 'chai';
import { Tile, TileType, TileValue } from '../src/tile';
import { Pair } from '../src/pair';
describe('Pair', () => {
    it('can be constructed from two tiles', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile];
        const pair = new Pair(tiles);
        expect(pair.tiles).to.eql(tiles);
    });
    it('.tiles returns a list of tiles that make up the pair', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile];
        const pair = new Pair(tiles);
        expect(pair.tiles).to.eql(tiles);
    });
    it('.type returns the type of tiles that make up the pair', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile];
        const pair = new Pair(tiles);
        expect(pair.type).to.equal(TileType.PIN);
    });
    it('.value returns the value of tiles that make up the pair', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile];
        const pair = new Pair(tiles);
        expect(pair.value).to.equal(TileValue.ONE);
    });
    it('.is_pair returns true if the tiles are a pair', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile];
        const pair = new Pair(tiles);
        expect(pair.is_pair).to.equal(true);
    });
    it('.is_pair returns false if the tiles do not make a pair', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tiles = [tile1, tile2];
        const pair = new Pair(tiles);
        expect(pair.is_pair).to.equal(false);
    });
});
