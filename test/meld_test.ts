import { expect } from 'chai';
import { Tile } from '../src/tile';
import { Meld, MeldType } from '../src/meld';

describe('Meld', () => {

    it('can be constructed with 3 tiles', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const meld = new Meld([tile1, tile2, tile3]);
        expect(meld.tiles.length).to.equal(3);
    });

    it('can be constructed with 4 tiles', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const tile4 = new Tile(3);
        const meld = new Meld([tile1, tile2, tile3, tile4]);
        expect(meld.tiles.length).to.equal(4);
    });

    it('.is_open returns the correct value', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile, tile];

        const meld1 = new Meld(tiles, true);
        expect(meld1.is_open).to.equal(true);

        const meld2 = new Meld(tiles, false);
        expect(meld2.is_open).to.equal(false);
    });

    it('can be constructed as open', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const tiles = [tile1, tile2, tile3];
        const meld = new Meld(tiles, true)
        expect(meld.is_open).to.equal(true);
    });

    it('can be constructed as closed', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const tiles = [tile1, tile2, tile3];
        const meld = new Meld(tiles, false);
        expect(meld.is_open).to.equal(false);
    });

    it('.type of PONG of PIN_ONE meld returns MeldType.PONG', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.PONG);
    });

    it('.type of PONG of SOU_ONE meld returns MeldType.PONG', () => {
        const tile = new Tile(9);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.PONG);
    });

    it('.type of PONG of WAN_ONE meld returns MeldType.PONG', () => {
        const tile = new Tile(18);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.PONG);
    });

    it('.type of PONG of EAST meld returns MeldType.PONG', () => {
        const tile = new Tile(27);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.PONG);
    });

    it('.type of PONG of DRAGON_GREEN meld returns MeldType.PONG', () => {
        const tile = new Tile(31);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.PONG);
    });

    it('.type of KONG of PIN_ONE meld returns MeldType.KONG', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.KONG);
    });

    it('.type of KONG of SOU_ONE meld returns MeldType.KONG', () => {
        const tile = new Tile(9);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.KONG);
    });

    it('.type of KONG of WAN_ONE meld returns MeldType.KONG', () => {
        const tile = new Tile(18);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.KONG);
    });

    it('.type of KONG of EAST meld returns MeldType.KONG', () => {
        const tile = new Tile(27);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.KONG);
    });

    it('.type of KONG of DRAGON_GREEN meld returns MeldType.KONG', () => {
        const tile = new Tile(31);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.KONG);
    });

    it('.type of CHOW of [PIN_ONE, PIN_TWO, PIN_THREE] meld returns MeldType.CHOW', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(1);
        const tile3 = new Tile(2);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.CHOW);
    });

    it('.type of CHOW of [SOU_ONE, SOU_TWO, SOU_THREE] meld returns MeldType.CHOW', () => {
        const tile1 = new Tile(9);
        const tile2 = new Tile(10);
        const tile3 = new Tile(11);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.CHOW);
    });

    it('.type of CHOW of [WAN_ONE, WAN_TWO, WAN_THREE] meld returns MeldType.CHOW', () => {
        const tile1 = new Tile(18);
        const tile2 = new Tile(19);
        const tile3 = new Tile(20);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.CHOW);
    });

    it('.type of [EAST, SOUTH, WEST] meld returns MeldType.NONE', () => {
        const tile1 = new Tile(27);
        const tile2 = new Tile(28);
        const tile3 = new Tile(29);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.NONE);
    });

    it('.type of CHOW of [WAN_ONE, WAN_EIGHT, WAN_NINE] meld returns MeldType.CHOW', () => {
        const tile1 = new Tile(18);
        const tile2 = new Tile(25);
        const tile3 = new Tile(26);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.NONE);
    });

    it('.type of [DRAGON_GREEN, DRAGON_RED, DRAGON_WHITE] meld returns MeldType.NONE', () => {
        const tile1 = new Tile(31);
        const tile2 = new Tile(32);
        const tile3 = new Tile(33);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.NONE);
    });

    it('.type of different types of tiles returns MeldType.NONE', () => {
        const tile1 = new Tile(0);
        const tile2 = new Tile(9);
        const tile3 = new Tile(18);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.type).to.equal(MeldType.NONE);
    });

    it('.tiles returns the tiles in the meld', () => {
        const tile1 = new Tile(31);
        const tile2 = new Tile(32);
        const tile3 = new Tile(33);
        const tiles = [tile1, tile2, tile3];

        const meld = new Meld(tiles);
        expect(meld.tiles).to.equal(tiles)
    });

    it('.length of PONG returns 3', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.length).to.equal(3);
    });

    it('.length of PONG returns 3', () => {
        const tile = new Tile(0);
        const tiles = [tile, tile, tile, tile];

        const meld = new Meld(tiles);
        expect(meld.length).to.equal(4);
    });

});