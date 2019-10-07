let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Ron', () => {

    it('A player can ron if the tile discarded makes their hand complete with >= 1 han.', () => {

    });

    it('A player cannot ron if the tile discarded makes their hand complete with < 1 han.', () => {

    });

    it('A player cannot ron if the tile discarded does not complete their hand.', () => {

    });

    it('A player can ron if the tile discarded makes their hand complete with a pong.', () => {

    });

    it('A player can ron if the tile discarded makes their hand complete with a chow.', () => {

    });

    it('A player can ron if the tile discarded makes their hand complete with a pair.', () => {

    });

    it('A player cannot if the drawn tile completes their hand with >= 1 han, but the player had already discarded the tile.', () => {

    });
});