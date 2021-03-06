let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;
let NORTH = require('../src/game/constants').NORTH;
let EAST = require('../src/game/constants').EAST;
let SOUTH = require('../src/game/constants').SOUTH;
let WEST = require('../src/game/constants').WEST;

describe('Riichi', () => {

    it('A player can riichi with a closed hand one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p123s111222a666N');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(true);
    });

    it('A player can riichi with a hand with a closed kong one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a6666'))];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(true);
    });

    it('A player cannot riichi with a hand with an open pong', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a666'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds, true);
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player cannot riichi with a hand with an open chow', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a345'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds, true);
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player cannot riichi with a hand with an open kan', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111222N');
        let melds = [new Meld(TileList('a6666'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds, true);
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player cannot riichi with multiple open melds', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111N');
        let melds = [new Meld(TileList('a6666'), true), new Meld(TileList('s222'), true)];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds, true);
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player cannot riichi with a hand not one tile from a complete hand', () => {
        let player = new Player(0);
        let tiles = TileList('p111s111a457NESW');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player cannot riichi if they don\'t have enough points', () => {
        let player = new Player(0);
        let tiles = TileList('p123s111222a666N');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        player._points = 0;
        expect(player.CanRiichi(EAST)).to.eql(false);
    });

    it('A player can riichi if they have enough points', () => {
        let player = new Player(0);
        let tiles = TileList('p123s111222a666N');
        let melds = [];
        let dealtTile = new Tile(12);
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        player._points = 25000;
        expect(player.CanRiichi(EAST)).to.eql(true);
    });

    it('RiichiTiles returns the correct tiles for a hand needing to discard only 1 tile.', () => {
        let player = new Player(0);
        let tiles = TileList('p1115s111a111NNE');
        let melds = [];
        let dealtTile = TileList('E')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        let riichiTiles = TileList('p5');
        expect(player.RiichiTiles(EAST)).to.eql(riichiTiles);
    });

    it('RiichiTiles returns the correct tiles for a hand needing to discard one of many tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let dealtTile = TileList('E')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        let riichiTiles = TileList('p25E');
        expect(player.RiichiTiles(EAST)).to.eql(riichiTiles);
    });

    it('RiichiTiles returns the correct tiles for a hand not in tenpai.', () => {
        let player = new Player(0);
        let tiles = TileList('p1347s1347a23578');
        let melds = [];
        let dealtTile = TileList('E')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        let riichiTiles = TileList('');
        expect(player.RiichiTiles(EAST)).to.eql(riichiTiles);
    });

    it('A player can riichi with thirteen orphans missing the pair.', () => {
        let player = new Player(0);
        let tiles = TileList('p19s19a19NESWrgw');
        let melds = [];
        let dealtTile = TileList('p4')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(true);
    });

    it('A player can riichi with twelve orphans and a pair.', () => {
        let player = new Player(0);
        let tiles = TileList('p119s19a19NESWrg');
        let melds = [];
        let dealtTile = TileList('p4')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(true);
    });

    it('A player can riichi with hand encountered when testing.', () => {
        let player = new Player(0);
        let tiles = TileList('p44s124567a12344');
        let melds = [];
        let dealtTile = TileList('s3')[0];
        player.drawnTile = dealtTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanRiichi(EAST)).to.eql(true);
    });
});