let yaku = require('../src/game/yaku');
let Value_Calculator = require('../src/game/value_calculator').Value_Calculator;
let expect = require('chai').expect;

describe('Value Calculator', () => {

    let valueCalculator = new Value_Calculator();

    it('CalculateHan returns the correct value for one yaku open.', () => {
        let yakuList = [new yaku.NoPointsHand()];
        let handOpen = true;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(0);
    });

    it('CalculateHan returns the correct value for one yaku open.', () => {
        let yakuList = [new yaku.ThreeColorStraight()];
        let handOpen = true;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(1);
    });

    it('CalculateHan returns the correct value for one yaku closed.', () => {
        let yakuList = [new yaku.NoPointsHand()];
        let handOpen = false;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(1);
    });

    it('CalculateHan returns the correct value for many yaku open.', () => {
        let yakuList = [new yaku.AllTripletHand(), new yaku.ThreeClosedTriplets()];
        let handOpen = true;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(4);
    });

    it('CalculateHan returns the correct value for many yaku closed.', () => {
        let yakuList = [new yaku.ThreeColorTriplets(), new yaku.ThreeClosedTriplets()];
        let handOpen = false;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(4);
    });

    it('CalculateHan returns the correct value for yakuman open.', () => {
        let yakuList = [new yaku.BigThreeDragons(), new yaku.GreenDragon(),
                        new yaku.RedDragon(), new yaku.WhiteDragon()];
        let handOpen = true;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(13);
    });

    it('CalculateHan returns the correct value for yakuman closed.', () => {
        let yakuList = [new yaku.ThirteenOrphans()];
        let handOpen = false;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(13);
    });

    it('CalculateHan returns the correct value for double yakuman open.', () => {
        let yakuList = [new yaku.BigFourWinds(), new yaku.SouthWind(), new yaku.NorthWind()];
        let handOpen = true;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(26);
    });

    it('CalculateHan returns the correct value for double yakuman closed.', () => {
        let yakuList = [new yaku.DoubleFourConcealedTriplets(), new yaku.AllTripletHand()];
        let handOpen = false;
        expect(valueCalculator.CalculateHan(yakuList, handOpen)).to.eql(26);
    });

});