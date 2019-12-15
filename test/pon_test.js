let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;
let TileListCount = require('../src/game/tile').TileListCount;

describe('Pon', () => {

    it('A player can pon with two tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanPon(availableTile)).to.eql(true);
    });

    it('A player cannot pon with one tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanPon(availableTile)).to.eql(false);
    });

    it('A player can pon with three tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanPon(availableTile)).to.eql(true);
    });

    it('A player cannot pon with two tiles the same as the tile discarded in open melds.', () => {
        let player = new Player(0);
        let tiles = TileList('p4445556');
        let melds = [new Meld(TileList('p123'), true), new Meld(TileList('p123'), true)];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanPon(availableTile)).to.eql(false);
    });

    it('When a player pons, the meld is added to their hand.', () => {
        let player = new Player(0);
        let tiles = TileList('p1122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        player.hand = player.Pon(player.hand, availableTile);
        expect(player.hand.melds).to.eql([new Meld(TileList('p111'), true)]);
    });

    it('When a player pons, tiles are removed from the hand closed tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        player.hand = player.Pon(player.hand, availableTile);
        expect(TileListCount(player.hand.closedTiles, TileList('p1')[0])).to.eql(0);
    });

    it('A player cannot pon after declaring riichi.', () => {
        let player = new Player(0);
        let tiles = TileList('p112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        player._hasRiichid = true;
        expect(player.CanPon(availableTile)).to.eql(false);
    });
});