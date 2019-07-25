// import { Hand } from "./hand";
// import { Tile, PrintTileList } from "./tile";
// import { Action, ActionType } from "./actions";

let readline = require('readline');
let Hand = require('./hand').Hand;
let Tile = require('./tile').Tile;
//let PrintTileList = require('./tile').PrintTileList;
//let Action = require('./actions').Action;
//let ActionType = require('./actions').ActionType;


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class _Player {
    private _hand : _Hand;
    private _score : number;
    private _index : number;
    private _drawnTile : _Tile;

    constructor(index : number) {
        this._index = index;
    }

    get hand() : _Hand {
        return this._hand;
    }

    set hand(hand : _Hand) {
        this._hand = hand;
    }

    get score() : number {
        return this._score;
    }

    get index() : number {
        return this._index;
    }

    set drawnTile(tile : _Tile) {
        this._drawnTile = tile;
    }

    GetAction(availableTile : _Tile) : _Action {
        let actions : _Action[] = this.CalculateActions(availableTile);
        if(actions.length == 0){ //If no actions are available, return and prompt for discard
            return new Action(ActionType.Discard);
        }
        let input : number;
        rl.question(this.GetActionStrings(actions), inp => {input = inp});

    }

    GetDiscard() : _Tile{
        //get tile to remove from player
        //return tile and reconstruct hand
        PrintTileList(this._hand.tiles, this._drawnTile);
        let input : number = null;
        input = parseInt(window.prompt("Select a tile index to discard."));
        // while(!input){
        //     rl.question("Select a tile index to discard.", inp => {input = inp;});
        // }
        // rl.question('What do you think of Node.js? ', (answer) => {
        //     // TODO: Log the answer in a database
        //     console.log(`Thank you for your valuable feedback: ${answer}`);
          
        //     rl.close();
        //   });
        if(input < 0 || input > this._hand.tiles.length - 1) input = -1;
        let discard : _Tile;
        if(input == -1){
            discard = this._drawnTile;
            this._drawnTile = null;
        }
        else{
            discard = this._hand.tiles[input];
            this._hand.remove(this._hand.tiles[input]);
            this._hand.add(this._drawnTile);
            this._drawnTile = null;
        }
        PrintTileList(this._hand.tiles);
        return discard; 
    }

    CalculateActions(availableTile : _Tile) : _Action[] {
        let actions : _Action[] = [];
        return actions;
    }

    GetActionStrings(actions : _Action[]) : string {
        let actionString : string = '';
        for(let action of actions){
            switch(action.type){
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
}