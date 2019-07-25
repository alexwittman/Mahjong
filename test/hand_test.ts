import {expect} from 'chai';
import {Tile, CompareTiles} from '../src/tile';
import {Hand} from '../src/hand';
import { Meld } from '../src/meld';

describe('Hand', () => {

    it('can be constructed with a list of tiles', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(2);
        const tile3 = new Tile(4);
        const tiles = [tile1, tile1, tile1, tile2, tile2, tile2, tile3, tile3, tile3];

        const hand = new Hand(tiles);
        expect(hand.tiles).to.eql(tiles);
    });

    it('can be constructed with no parameters', () => {
        const hand = new Hand();
        expect(hand.tiles).to.eql([]);
    });

    it('can be constructed with a list of tiles and a list of melds', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const tile4 = new Tile(3);
        const tile5 = new Tile(4);

        const meld1 = new Meld([tile1, tile1, tile1]);
        const meld2 = new Meld([tile2, tile2, tile2]);
        const meld3 = new Meld([tile3, tile3, tile3]);
        const tiles = [tile1, tile1, tile1, tile2, tile2, tile2, tile3, tile3, tile3, tile4, tile5];

        const hand = new Hand([tile4, tile5], [meld1, meld2, meld3]);
        expect(hand.tiles).to.eql(tiles);
    });

    it('.tiles returns the tiles in the hand', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(2);
        const tile3 = new Tile(4);
        const tiles = [tile1, tile1, tile1, tile2, tile2, tile2, tile3, tile3, tile3];

        const hand = new Hand(tiles);
        expect(hand.tiles).to.eql(tiles);
    });

    it('.tiles returns the tiles in the hand sorted', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(2);
        const tile3 = new Tile(4);
        const tiles = [tile1, tile2, tile3, tile1, tile2, tile3, tile1, tile2, tile3];

        const hand = new Hand(tiles);
        expect(hand.tiles).to.eql(tiles.sort(CompareTiles));
    });

    it('.melds returns a list of melds that make up the hand', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);

        const meld1 = new Meld([tile1, tile1, tile1]);
        const meld2 = new Meld([tile2, tile2, tile2]);
        const meld3 = new Meld([tile3, tile3, tile3]);
        const melds = [meld1, meld2, meld3];

        const hand = new Hand([], melds);
        expect(hand.melds).to.eql(melds);
    });

    it('add() adds the tile to the hand', () => {
        const tile = new Tile(0);
        const hand = new Hand();

        hand.add(tile);
        expect(hand.tiles).to.eql([tile]);
    });

    it('add() makes the hand length one longer', () => {
        const tile = new Tile(0);
        const hand = new Hand();
        const length = hand.length;
        hand.add(tile);
        expect(hand.length).to.equal(length + 1);
    });

    it('remove() removes the tile from the hand', () => {
        const tile = new Tile(0);
        const hand = new Hand([tile]);
        hand.remove(tile);
        expect(hand.tiles).to.eql([]);
    });

    it('remove() returns false if the tile is not in the hand', () => {
        const tile1 = new Tile(0);
        const hand = new Hand([tile1, tile1]);

        const tile2 = new Tile(10);
        expect(hand.remove(tile2)).to.equal(false);
    });

    it('remove() returns true if the tile was in the hand and removed', () => {
        const tile1 = new Tile(0);
        const hand = new Hand([tile1, tile1]);

        expect(hand.remove(tile1)).to.equal(true);
        expect(hand.tiles).to.eql([tile1]);
    });

    it('remove() makes the hand one length shorter', () => {
        const tile = new Tile(0);
        const hand = new Hand([tile, tile]);
        const length = hand.length;
        hand.remove(tile);
        expect(hand.length).to.equal(length - 1);
    });

    it('.length returns the length of the tiles in the hand', () => {
        const tile = new Tile(0);
        const hand = new Hand([tile, tile, tile, tile]);
        
        expect(hand.length).to.equal(4);
    });

});