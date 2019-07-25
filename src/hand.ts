// import {Tile, CompareTiles} from "../src/tile";
// import {Meld} from "../src/meld";

//let Tile = require('./tile').Tile;
let CompareTiles = require('./tile').CompareTiles;
//let Meld = require('./meld').Meld;

class _Hand{
    private _tiles : _Tile[];
    private _melds : _Meld[];
    
    get tiles() : _Tile[] {
        return this._tiles;
    }

    get melds() : _Meld[] {
        return this._melds;
    }

    get length() : number {
        return this._tiles.length;
    }

    constructor(tiles : _Tile[] = [], melds : _Meld[] = []) {
        this._tiles = tiles;
        this._melds = melds;
        for(let meld of melds) {
            this._tiles = this._tiles.concat(meld.tiles);
        }
        this._tiles.sort(CompareTiles);
    }

    add(tile : _Tile) {
        this._tiles.push(tile);
        this._tiles.sort(CompareTiles);
    }

    remove(tile : _Tile) : boolean {
        const index = this._tiles.indexOf(tile);
        if(index > -1) {
            this._tiles.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = {
    Hand: _Hand
}