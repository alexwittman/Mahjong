// import { Hand } from "./hand";
// import { Tile, PrintTileList } from "./tile";
// import { Action, ActionType } from "./actions";
let readline = require('readline');
let Hand = require('./hand').Hand;
let Tile = require('./tile').Tile;
let PrintTileList = require('./tile').PrintTileList;
let Action = require('./actions').Action;
let ActionType = require('./actions').ActionType;
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class _Player {
    constructor(index) {
        this._index = index;
    }
    get hand() {
        return this._hand;
    }
    set hand(hand) {
        this._hand = hand;
    }
    get score() {
        return this._score;
    }
    get index() {
        return this._index;
    }
    set drawnTile(tile) {
        this._drawnTile = tile;
    }
    GetAction(availableTile) {
        let actions = this.CalculateActions(availableTile);
        if (actions.length == 0) { //If no actions are available, return and prompt for discard
            return new Action(ActionType.Discard);
        }
        //else display buttons for other actions.
    }
    GetDiscard() {
        //get tile to remove from player
        //return tile and reconstruct hand
        PrintTileList(this._hand.tiles, this._drawnTile);
        let input = null;
        input = parseInt(window.prompt("Select a tile index to discard."));
        // while(!input){
        //     rl.question("Select a tile index to discard.", inp => {input = inp;});
        // }
        // rl.question('What do you think of Node.js? ', (answer) => {
        //     // TODO: Log the answer in a database
        //     console.log(`Thank you for your valuable feedback: ${answer}`);
        //     rl.close();
        //   });
        if (input < 0 || input > this._hand.tiles.length - 1)
            input = -1;
        let discard;
        if (input == -1) {
            discard = this._drawnTile;
            this._drawnTile = null;
        }
        else {
            discard = this._hand.tiles[input];
            this._hand.remove(this._hand.tiles[input]);
            this._hand.add(this._drawnTile);
            this._drawnTile = null;
        }
        PrintTileList(this._hand.tiles);
        return discard;
    }
    CalculateActions(availableTile) {
        let actions = [];
        return actions;
    }
    GetActionStrings(actions) {
        let actionString = '';
        for (let action of actions) {
            switch (action.type) {
                case ActionType.Discard: {
                    actionString += 'Discard - 0 ';
                }
                case ActionType.Chi: {
                    actionString += 'Chi - 1 ';
                }
                case ActionType.Pon: {
                    actionString += 'Pon - 2 ';
                }
                case ActionType.Kan: {
                    actionString += 'Kan - 3 ';
                }
                case ActionType.Ron: {
                    actionString += 'Ron - 4 ';
                }
                case ActionType.Tsumo: {
                    actionString += 'Tsumo - 5 ';
                }
            }
        }
        return actionString;
    }
}
module.exports = {
    Player: _Player
};
