//import {Tile, TileType, TileValue} from '../src/tile';

//let Tile = require('./tile').Tile;
//let TileType = require('./tile').TileType;
let TileValue = require('./tile').TileValue;

class _Pair {
    private _tiles : _Tile[];
    private _type : _TileType;
    private _value : _TileValue;
    private _is_pair : boolean;

    constructor(tiles : _Tile[]) {
        this._tiles = tiles;
        this._type = tiles[0].type;
        this._value = tiles[0].value;
        this._is_pair = tiles[0].number == tiles[1].number && tiles.length == 2;
    }

    get tiles() : _Tile[] {
        return this._tiles;
    }

    get type() : _TileType {
        return this._type;
    }

    get value() : _TileValue {
        return this._value;
    }

    get is_pair() : boolean {
        return this._is_pair;
    }
}

module.exports = {
    Pair: _Pair
}