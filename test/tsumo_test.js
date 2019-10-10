let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Tsumo', () => {

    it('A player can tsumo if the drawn tile completes their hand with >= 1 han.', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111a111NNNE');
        let melds = [];
        let dealtTile = TileList('E')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanTsumo()).to.eql(true);
    });

    it('A player cannot tsumo if the drawn tile completes their hand with < 1 han.', () => {
        let player = new Player(0);
        let tiles = TileList('p123a234666E');
        let melds = [new Meld(TileList('s123'), true)];
        let dealtTile = TileList('E')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanTsumo()).to.eql(false);
    });

    // it('A player cannot tsumo if the drawn tile completes their hand with >= 1 han, but the player had already discarded the tile.', () => {

    // });

    it('A player cannot tsumo if the drawn tile does not complete their hand.', () => {
        let player = new Player(0);
        let tiles = TileList('p123s123a234666E');
        let melds = [];
        let dealtTile = TileList('W')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanTsumo()).to.eql(false);
    });
});