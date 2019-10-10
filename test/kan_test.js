let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Kan', () => {

    it('A player can kan with three tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile)).to.eql(true);
    });

    it('A player cannot kan with two tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1122233344455');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile)).to.eql(false);
    });

    it('A player can kan with an open pong and draw the fourth tile.', () => {
        let player = new Player(0);
        let tiles = TileList('p2223334445');
        let melds = [new Meld(TileList('p111'), true)];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan()).to.eql(true);
    });

    it('A player cannot kan with an open pong the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p2223334445');
        let melds = [new Meld(TileList('p111'), true)];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile)).to.eql(false);
    });

    it('A player cannot kan with three tiles the same as drawn but in open melds.', () => {
        let player = new Player(0);
        let tiles = TileList('p4445');
        let melds = [new Meld(TileList('p123'), true), new Meld(TileList('p123'), true), new Meld(TileList('p123'), true)];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile)).to.eql(false);
    });
});