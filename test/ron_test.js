let Player = require('../src/game/player').Player;
let TileList = require('../src/game/tile').TileList;
let Meld = require('../src/game/meld').Meld;
let Tile = require('../src/game/tile').Tile;
let Hand = require('../src/game/hand').Hand;
let expect = require('chai').expect;
let Pair = require('../src/game/pair').Pair;
let yaku = require('../src/game/yaku');

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
        let player = new Player(0);
        let tiles = TileList('p123s123a123555E');
        let melds = [];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    it('A player can ron if the tile discarded makes their hand complete with seven pairs.', () => {
        let player = new Player(0);
        let tiles = TileList('p1144s1144a1144E');
        let melds = [];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    it('A player can ron if the tile discarded makes their hand complete with thirteen orphans.', () => {
        let player = new Player(0);
        let tiles = TileList('p19s19a19NESWgrw');
        let melds = [];
        let availableTile = TileList('w')[0];
        player.hand = new Hand(tiles, melds);
        expect(player.CanRon(availableTile)).to.eql(true);
    });

    // it('A player cannot if the drawn tile completes their hand with >= 1 han, but the player had already discarded the tile.', () => {

    // });

    it('A player rons and Ron returns the correct highest valued partition for a hand with only one partition.', () => {
        let player = new Player(0);
        let tiles = TileList('p111333555E');
        let melds = [new Meld(TileList('s888'), true)];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds, true);
        let value = {
            'han': 4,
            'partition': [new Meld(TileList('p111')),
                new Meld(TileList('p333')),
                new Meld(TileList('p555')),
                new Meld(TileList('s888'), true),
                new Pair(TileList('EE'))
            ],
            'yakuList': [new yaku.AllTripletHand, new yaku.ThreeClosedTriplets],
            'isOpen': true
        };
        expect(player.Ron(availableTile)).to.eql(value);
    });

    it('A player rons and Ron returns the correct highest valued partition for a hand with only many partitions.', () => {
        let player = new Player(0);
        let tiles = TileList('p11122233344EE');
        let melds = [];
        let availableTile = TileList('p4')[0];
        player.hand = new Hand(tiles, melds, false);
        let value = {
            'han': 5,
            'partition': [new Meld(TileList('p111')),
                new Meld(TileList('p222')),
                new Meld(TileList('p333')),
                new Meld(TileList('p444'), true),
                new Pair(TileList('EE'))
            ],
            'yakuList': [new yaku.AllTripletHand, new yaku.ThreeClosedTriplets, new yaku.HalfFlush],
            'isOpen': false
        };
        expect(player.Ron(availableTile)).to.eql(value);
    });

    it('A player can still ron after declaring riichi.', () => {
        let player = new Player(0);
        let tiles = TileList('p123s123a123555E');
        let melds = [];
        let availableTile = TileList('E')[0];
        player.hand = new Hand(tiles, melds);
        player._hasRiichid = true;
        expect(player.CanRon(availableTile)).to.eql(true);
    });
});