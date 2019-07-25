import {expect} from 'chai';
import { TileList, Tile, PrintTileList } from '../src/tile';
import { Hand } from '../src/hand';
import { Tenpai } from '../src/tenpai';
const { performance } = require('perf_hooks');

describe('Tenpai', () => {

    it('Tenpai can be constructed with a hand', () => {
        let hand : Hand = new Hand(TileList('p1112223334445'));
        let tenpai : Tenpai = new Tenpai(hand);
        expect(tenpai).to.exist;
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand : Hand = new Hand(TileList('p123s123678a123w'));
        let tilesToComplete : Tile[] = TileList('w');
        let tenpai : Tenpai = new Tenpai(hand);
        PrintTileList(hand.tiles);
        tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand : Hand = new Hand(TileList('p123s123678a14ww'));
        let tilesToComplete : Tile[] = [];
        let tenpai : Tenpai = new Tenpai(hand);
        PrintTileList(hand.tiles);
        tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.tiles returns the tiles required to complete a hand', () => {
        let hand : Hand = new Hand(TileList('p1112345678999'));
        let tilesToComplete : Tile[] = TileList('p123456789');
        let tenpai : Tenpai = new Tenpai(hand);
        PrintTileList(hand.tiles);
        tenpai.PrintTiles();
        expect(tenpai.tiles).to.eql(tilesToComplete);
    });

    it('.isTenpai returns true if the hand is in tenpai', () => {
        let hand : Hand = new Hand(TileList('p1112345678999'));
        let tenpai : Tenpai = new Tenpai(hand);
        expect(tenpai.isTenpai).to.eql(true);
    });

    it('.isTenpai returns false if the hand is not in tenpai', () => {
        let hand : Hand = new Hand(TileList('p123s123678a14ww'));
        let tenpai : Tenpai = new Tenpai(hand);
        expect(tenpai.isTenpai).to.eql(false);
    });

    it('Testing Speed', () => {
        let t0 = performance.now();
        
        let hand : Hand = new Hand(TileList('p123s123678a123w'));
        let tenpai : Tenpai = new Tenpai(hand);

        let t1 = performance.now();
        PrintTileList(hand.tiles);
        console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        let t0 = performance.now();
        
        let hand : Hand = new Hand(TileList('p1112223334445'));
        let tenpai : Tenpai = new Tenpai(hand);

        let t1 = performance.now();
        PrintTileList(hand.tiles);
        console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        let t0 = performance.now();
        
        let hand : Hand = new Hand(TileList('p1112345678999'));
        let tenpai : Tenpai = new Tenpai(hand);

        let t1 = performance.now();
        PrintTileList(hand.tiles);
        console.log("Took " + (t1 - t0) + " milliseconds.")
    });

    it('Testing Speed', () => {
        let t0 = performance.now();
        
        let hand : Hand = new Hand(TileList('p123s123678a14ww'));
        let tenpai : Tenpai = new Tenpai(hand);

        let t1 = performance.now();
        PrintTileList(hand.tiles);
        console.log("Took " + (t1 - t0) + " milliseconds.")
    });
});