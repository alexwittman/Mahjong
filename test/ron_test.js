let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Ron', () => {

    it('A player can ron if the tile discarded makes their hand complete with >= 1 han.', () => {
        let player = new Player(0);
        let tiles = TileList('p1122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    it('A player cannot ron if the tile discarded makes their hand complete with < 1 han.', () => {
        let player = new Player(0);
        let tiles = TileList('p11333444a55');
        let melds = [new Meld(TileList('p123'))];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(false);
    });

    it('A player cannot ron if the tile discarded does not complete their hand.', () => {
        let player = new Player(0);
        let tiles = TileList('p11333444a55');
        let melds = [new Meld(TileList('p123'))];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(false);
    });

    it('A player can ron if the tile discarded makes their hand complete with a pong.', () => {
        let player = new Player(0);
        let tiles = TileList('p11333444a55');
        let melds = [new Meld(TileList('p555'))];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    it('A player can ron if the tile discarded makes their hand complete with a chow.', () => {
        let player = new Player(0);
        let tiles = TileList('p12s123a123555EE');
        let melds = [];
        let availableTile = TileList('p3')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    it('A player can ron if the tile discarded makes their hand complete with a pair.', () => {

    });

    it('A player cannot if the drawn tile completes their hand with >= 1 han, but the player had already discarded the tile.', () => {

    });
});