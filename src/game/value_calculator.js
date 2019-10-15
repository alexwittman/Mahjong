let yaku = require('./yaku');

/**
 * Class to calculate the value of a winning hand.
 */
class Value_Calculator {

    /**
     * Calculates the total han of a list of yaku.
     * 
     * @param {yaku.Yaku[]} yakuList The list of yaku to evaluate.
     * @param {boolean} handOpen True if the hand is open, false otherwise.
     * @returns {number} The total han value of all yaku in the list.
     */
    CalculateHan(yakuList, handOpen){
        let han = 0;
        for(let yaku of yakuList){
            if(handOpen){
                if(!isNaN(yaku.hanOpen)){
                    han += yaku.hanOpen;
                }
            }
            else{
                if(!isNaN(yaku.hanClosed)){
                    han += yaku.hanClosed;
                }
            }
        }
        if(han > 13 && han < 26) han = 13;
        if(han > 26) han = 26;
        return han;
    }
}

module.exports.Value_Calculator = Value_Calculator;