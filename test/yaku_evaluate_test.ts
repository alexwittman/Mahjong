import {expect} from 'chai';
import { Yaku_Evaluate } from '../src/yaku_evaluate';
import { Meld, MeldType } from '../src/meld';
import { Pair } from '../src/pair';
import { TileList, Tile } from '../src/tile';
import * as yaku from '../src/yaku'; 
import { Hand } from '../src/hand';
import { DRAGON_WHITE, DRAGON_RED, WEST, WAN_NINE, PIN_NINE, PIN_ONE } from '../src/constants';


let yakuEvaluate : Yaku_Evaluate = new Yaku_Evaluate();

describe('Yaku Evaluate', () => {
    it('MeldsOfType() returns correct for hand 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.CHOW).length).to.eql(4);
    });

    it('MeldsOfType() returns correct for hand 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('s111')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.PONG).length).to.eql(4);
    });

    it('MeldsOfType() returns correct for hand 4 Kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('p2222')),
                                            new Meld(TileList('p3333')),
                                            new Meld(TileList('s1111')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.KONG).length).to.eql(4);
    });

    it('MeldsOfType() returns correct for hand with a mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p3333')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.CHOW).length).to.eql(2);
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.PONG).length).to.eql(1);
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.KONG).length).to.eql(1);
    });

    it('MeldsOfType() returns correct for hand 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.CHOW)).to.eql([ new Meld(TileList('p123')),
                                                                            new Meld(TileList('p456')),
                                                                            new Meld(TileList('p789')),
                                                                            new Meld(TileList('s123'))]);
    });

    it('MeldsOfType() returns correct for hand 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('s111')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.PONG)).to.eql([ new Meld(TileList('p111')),
                                                                            new Meld(TileList('p222')),
                                                                            new Meld(TileList('p333')),
                                                                            new Meld(TileList('s111'))]);
    });

    it('MeldsOfType() returns correct for hand 4 Kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('p2222')),
                                            new Meld(TileList('p3333')),
                                            new Meld(TileList('s1111')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.KONG)).to.eql([ new Meld(TileList('p1111')),
                                                                            new Meld(TileList('p2222')),
                                                                            new Meld(TileList('p3333')),
                                                                            new Meld(TileList('s1111'))]);
    });

    it('MeldsOfType() returns correct for hand with a mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p3333')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.CHOW)).to.eql([new Meld(TileList('p123')), new Meld(TileList('s123'))]);
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.PONG)).to.eql([new Meld(TileList('p222'))]);
        expect(yakuEvaluate.MeldsOfType(partition, MeldType.KONG)).to.eql([new Meld(TileList('p3333'))]);
    });

    it('PartitionTiles() returns correct tiles', () => {
        let tiles : Tile[] = TileList('p122223333s123WW');
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.PartitionTiles(partition)).to.eql(tiles);
    });

    it('NoPointsHand() returns correct for hand with NoPointsHand', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.NoPointsHand(partition)).to.eql(new yaku.NoPointsHand);
    });

    it('NoPointsHand() returns correct for hand without NoPointsHand', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p999')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.NoPointsHand(partition)).to.eql(null);
    });

    it('IdenticalSquences() returns correct for hand with IdenticalSequences', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p123')),
                                            new Meld(TileList('p999')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.IdenticalSequences(partition)).to.eql(new yaku.IdenticalSequences);
    });

    it('IdenticalSquences() returns correct for hand without IdenticalSequences', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p234')),
                                            new Meld(TileList('p999')),
                                            new Meld(TileList('s123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.IdenticalSequences(partition)).to.eql(null);
    });

    it('ThreeColorStraight() returns correct for hand with ThreeColorStraight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(new yaku.ThreeColorStraight);
    });

    it('ThreeColorStraight() returns correct for hand with ThreeColorStraight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(new yaku.ThreeColorStraight);
    });

    it('ThreeColorStraight() returns correct for hand with ThreeColorStraight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('s456')),
                                            new Meld(TileList('a456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(new yaku.ThreeColorStraight);
    });

    it('ThreeColorStraight() returns correct for hand without ThreeColorStraight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('s456')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(null);
    });

    it('ThreeColorStraight() returns correct for hand without ThreeColorStraight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p123')),
                                            new Meld(TileList('p123')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(null);
    });

    it('ThreeColorStraight() returns correct for hand without ThreeColorStraight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('a789')),
                                            new Meld(TileList('a789')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorStraight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand with Straight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('a999')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand with Straight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a456')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand without Straight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p234')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('a999')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand without Straight and 3 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a456')),
                                            new Meld(TileList('a678')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand with Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a456')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand with Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p567')),
                                            new Meld(TileList('p789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand with Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p234')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand with Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p789')),
                                            new Meld(TileList('a123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(new yaku.Straight);
    });

    it('Straight() returns correct for hand without Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('a234')),
                                            new Meld(TileList('a456')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand without Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p678')),
                                            new Meld(TileList('p678')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand without Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p234')),
                                            new Meld(TileList('p567')),
                                            new Meld(TileList('p789')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('Straight() returns correct for hand without Straight and 4 chows', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p456')),
                                            new Meld(TileList('p678')),
                                            new Meld(TileList('a123')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('DoubleIdenticalSequences() returns correct for hand with DoubleIdenticalSequences', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p123')),
                                            new Meld(TileList('p678')),
                                            new Meld(TileList('p678')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('DoubleIdenticalSequences() returns correct for hand without DoubleIdenticalSequences', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p234')),
                                            new Meld(TileList('p123')),
                                            new Meld(TileList('p678')),
                                            new Meld(TileList('p678')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Straight(partition)).to.eql(null);
    });

    it('AllTripletHand() returns correct for hand with AllTripletHand', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.AllTripletHand(partition)).to.eql(new yaku.AllTripletHand);
    });

    it('AllTripletHand() returns correct for hand without AllTripletHand', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.AllTripletHand(partition)).to.eql(null);
    });

    it('ThreeClosedTriplets() returns correct for hand with ThreeClosedTriplets 3 closed 1 open', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p444'), true),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeClosedTriplets(partition)).to.eql(new yaku.ThreeClosedTriplets);
    });

    it('ThreeClosedTriplets() returns correct for hand with ThreeClosedTriplets 1 chow', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeClosedTriplets(partition)).to.eql(new yaku.ThreeClosedTriplets);
    });

    it('ThreeClosedTriplets() returns correct for hand without ThreeClosedTriplets 4 closed', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeClosedTriplets(partition)).to.eql(null);
    });

    it('ThreeClosedTriplets() returns correct for hand without ThreeClosedTriplets 2 closed', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333'), true),
                                            new Meld(TileList('p444'), true),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeClosedTriplets(partition)).to.eql(null);
    });

    it('ThreeClosedTriplets() returns correct for hand without ThreeClosedTriplets 2 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('p456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeClosedTriplets(partition)).to.eql(null);
    });

    it('ThreeColorTriplets() returns correct for hand with ThreeColorTriplets 3 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('p456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(new yaku.ThreeColorTriplets);
    });

    it('ThreeColorTriplets() returns correct for hand with ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(new yaku.ThreeColorTriplets);
    });

    it('ThreeColorTriplets() returns correct for hand with ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(new yaku.ThreeColorTriplets);
    });

    it('ThreeColorTriplets() returns correct for hand with ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(new yaku.ThreeColorTriplets);
    });

    it('ThreeColorTriplets() returns correct for hand with ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a111')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(new yaku.ThreeColorTriplets);
    });

    it('ThreeColorTriplets() returns correct for hand without ThreeColorTriplets 3 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a222')),
                                            new Meld(TileList('p456')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(null);
    });

    it('ThreeColorTriplets() returns correct for hand without ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(null);
    });

    it('ThreeColorTriplets() returns correct for hand without ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(null);
    });

    it('ThreeColorTriplets() returns correct for hand without ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s333')),
                                            new Meld(TileList('a222')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(null);
    });

    it('ThreeColorTriplets() returns correct for hand without ThreeColorTriplets 4 pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a333')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeColorTriplets(partition)).to.eql(null);
    });

    it('ThreeQuads() returns correct for hand without ThreeQuads 4 kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('s2222')),
                                            new Meld(TileList('a4444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeQuads(partition)).to.eql(null);
    });

    it('ThreeQuads() returns correct for hand without ThreeQuads 3 kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('s2222')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeQuads(partition)).to.eql(new yaku.ThreeQuads);
    });

    it('ThreeQuads() returns correct for hand without ThreeQuads 2 kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeQuads(partition)).to.eql(null);
    });

    it('ThreeQuads() returns correct for hand without ThreeQuads 1 kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a4444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeQuads(partition)).to.eql(null);
    });

    it('ThreeQuads() returns correct for hand without ThreeQuads 0 kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.ThreeQuads(partition)).to.eql(null);
    });

    it('AllSimples() returns correct for hand with AllSimples all simples', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('s333')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('p66'))];
        expect(yakuEvaluate.AllSimples(partition)).to.eql(new yaku.AllSimples);
    });

    it('AllSimples() returns correct for hand with AllSimples all nonsimples', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.AllSimples(partition)).to.eql(null);
    });

    it('AllSimples() returns correct for hand with AllSimples mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.AllSimples(partition)).to.eql(null);
    });

    it('RedDragon() returns correct for hand with RedDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('rrr')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.RedDragon(partition)).to.eql(new yaku.RedDragon);
    });

    it('RedDragon() returns correct for hand without RedDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('ggg')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.RedDragon(partition)).to.eql(null);
    });

    it('GreenDragon() returns correct for hand with GreenDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('ggg')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.GreenDragon(partition)).to.eql(new yaku.GreenDragon);
    });

    it('GreenDragon() returns correct for hand without WhiteDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.GreenDragon(partition)).to.eql(null);
    });

    it('WhiteDragon() returns correct for hand with WhiteDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.WhiteDragon(partition)).to.eql(new yaku.WhiteDragon);
    });

    it('WhiteDragon() returns correct for hand without WhiteDragon', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('NNN')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.WhiteDragon(partition)).to.eql(null);
    });

    it('NorthWind() returns correct for hand with NorthWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('NNN')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.NorthWind(partition)).to.eql(new yaku.NorthWind);
    });

    it('NorthWind() returns correct for hand with NorthWind kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('NNNN')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.NorthWind(partition)).to.eql(new yaku.NorthWind);
    });

    it('NorthWind() returns correct for hand without NorthWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('EEE')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.NorthWind(partition)).to.eql(null);
    });

    it('EastWind() returns correct for hand with EastWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('EEE')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.EastWind(partition)).to.eql(new yaku.EastWind);
    });

    it('EastWind() returns correct for hand with EastWind kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('EEEE')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.EastWind(partition)).to.eql(new yaku.EastWind);
    });

    it('EastWind() returns correct for hand without EastWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.EastWind(partition)).to.eql(null);
    });

    it('SouthWind() returns correct for hand with SouthWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.SouthWind(partition)).to.eql(new yaku.SouthWind);
    });

    it('SouthWind() returns correct for hand with SouthWind kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.SouthWind(partition)).to.eql(new yaku.SouthWind);
    });

    it('SouthWind() returns correct for hand without SouthWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.SouthWind(partition)).to.eql(null);
    });

    it('WestWind() returns correct for hand with WestWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.WestWind(partition)).to.eql(new yaku.WestWind);
    });

    it('WestWind() returns correct for hand with WestWind kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.WestWind(partition)).to.eql(new yaku.WestWind);
    });

    it('WestWind() returns correct for hand without WestWind', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.WestWind(partition)).to.eql(null);
    });

    it('MixedOutsideHand() returns correct for hand with MixedOutsideHand all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(new yaku.MixedOutsideHand);
    });

    it('MixedOutsideHand() returns correct for hand with MixedOutsideHand some all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(new yaku.MixedOutsideHand);
    });

    it('MixedOutsideHand() returns correct for hand with MixedOutsideHand all one outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('s99'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(new yaku.MixedOutsideHand);
    });

    it('MixedOutsideHand() returns correct for hand without MixedOutsideHand all inside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a333')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('s77'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(null);
    });

    it('MixedOutsideHand() returns correct for hand without MixedOutsideHand some inside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(null);
    });

    it('MixedOutsideHand() returns correct for hand without MixedOutsideHand almost all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a234')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.MixedOutsideHand(partition)).to.eql(null);
    });

    it('PureOutsideHand() returns correct for hand with PureOutsideHand all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(new yaku.PureOutsideHand);
    });

    it('PureOutsideHand() returns correct for hand with PureOutsideHand some all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(null);
    });

    it('PureOutsideHand() returns correct for hand with PureOutsideHand all one outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('s123')),
                                            new Meld(TileList('a123')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('s99'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(null);
    });

    it('PureOutsideHand() returns correct for hand without PureOutsideHand all inside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a333')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('s77'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(null);
    });

    it('PureOutsideHand() returns correct for hand without PureOutsideHand some inside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a444')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(null);
    });

    it('PureOutsideHand() returns correct for hand without PureOutsideHand almost all outside', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a234')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.PureOutsideHand(partition)).to.eql(null);
    });

    it('LittleThreeDragons() returns correct for hand with LittleThreeDragons', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.LittleThreeDragons(partition)).to.eql(new yaku.LittleThreeDragons);
    });

    it('LittleThreeDragons() returns correct for hand with LittleThreeDragons with kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrrr')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.LittleThreeDragons(partition)).to.eql(new yaku.LittleThreeDragons);
    });

    it('LittleThreeDragons() returns correct for hand with LittleThreeDragons all kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s1111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrrr')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.LittleThreeDragons(partition)).to.eql(new yaku.LittleThreeDragons);
    });

    it('LittleThreeDragons() returns correct for hand without LittleThreeDragons three pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        expect(yakuEvaluate.LittleThreeDragons(partition)).to.eql(null);
    });

    it('LittleThreeDragons() returns correct for hand without LittleThreeDragons no pongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('s345')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('a99'))];
        expect(yakuEvaluate.LittleThreeDragons(partition)).to.eql(null);
    });

    it('HalfFlush() returns correct for hand with HalfFlush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('p555')),
                                            new Meld(TileList('p777')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.HalfFlush(partition)).to.eql(new yaku.HalfFlush);
    });

    it('HalfFlush() returns correct for hand without HalfFlush all honors', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.HalfFlush(partition)).to.eql(null);
    });

    it('HalfFlush() returns correct for hand without HalfFlush full flush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p444')),
                                            new Meld(TileList('p789')),
                                            new Pair(TileList('p99'))];
        expect(yakuEvaluate.HalfFlush(partition)).to.eql(null);
    });

    it('HalfFlush() returns correct for hand with HalfFlush non flush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('s555')),
                                            new Meld(TileList('a777')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.HalfFlush(partition)).to.eql(null);
    });

    it('Flush() returns correct for hand without Flush all honors', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.Flush(partition)).to.eql(null);
    });

    it('Flush() returns correct for hand without Flush full flush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('p444')),
                                            new Meld(TileList('p789')),
                                            new Pair(TileList('p99'))];
        expect(yakuEvaluate.Flush(partition)).to.eql(new yaku.Flush);
    });

    it('Flush() returns correct for hand with Flush non flush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('s555')),
                                            new Meld(TileList('a777')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Flush(partition)).to.eql(null);
    });

    it('Flush() returns correct for hand with Flush', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('p555')),
                                            new Meld(TileList('p777')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.Flush(partition)).to.eql(null);
    });

    it('ThirteenOrphans() returns correct for hand with ThirteenOrphans 1 tile wait', () => {
        let hand : Hand = new Hand(TileList('p19s19a19NESWgrww'));
        expect(yakuEvaluate.ThirteenOrphans(hand, new Tile(DRAGON_RED))).to.eql(new yaku.ThirteenOrphans);
    });

    it('ThirteenOrphans() returns correct for hand with ThirteenOrphans 9 tile wait', () => {
        let hand : Hand = new Hand(TileList('p19s19a19NESWgrww'));
        expect(yakuEvaluate.ThirteenOrphans(hand, new Tile(DRAGON_WHITE))).to.eql(null);
    });

    it('ThirteenOrphans() returns correct for hand with ThirteenOrphans non thirteen orphans', () => {
        let hand : Hand = new Hand(TileList('p123345555777WW'));
        expect(yakuEvaluate.ThirteenOrphans(hand, new Tile(WEST))).to.eql(null);
    });

    it('DoubleThirteenOrphans() returns correct for hand with DoubleThirteenOrphans 1 tile wait', () => {
        let hand : Hand = new Hand(TileList('p19s19a19NESWgrww'));
        expect(yakuEvaluate.DoubleThirteenOrphans(hand, new Tile(DRAGON_RED))).to.eql(null);
    });

    it('DoubleThirteenOrphans() returns correct for hand with DoubleThirteenOrphans 9 tile wait', () => {
        let hand : Hand = new Hand(TileList('p19s19a19NESWgrww'));
        expect(yakuEvaluate.DoubleThirteenOrphans(hand, new Tile(DRAGON_WHITE))).to.eql(new yaku.DoubleThirteenOrphans);
    });

    it('DoubleThirteenOrphans() returns correct for hand with DoubleThirteenOrphans non thirteen orphans', () => {
        let hand : Hand = new Hand(TileList('p123345555777WW'));
        expect(yakuEvaluate.DoubleThirteenOrphans(hand, new Tile(WEST))).to.eql(null);
    });

    it('FourConcealedTriplets() returns correct for hand with FourConcealedTriplets 2 tile wait', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.FourConcealedTriplets(partition, hand, new Tile(DRAGON_RED))).to.eql(new yaku.FourConcealedTriplets);
    });

    it('FourConcealedTriplets() returns correct for hand with FourConcealedTriplets 1 tile wait', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.FourConcealedTriplets(partition, hand, new Tile(WAN_NINE))).to.eql(null);
    });

    it('FourConcealedTriplets() returns correct for hand with FourConcealedTriplets open meld', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg'), true),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.FourConcealedTriplets(partition, hand, new Tile(DRAGON_RED))).to.eql(null);
    });

    it('FourConcealedTriplets() returns correct for hand with FourConcealedTriplets 1 kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111ggggrrrwwwa99'));
        expect(yakuEvaluate.FourConcealedTriplets(partition, hand, new Tile(DRAGON_RED))).to.eql(new yaku.FourConcealedTriplets);
    });

    it('FourConcealedTriplets() returns correct for hand with FourConcealedTriplets all kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrrr')),
                                            new Meld(TileList('wwww')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p1111ggggrrrrwwwwa99'));
        expect(yakuEvaluate.FourConcealedTriplets(partition, hand, new Tile(WAN_NINE))).to.eql(null);
    });

    it('DoubleFourConcealedTriplets() returns correct for hand with DoubleFourConcealedTriplets 2 tile wait', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.DoubleFourConcealedTriplets(partition, hand, new Tile(DRAGON_RED))).to.eql(null);
    });

    it('DoubleFourConcealedTriplets() returns correct for hand with DoubleFourConcealedTriplets 1 tile wait', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.DoubleFourConcealedTriplets(partition, hand, new Tile(WAN_NINE))).to.eql(new yaku.DoubleFourConcealedTriplets);
    });

    it('DoubleFourConcealedTriplets() returns correct for hand with DoubleFourConcealedTriplets open meld', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg'), true),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111gggrrrwwwa99'));
        expect(yakuEvaluate.DoubleFourConcealedTriplets(partition, hand, new Tile(DRAGON_RED))).to.eql(null);
    });

    it('DoubleFourConcealedTriplets() returns correct for hand with DoubleFourConcealedTriplets 1 kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p111ggggrrrwwwa99'));
        expect(yakuEvaluate.DoubleFourConcealedTriplets(partition, hand, new Tile(WAN_NINE))).to.eql(new yaku.DoubleFourConcealedTriplets);
    });

    it('DoubleFourConcealedTriplets() returns correct for hand with DoubleFourConcealedTriplets all kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p1111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrrr')),
                                            new Meld(TileList('wwww')),
                                            new Pair(TileList('a99'))];
        let hand : Hand = new Hand(TileList('p1111ggggrrrrwwwwa99'));
        expect(yakuEvaluate.DoubleFourConcealedTriplets(partition, hand, new Tile(WAN_NINE))).to.eql(new yaku.DoubleFourConcealedTriplets);
    });

    it('BigThreeDragons() returns correct for hand with BigThreeDragons', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('a99'))];
        expect(yakuEvaluate.BigThreeDragons(partition)).to.eql(new yaku.BigThreeDragons);
    });

    it('BigThreeDragons() returns correct for hand with BigThreeDragons with kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('ggg')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('wwww')),
                                            new Pair(TileList('a99'))];
        expect(yakuEvaluate.BigThreeDragons(partition)).to.eql(new yaku.BigThreeDragons);
    });

    it('BigThreeDragons() returns correct for hand with BigThreeDragons all kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('gggg')),
                                            new Meld(TileList('rrrr')),
                                            new Meld(TileList('wwww')),
                                            new Pair(TileList('a99'))];
        expect(yakuEvaluate.BigThreeDragons(partition)).to.eql(new yaku.BigThreeDragons);
    });

    it('BigThreeDragons() returns correct for hand without BigThreeDragons Littledragons', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('a666')),
                                            new Meld(TileList('rrr')),
                                            new Meld(TileList('www')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.BigThreeDragons(partition)).to.eql(null);
    });

    it('BigThreeDragons() returns correct for hand without BigThreeDragons without dragons', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('a666')),
                                            new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Pair(TileList('s88'))];
        expect(yakuEvaluate.BigThreeDragons(partition)).to.eql(null);
    });

    it('LittleFourWinds() returns correct for hand with LittleFourWinds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('WW'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(new yaku.LittleFourWinds);
    });

    it('LittleFourWinds() returns correct for hand with LittleFourWinds 1 kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p333')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('NN'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(new yaku.LittleFourWinds);
    });

    it('LittleFourWinds() returns correct for hand with LittleFourWinds all kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('a123')),
                                            new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('WWWW')),
                                            new Pair(TileList('SS'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(new yaku.LittleFourWinds);
    });

    it('LittleFourWinds() returns correct for hand without LittleFourWinds bigFourWinds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('p11'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(null);
    });

    it('LittleFourWinds() returns correct for hand without LittleFourWinds no winds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('s345')),
                                            new Meld(TileList('s567')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(null);
    });

    it('LittleFourWinds() returns correct for hand without LittleFourWinds no pair', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('a345')),
                                            new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Pair(TileList('p11'))];
        expect(yakuEvaluate.LittleFourWinds(partition)).to.eql(null);
    });

    it('BigFourWinds() returns correct for hand with BigFourWinds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('p11'))];
        expect(yakuEvaluate.BigFourWinds(partition)).to.eql(new yaku.BigFourWinds);
    });

    it('BigFourWinds() returns correct for hand with BigFourWinds 1 kong', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('p99'))];
        expect(yakuEvaluate.BigFourWinds(partition)).to.eql(new yaku.BigFourWinds);
    });

    it('BigFourWinds() returns correct for hand with BigFourWinds all kongs', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('SSSS')),
                                            new Meld(TileList('WWWW')),
                                            new Pair(TileList('a33'))];
        expect(yakuEvaluate.BigFourWinds(partition)).to.eql(new yaku.BigFourWinds);
    });

    it('BigFourWinds() returns correct for hand witout BigFourWinds little four winds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('SS'))];
        expect(yakuEvaluate.BigFourWinds(partition)).to.eql(null);
    });

    it('BigFourWinds() returns correct for hand witout BigFourWinds no winds', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('s333')),
                                            new Meld(TileList('s666')),
                                            new Meld(TileList('s999')),
                                            new Pair(TileList('p33'))];
        expect(yakuEvaluate.BigFourWinds(partition)).to.eql(null);
    });

    it('AllHonors() returns correct for hand with AllHonors all honors', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('ggg')),
                                            new Pair(TileList('rr'))];
        expect(yakuEvaluate.AllHonors(partition)).to.eql(new yaku.AllHonors);
    });

    it('AllHonors() returns correct for hand with AllHonors all nonHonors', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('a777')),
                                            new Pair(TileList('p22'))];
        expect(yakuEvaluate.AllHonors(partition)).to.eql(null);
    });

    it('AllHonors() returns correct for hand with AllHonors mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.AllHonors(partition)).to.eql(null);
    });

    it('AllTerminals() returns correct for hand with AllTerminals all terminals', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p999')),
                                            new Meld(TileList('s111')),
                                            new Meld(TileList('s999')),
                                            new Pair(TileList('a11'))];
        expect(yakuEvaluate.AllTerminals(partition)).to.eql(new yaku.AllTerminals);
    });

    it('AllTerminals() returns correct for hand with AllTerminals all nonTerminals', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p222')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a222')),
                                            new Meld(TileList('a777')),
                                            new Pair(TileList('p22'))];
        expect(yakuEvaluate.AllTerminals(partition)).to.eql(null);
    });

    it('AllTerminals() returns correct for hand with AllTerminals mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.AllTerminals(partition)).to.eql(null);
    });

    it('AllGreen() returns correct for hand with AllGreen all green', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('s234')),
                                            new Meld(TileList('s234')),
                                            new Meld(TileList('s666')),
                                            new Meld(TileList('s888')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.AllGreen(partition)).to.eql(new yaku.AllGreen);
    });

    it('AllGreen() returns correct for hand with AllGreen all nonGreen', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('p222')),
                                            new Meld(TileList('p333')),
                                            new Meld(TileList('a777')),
                                            new Pair(TileList('p99'))];
        expect(yakuEvaluate.AllGreen(partition)).to.eql(null);
    });

    it('AllGreen() returns correct for hand with AllGreen mixture', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p111')),
                                            new Meld(TileList('s444')),
                                            new Meld(TileList('a111')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.AllGreen(partition)).to.eql(null);
    });

    it('NineGates() returns correct for hand with NineGates 1 tile wait', () => {
        let hand : Hand = new Hand(TileList('p11123456789999'));
        expect(yakuEvaluate.NineGates(hand, new Tile(PIN_ONE))).to.eql(new yaku.NineGates);
    });

    it('NineGates() returns correct for hand with NineGates 9 tile wait', () => {
        let hand : Hand = new Hand(TileList('p11123456789999'));
        expect(yakuEvaluate.NineGates(hand, new Tile(PIN_NINE))).to.eql(null);
    });

    it('NineGates() returns correct for hand with NineGates random hand', () => {
        let hand : Hand = new Hand(TileList('p123456s234567WW'));
        expect(yakuEvaluate.NineGates(hand, new Tile(WEST))).to.eql(null);
    });

    it('DoubleNineGates() returns correct for hand with DoubleNineGates 1 tile wait', () => {
        let hand : Hand = new Hand(TileList('p11123456789999'));
        expect(yakuEvaluate.DoubleNineGates(hand, new Tile(PIN_ONE))).to.eql(null);
    });

    it('DoubleNineGates() returns correct for hand with DoubleNineGates 9 tile wait', () => {
        let hand : Hand = new Hand(TileList('p11123456789999'));
        expect(yakuEvaluate.DoubleNineGates(hand, new Tile(PIN_NINE))).to.eql(new yaku.DoubleNineGates);
    });

    it('DoubleNineGates() returns correct for hand with DoubleNineGates random hand', () => {
        let hand : Hand = new Hand(TileList('p123456s234567WW'));
        expect(yakuEvaluate.DoubleNineGates(hand, new Tile(WEST))).to.eql(null);
    });

    it('FourQuads() returns correct for hand with FourQuads', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('SSSS')),
                                            new Meld(TileList('WWWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.FourQuads(partition)).to.eql(new yaku.FourQuads);
    });

    it('FourQuads() returns correct for hand with FourQuads 3 quads', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('SSSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.FourQuads(partition)).to.eql(null);
    });

    it('FourQuads() returns correct for hand with FourQuads 2 quads', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.FourQuads(partition)).to.eql(null);
    });

    it('FourQuads() returns correct for hand with FourQuads 1 quad', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.FourQuads(partition)).to.eql(null);
    });

    it('FourQuads() returns correct for hand with FourQuads no quads', () => {
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNN')),
                                            new Meld(TileList('EEE')),
                                            new Meld(TileList('SSS')),
                                            new Meld(TileList('WWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.FourQuads(partition)).to.eql(null);
    });

    // it('ReadyHand() returns correct for hand with ReadyHand', () => {
    // needs if player declared riichi
    // });

    // it('DiscardOnlyHonorsAndTerminals() returns correct for hand with DiscardOnlyHonorsAndTerminals', () => {
    // needs player discards
    // });

    // it('SelfDraw() returns correct for hand with SelfDraw', () => {
    // needs winning tile and last tile dealt
    // });

    // it('OneShot() returns correct for hand with OneShot', () => {
    // need if player declared riichi
    // need number of draws after riichi
    // });

    // it('LastTile() returns correct for hand with LastTile', () => {
    // need winning tile and last tile dealt
    // and tiles in usable wall = 0
    // });

    // it('LastDiscard() returns correct for hand with LastDiscard', () => {
    // need winning tile and wall = 0 and last discard
    // });

    // it('DeadWallDraw() returns correct for hand with DeadWallDraw', () => {
    // need player last action = declare quad
    // need winning tile from deadwall
    // });

    // it('RobbingAQuad() returns correct for hand with RobbingAQuad', () => {
    // need round last action = complete open quad
    // need winning tile from the quad declared
    // });

    // it('DoubleReady() returns correct for hand with DoubleReady', () => {
    // need declare riichi and complete within 4 draws
    // });

    // it('HeavenlyHand() returns correct for hand with HeavenlyHand', () => {
    // player's first draw and is dealer
    // });

    // it('HandOfEarth() returns correct for hand with HandOfEarth', () => {
    // player's first draw and is not dealer
    // });

    // it('HandOfMan() returns correct for hand with HandOfMan', () => {
    // player rons before first draw
    // });

    it('EvaluateYaku() returns correct for partition with 1 yaku', () => {
        let yakuList : yaku.Yaku[] = [new yaku.NoPointsHand];
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('s234')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.EvaluateYaku(partition)).to.eql(yakuList);
    });

    it('EvaluateYaku() returns correct for partition with 3 yaku', () => {
        let yakuList : yaku.Yaku[] = [new yaku.ThreeClosedTriplets, new yaku.HalfFlush, new yaku.AllGreen];
        let partition : (Meld | Pair)[] = [ new Meld(TileList('s222')),
                                            new Meld(TileList('s234')),
                                            new Meld(TileList('s333')),
                                            new Meld(TileList('s444')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.EvaluateYaku(partition)).to.eql(yakuList);
    });

    it('EvaluateYaku() returns correct for partition with many yaku', () => {
        let yakuList : yaku.Yaku[] = [  new yaku.NorthWind,
                                        new yaku.EastWind,
                                        new yaku.SouthWind,
                                        new yaku.WestWind,
                                        new yaku.MixedOutsideHand,
                                        new yaku.PureOutsideHand,
                                        new yaku.BigFourWinds,
                                        new yaku.AllHonors,
                                        new yaku.FourQuads];
        let partition : (Meld | Pair)[] = [ new Meld(TileList('NNNN')),
                                            new Meld(TileList('EEEE')),
                                            new Meld(TileList('SSSS')),
                                            new Meld(TileList('WWWW')),
                                            new Pair(TileList('gg'))];
        expect(yakuEvaluate.EvaluateYaku(partition)).to.eql(yakuList);
    });

    it('EvaluateYaku() returns correct for partition with no yaku', () => {
        let yakuList : yaku.Yaku[] = [];
        let partition : (Meld | Pair)[] = [ new Meld(TileList('p123')),
                                            new Meld(TileList('p345')),
                                            new Meld(TileList('s222')),
                                            new Meld(TileList('a789')),
                                            new Pair(TileList('ww'))];
        expect(yakuEvaluate.EvaluateYaku(partition)).to.eql(yakuList);
    });

    //need to add EvaluateYaku for functions that need parameter other than partition.
});