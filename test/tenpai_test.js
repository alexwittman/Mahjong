// import {expect} from 'chai';
// import { TileList, PrintTileList } from '../src/game/tile';
// import { Hand } from '../src/game/hand';
// import { Tenpai } from '../src/game/tenpai';
// const { performance } = require('perf_hooks');

expect = require('chai').expect;
TileList = require('../src/game/tile').TileList;
let PrintTileList = require('../src/game/tile').PrintTileList;
Hand = require('../src/game/hand').Hand;
let Tenpai = require('../src/game/tenpai').Tenpai;
performance = require('perf_hooks');


describe('Tenpai', () => {

    it('Tenpai can be constructed with a hand', () => {
        let hand = new Hand(TileList('p1112223334445'));
        let tenpai = new Tenpai(hand);
        expect(tenpai).to.exist;
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand = new Hand(TileList('p123s123678a123w'));
        let tilesToComplete = TileList('w');
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand = new Hand(TileList('p123s123678a14ww'));
        let tilesToComplete = [];
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand = new Hand(TileList('p1112345678999'));
        let tilesToComplete = TileList('p123456789');
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.isTenpai returns true if the hand is in tenpai', () => {
        let hand = new Hand(TileList('p1112345678999'));
        let tenpai = new Tenpai(hand);
        expect(tenpai.isTenpai).to.eql(true);
    });

    it('.isTenpai returns false if the hand is not in tenpai', () => {
        let hand = new Hand(TileList('p123s123678a14ww'));
        let tenpai = new Tenpai(hand);
        expect(tenpai.isTenpai).to.eql(false);
    });

    it('Testing Speed', () => {
        //let t0 = performance.now();

        let hand = new Hand(TileList('p123s123678a123w'));
        let tenpai = new Tenpai(hand);

        //let t1 = performance.now();
        // PrintTileList(hand.tiles);
        //console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        //let t0 = performance.now();

        let hand = new Hand(TileList('p1112223334445'));
        let tenpai = new Tenpai(hand);

        //let t1 = performance.now();
        // PrintTileList(hand.tiles);
        //console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        //let t0 = performance.now();

        let hand = new Hand(TileList('p1112345678999'));
        let tenpai = new Tenpai(hand);

        //let t1 = performance.now();
        // PrintTileList(hand.tiles);
        //console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        //let t0 = performance.now();

        let hand = new Hand(TileList('p123s123678a14ww'));
        let tenpai = new Tenpai(hand);

        //let t1 = performance.now();
        // PrintTileList(hand.tiles);
        //console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('.tiles returns the tiles required to complete a hand with 13 orphans', () => {
        let hand = new Hand(TileList('p19s19a19NESWrgw'));
        let tilesToComplete = TileList('p19s19a19ESWNgrw');
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand with 12 orphans and a pair', () => {
        let hand = new Hand(TileList('p199s19a19NSWrgw'));
        let tilesToComplete = TileList('E');
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand with 12 orphans and no pair', () => {
        let hand = new Hand(TileList('p149s19a19NSWrgw'));
        let tilesToComplete = TileList('');
        let tenpai = new Tenpai(hand);
        // PrintTileList(hand.tiles);
        // tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });
});