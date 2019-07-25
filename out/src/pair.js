//import {Tile, TileType, TileValue} from '../src/tile';
//let Tile = require('./tile').Tile;
//let TileType = require('./tile').TileType;
let TileValue = require('./tile').TileValue;
class _Pair {
    constructor(tiles) {
        this._tiles = tiles;
        this._type = tiles[0].type;
        this._value = tiles[0].value;
        this._is_pair = tiles[0].number == tiles[1].number && tiles.length == 2;
    }
    get tiles() {
        return this._tiles;
    }
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
    get is_pair() {
        return this._is_pair;
    }
}
module.exports = {
    Pair: _Pair
};
