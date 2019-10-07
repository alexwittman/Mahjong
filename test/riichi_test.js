let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Riichi', () => {

    it('A player can riichi with a closed hand one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p123s111222a666N');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(true);
    });

    it('A player can riichi with a hand with a closed kong one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a6666'))];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(true);
    });

    it('A player cannot riichi with a hand with an open pong', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a666'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(false);
    });

    it('A player cannot riichi with a hand with an open chow', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a345'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(false);
    });

    it('A player cannot riichi with a hand with an open kan', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a6666'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(false);
    });

    it('A player cannot riichi with multiple open melds', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111N');
        let melds = [new Meld(TileList('a6666'), true), new Meld(TileList('s222'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(false);
    });

    it('A player cannot riichi with a hand not one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111a457NESW');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi()).to.eql(false);
    });

    // it('A player cannot riichi if they don\'t have enough points', () => {
        
    //     expect().to.eql();
    // });

    it('RiichiTiles returns the correct tiles for a hand waiting on 1 tile.', () => {

    });

    it('RiichiTiles returns the correct tiles for a hand waiting on many tiles.', () => {

    });

    it('RiichiTiles returns the correct tiles for a hand not in tenpai.', () => {

    });
});