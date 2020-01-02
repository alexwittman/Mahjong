let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;
let TileListCount = require('../src/game/tile').TileListCount;
let NORTH = require('../src/game/constants').NORTH;
let EAST = require('../src/game/constants').EAST;
let SOUTH = require('../src/game/constants').SOUTH;
let WEST = require('../src/game/constants').WEST;

describe('Kan', () => {
    it('A player can kan with three tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile, EAST)).to.eql(true);
    });

    it('A player can kan with open pong and have fourth tile in hand.', () => {
        let player = new Player(0);
        let tiles = TileList('p12223334445');
        let melds = [new Meld(TileList('p111'), true)];
        let availableTile = null;
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile, EAST)).to.eql(true);
    });

    it('A player cannot kan with two tiles the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p1222333444');
        let melds = [new Meld(TileList('p111'), true)];
        let drawnTile = TileList('E')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(null, EAST)).to.eql(true);
    });

    it('A player can kan with an open pong and draw the fourth tile.', () => {
        let player = new Player(0);
        let tiles = TileList('p2223334445');
        let melds = [new Meld(TileList('p111'), true)];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(null, EAST)).to.eql(true);
    });

    it('A player cannot kan with an open pong the same as the tile discarded.', () => {
        let player = new Player(0);
        let tiles = TileList('p2223334445');
        let melds = [new Meld(TileList('p111'), true)];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile, EAST)).to.eql(false);
    });

    it('A player cannot kan with three tiles the same as drawn but in open melds.', () => {
        let player = new Player(0);
        let tiles = TileList('p4445');
        let melds = [new Meld(TileList('p123'), true), new Meld(TileList('p123'), true), new Meld(TileList('p123'), true)];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile, EAST)).to.eql(false);
    });

    it('A player cannot kan with a kong in hand, but it is not their turn.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111223344556');
        let melds = [];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(availableTile, EAST)).to.eql(false);
    });

    it('A player can kan with four identical tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(null, EAST)).to.eql(true);
    });

    it('A player can kan with multiple sets of four identical tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222234444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        expect(player.CanKan(null, EAST)).to.eql(true);
    });

    it('KanMelds returns the correct value for a player who can form one closed kong with closed tiles.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'))];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form one closed kong from drawn tile.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'))];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it("KanMelds returns the correct value for a player who can form one closed kong from other's discard.", () => {
        let player = new Player(0);
        let tiles = TileList('p111222333444');
        let melds = [];
        let availableTile = TileList('p1')[0];
        let drawnTile = null;
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'), true)];
        expect(player.KanMelds(availableTile, EAST)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form two kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p111222233444');
        let melds = [];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111')), new Meld(TileList('p2222'))];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form three kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112222334');
        let melds = [new Meld(TileList('p444'), true)];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111')), new Meld(TileList('p2222')), new Meld(TileList('p4444'), true)];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('KanMelds returns the correct value for a player who can form no kongs.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let drawnTile = TileList('E')[0];
        player._drawnTile = drawnTile;
        player.hand = new Hand(tiles, melds);
        let kongs = [];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('When a player kans, the hand now contains a meld with the kong.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        let kong = new Meld(TileList('p1111'));
        player.GetKan(null, EAST);
        expect(player.hand.melds).to.eql([kong]);
    });

    it('When a player can only make one kong, they are not prompted for which one to make.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        let kong = new Meld(TileList('p1111'));
        player.GetKan(null, EAST);
    });

    it('When a player makes a kong, the count of the kong tiles in the hand is 0.', () => {
        let player = new Player(0);
        let tiles = TileList('p1111222333444');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        player.GetKan(null, EAST);
        expect(TileListCount(player.hand.closedTiles, TileList('p1')[0])).to.eql(0);
    });

    it('A player who has riichid cannot declare an open kan.', () => {
        let player = new Player(0);
        let tiles = TileList('p1112223334445');
        let melds = [];
        let availableTile = TileList('p1')[0];
        player.hand = new Hand(tiles, melds);
        player._hasRiichid = true;
        expect(player.KanMelds(availableTile, EAST)).to.eql([]);
    });

    it('A player who has riichid can declare a closed kan from hand if it does not alter the riichi wait.', () => {
        let player = new Player(0);
        let tiles = TileList('p111s333444WWWE'); //Wait is for E
        let melds = [];
        let drawnTile = TileList('p1')[0];
        player._drawnTile = drawnTile;
        player._hasRiichid = true;
        player.hand = new Hand(tiles, melds);
        let kongs = [new Meld(TileList('p1111'))];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('A player who has riichid cannot declare a closed kan from hand if it alters the riichi wait.', () => {
        let player = new Player(0);
        let tiles = TileList('p3444s778899WWW'); //Wait is for p2, p3, or p5
        let melds = [];
        let drawnTile = TileList('p4')[0];
        player._drawnTile = drawnTile;
        player._hasRiichid = true;
        player.hand = new Hand(tiles, melds);
        let kongs = [];
        expect(player.KanMelds(null, EAST)).to.eql(kongs);
    });

    it('Kan works for upgrading an open pong to a kong.', () => {
        let player = new Player(0);
        let tiles = TileList('p1234567899');
        let melds = [new Meld(TileList('WWW'), true)];
        player.hand = new Hand(tiles, melds);
        let kong = new Meld(TileList('WWWW'), true);
        let handAfterKong = new Hand(tiles, [kong]);
        expect(player.Kan(player.hand, kong)).to.eql(handAfterKong);
    });

    it('Hand.Print() does not print undefined after making Kong.', () => {
        let player = new Player(0);
        let tiles = TileList('p1234567899WWW');
        let melds = [];
        player.hand = new Hand(tiles, melds);
        let kong = new Meld(TileList('WWWW'));
        let handAfterKong = new Hand(tiles, [kong]);
        player.Kan(player.hand, kong);
        player.hand.Print();
        //expect(player.Kan(player.hand, kong)).to.eql(handAfterKong);
    });
});
