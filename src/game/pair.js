//import {Tile, TileType, TileValue} from '../src/tile';

let Tile = require('./tile').Tile;
let TileType = require('./tile').TileType;
let TileValue = require('./tile').TileValue;

/**
 * Class to hold a pair.
 */
class _Pair {

    /**
     * Constructor to construct a pair.
     * 
     * @param {Tile[]} tiles The tiles to construct the pair.
     */
    constructor(tiles) {
        this._tiles = tiles;
        this._type = tiles[0].type;
        this._value = tiles[0].value;
        this._is_pair = tiles[0].number == tiles[1].number && tiles.length == 2;
    }

    /**
     * Getter method for the tiles in the pair.
     * 
     * @returns {Tile[]} The tiles in the pair.
     */
    get tiles() {
        return this._tiles;
    }

    /**
     * Getter method for the type of the tiles in the pair.
     * 
     * @returns {TileType} The type of the tiles in the pair.
     */
    get type() {
        return this._type;
    }

    /**
     * Getter method for the value of the tiles in the pair.
     * 
     * @returns {TileValue} The value of the tiles in the pair.
     */
    get value() {
        return this._value;
    }

    /**
     * Getter method for if the pair is a valid pair.
     * 
     * @returns {boolean} True if the pair is a valid pair, false otherwise.
     */
    get is_pair() {
        return this._is_pair;
    }
}

module.exports = {
    Pair: _Pair
}