let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;

describe('Chi', () => {

    it('A player can chi with one potential chow.', () => {
        let player = new Player(0);
        let tiles = TileList('p12s111222a666NN');
        let melds = [];
        let availableTile = new Tile(2);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableTile)).to.eql(true);
    });

    it('A player can chi with multiple potential chows.', () => {
        let player = new Player(0);
        let tiles = TileList('p1245s111222a666');
        let melds = [];
        let availableTile = new Tile(2);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableTile)).to.eql(true);
    });

    it('A player cannot chi with zero potential chows.', () => {
        let player = new Player(0);
        let tiles = TileList('p13s111222a666NN');
        let melds = [];
        let availableTile = new Tile(2);
        player.hand = new Hand(tiles, melds);
        expect(player.CanChi(availableTile)).to.eql(false);
    });

    // it('A player can chi only from the person to the left of them.', () => {

    // });

    // it('A player cannot chi from a person not to the left of them.', () => {

    // });
});