//import { Tile, TileType, TileValue } from '../src/tile';

let Tile = require('./tile').Tile;
let TileType = require('./tile').TileType;
let TileValue = require('./tile').TileValue;

/**
 * Class to hold meld information.
 */
class Meld {

    /**
     * Meld constructor when a player declares a meld.
     * 
     * @param {Tile[]} tiles The tiles that make up the meld.
     * @param {boolean} is_open Whether the meld is open or not. Default: false.
     */
    constructor(tiles, is_open = false) {
        this._tiles = tiles;
        this._is_open = is_open;
        this._type = this.getType(tiles);
    }

    /**
     * Getter method for the meld's tiles.
     * 
     * @returns {Tile[]} The meld's tiles.
     */
    get tiles() {
        return this._tiles;
    }

    /**
     * Getter method for the meld's type.
     * 
     * @returns {MeldType} The type of the meld.
     */
    get type() {
        return this._type;
    }

    /**
     * Getter method for if the meld is open or not.
     * 
     * @returns {boolean} True if the meld is open, false otherwise.
     */
    get is_open() {
        return this._is_open;
    }

    /**
     * Getter method for how many tiles are in the meld.
     * 
     * @returns {number} The number of tiles in the meld.
     */
    get length() {
        return this._tiles.length;
    }

    /**
     * Sets the type of the meld. Types: None, Chow, Pong, Kong.
     * 
     * @param {Tile[]} tiles The tiles in the meld.
     * @returns {MeldType} The type of the meld.
     */
    getType(tiles) {
        if (this.AreSameType(tiles)) {
            if (tiles.length == 3) {
                if (this.isPong(tiles)) {
                    return MeldType.PONG;
                } else if (this.isChow(tiles)) {
                    return MeldType.CHOW;
                } else {
                    return MeldType.NONE;
                }
            } else if (tiles.length == 4) {
                if (this.isKong(tiles)) {
                    return MeldType.KONG;
                } else {
                    return MeldType.NONE;
                }
            } else {
                return MeldType.NONE;
            }
        } else {
            return MeldType.NONE
        }
    }

    /**
     * Checks whether a list of tiles are the same type.
     * 
     * @param {Tile[]} tiles The tiles to check the type of.
     * @returns {boolean} True if all tiles are the same type, false otherwise.
     */
    AreSameType(tiles) {
        const type = tiles[0].type;
        for (let tile of tiles) {
            if (tile.type != type) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks whether a list of tiles are a pong.
     * 
     * @param {Tile[]} tiles The list of tiles to check.
     * @returns {boolean} True if the tiles form a pong, false otherwise.
     */
    isPong(tiles) {
        const value = tiles[0].value;
        for (let tile of tiles) {
            if (tile.value != value) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks whether a list of tiles are a chow.
     * 
     * @param {Tile[]} tiles The list of tiles to check.
     * @returns {boolean} True if the tiles form a chow, false otherwise.
     */
    isChow(tiles) {
        const type = tiles[0].type;
        const StartValue = tiles[0].value;
        if (type == TileType.DRAGON || type == TileType.WIND) {
            return false;
        } else {
            if (tiles[1].value == StartValue + 1 && tiles[2].value == StartValue + 2) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * Checks whether a list of tiles are a kong.
     * 
     * @param {Tile[]} tiles The list of tiles to check.
     * @returns {boolean} True if the tiles form a kong, false otherwise.
     */
    isKong(tiles) {
        const value = tiles[0].value;
        for (let tile of tiles) {
            if (tile.value != value) {
                return false;
            }
        }
        return true;
    }
}

/**
 * The types a meld can be.
 */
let MeldType = {
    PONG: 0,
    KONG: 1,
    CHOW: 2,
    NONE: 3
}

module.exports = {
    Meld: Meld,
    MeldType: MeldType
}