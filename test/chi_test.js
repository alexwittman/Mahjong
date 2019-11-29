let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let Discard = require('../src/game/discard').Discard;
let expect = require('chai').expect;
let TileListCount = require('../src/game/tile').TileListCount;

describe('Chi', () => {

    it('A player can chi with one potential chow.', () => {
        let player = new Player(3);
        let tiles = TileList('p12s111222a666NN');
        let melds = [];
        let availableDiscard = new Discard(TileList('p3')[0], 2);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableDiscard)).to.eql(true);
    });

    it('A player can chi with multiple potential chows.', () => {
        let player = new Player(1);
        let tiles = TileList('p1245s111222a666');
        let melds = [];
        let availableDiscard = new Discard(TileList('p3')[0], 0);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableDiscard)).to.eql(true);
    });

    it('A player cannot chi with zero potential chows.', () => {
        let player = new Player(0);
        let tiles = TileList('p13s111222a666NN');
        let melds = [];
        let availableDiscard = new Discard(TileList('p3')[0], 3);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableDiscard)).to.eql(false);
    });

    it('A player can chi only from the person to the left of them.', () => {
        let player = new Player(3);
        let tiles = TileList('p13s111222a666NN');
        let melds = [];
        let availableDiscard = new Discard(TileList('p2')[0], 2);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableDiscard)).to.eql(true);
    });

    it('A player cannot chi from a person not to the left of them.', () => {
        let player = new Player(0);
        let tiles = TileList('p13s111222a666NN');
        let melds = [];
        let availableDiscard = new Discard(TileList('p2')[0], 1);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableDiscard)).to.eql(false);
    });

    it('When a player chi\'s the hand now contains a meld with the chow.', () => {
        let player = new Player(0);
        let tiles = TileList('p12s111222a666NN');
        let melds = [];
        let availableTile = TileList('p3')[0];
        player.hand = new Hand(tiles, melds);
        let handCopy = new Hand(tiles, melds);
        let chow = new Meld(TileList('p123'), true);
        player.hand = player.Chi(player.hand, chow, availableTile);
        expect(player.hand.melds).to.eql([chow]);
    });

    it('When a player makes a chow, the count of the chi tiles in the hand are one less than before.', () => {
        let player = new Player(0);
        let tiles = TileList('p11223s222a666NN');
        let melds = [];
        let availableTile = TileList('p3')[0];
        player.hand = new Hand(tiles, melds);
        let handCopy = new Hand(tiles, melds);
        let chow = new Meld(TileList('p123'), true);
        let counts = [1, 1, 1];
        player.hand = player.Chi(player.hand, chow, availableTile);
        let afterCounts = [];
        for (let tile of chow.tiles) {
            afterCounts.push(TileListCount(player.hand._closedTiles, tile));
        }
        expect(afterCounts).to.eql(counts);
    });
});