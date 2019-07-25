//import { Tile, TileType, TileValue } from '../src/tile';
// let Tile = require('./tile').Tile;
// let TileType = require('./tile').TileType;
// let TileValue = require('./tile').TileValue;
class _Meld {
    constructor(tiles, is_open = false) {
        this._tiles = tiles;
        this._is_open = is_open;
        this._type = this.getType(tiles);
    }
    get tiles() {
        return this._tiles;
    }
    get type() {
        return this._type;
    }
    get is_open() {
        return this._is_open;
    }
    get length() {
        return this._tiles.length;
    }
    getType(tiles) {
        if (this.AreSameType(tiles)) {
            if (tiles.length == 3) {
                if (this.isPong(tiles)) {
                    return MeldType.PONG;
                }
                else if (this.isChow(tiles)) {
                    return MeldType.CHOW;
                }
                else {
                    return MeldType.NONE;
                }
            }
            else if (tiles.length == 4) {
                if (this.isKong(tiles)) {
                    return MeldType.KONG;
                }
                else {
                    return MeldType.NONE;
                }
            }
            else {
                return MeldType.NONE;
            }
        }
        else {
            return MeldType.NONE;
        }
    }
    AreSameType(tiles) {
        const type = tiles[0].type;
        for (let tile of tiles) {
            if (tile.type != type) {
                return false;
            }
        }
        return true;
    }
    isPong(tiles) {
        const value = tiles[0].value;
        for (let tile of tiles) {
            if (tile.value != value) {
                return false;
            }
        }
        return true;
    }
    isChow(tiles) {
        const type = tiles[0].type;
        const StartValue = tiles[0].value;
        if (type == TileType.DRAGON || type == TileType.WIND) {
            return false;
        }
        else {
            if (tiles[1].value == StartValue + 1 && tiles[2].value == StartValue + 2) {
                return true;
            }
            else {
                return false;
            }
        }
    }
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
var _MeldType;
(function (_MeldType) {
    _MeldType[_MeldType["PONG"] = 0] = "PONG";
    _MeldType[_MeldType["KONG"] = 1] = "KONG";
    _MeldType[_MeldType["CHOW"] = 2] = "CHOW";
    _MeldType[_MeldType["NONE"] = 3] = "NONE";
})(_MeldType || (_MeldType = {}));
module.exports = {
    Meld: _Meld,
    MeldType: _MeldType
};
