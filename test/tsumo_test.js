let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Tsumo', () => {

    it('A player can tsumo if the drawn tile completes their hand with >= 1 han.', () => {

    });

    it('A player cannot tsumo if the drawn tile completes their hand with < 1 han.', () => {

    });

    it('A player cannot tsumo if the drawn tile completes their hand with >= 1 han, but the player had already discarded the tile.', () => {

    });

    it('A player cannot tsumo if the drawn tile does not complete their hand.', () => {

    });
});