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

    it('A player can kan with open pong and have fourth tile in hand.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile)).to.eql(true);
    });

    it('A player cannot kan with two tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1222333444');
        let melds = [new Meld(TileList('p111'), true)];
        let drawnTile = TileList('E')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan()).to.eql(true);
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

    it('A player can kan with four identical tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan()).to.eql(true);
    });

    it('A player can kan with multiple sets of four identical tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222234444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan()).to.eql(true);
    });

    it('KanMelds returns the correct value for a player who can form one closed kong with closed tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'))];
        expect(player.KanMelds(null)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form one closed kong from drawn tile.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'))];
        expect(player.KanMelds(null)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form one closed kong from other\'s discard.', () => {
        let player = new Player(0);
        let tiles = TileList('p111222333444');
        let melds = [];
        let availableTile = TileList('p1')[0];
        let drawnTile = null;
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'), true)];
        expect(player.KanMelds(availableTile)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form two kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p111222233444');
        let melds = [];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111')), new Meld(TileList('p2222'))];
        expect(player.KanMelds(null)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form three kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112222334');
        let melds = [new Meld(TileList('p444'))];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111')), new Meld(TileList('p2222')), new Meld(TileList('p4444'))];
        expect(player.KanMelds(null)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form no kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let drawnTile = TileList('E')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [];
        expect(player.KanMelds(null)).to.eql(kongs);
    });
});