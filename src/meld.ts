//import { Tile, TileType, TileValue } from '../src/tile';

// let Tile = require('./tile').Tile;
// let TileType = require('./tile').TileType;
// let TileValue = require('./tile').TileValue;

class _Meld {
    private _tiles : _Tile[];
    private _type : _MeldType;
    private _is_open : boolean;
    
    constructor(tiles: _Tile[], is_open : boolean = false) {
        this._tiles = tiles;
        this._is_open = is_open;
        this._type = this.getType(tiles);
    }

    get tiles() : _Tile[] {
        return this._tiles;
    }

    get type() : _MeldType {
        return this._type;
    }

    get is_open() : boolean {
        return this._is_open;
    }

    get length() : number {
        return this._tiles.length;
    }

    getType(tiles : _Tile[]) : _MeldType {
        if(this.AreSameType(tiles)) {
            if(tiles.length == 3) {
                if(this.isPong(tiles)) {
                    return MeldType.PONG;
                }
                else if(this.isChow(tiles)) {
                    return MeldType.CHOW;
                }
                else{
                    return MeldType.NONE;
                }
            }
            else if(tiles.length == 4) {
                if(this.isKong(tiles)){
                    return MeldType.KONG;
                }
                else{
                    return MeldType.NONE;
                }
            }
            else{
                return MeldType.NONE;
            }
        }
        else {
            return MeldType.NONE
        }
    }

    AreSameType(tiles : _Tile[]) : boolean {
        const type = tiles[0].type;
        for(let tile of tiles) {
            if(tile.type != type)
            {
                return false;
            }
        }
        return true;
    }

    isPong(tiles : _Tile[]) : boolean {
        const value = tiles[0].value;
        for(let tile of tiles) {
            if(tile.value != value)
            {
                return false;
            }
        }
        return true;
    }

    isChow(tiles : _Tile[]) : boolean {
        const type : _TileType = tiles[0].type;
        const StartValue : number = tiles[0].value;
        if(type == TileType.DRAGON || type == TileType.WIND){
            return false;
        }
        else{
            if(tiles[1].value == StartValue + 1 && tiles[2].value == StartValue + 2){
                return true;
            }
            else{
                return false;
            }
        }
    }

    isKong(tiles : _Tile[]) : boolean {
        const value = tiles[0].value;
        for(let tile of tiles) {
            if(tile.value != value)
            {
                return false;
            }
        }
        return true;
    }
}

enum _MeldType {
    PONG,
    KONG,
    CHOW,
    NONE
}

module.exports = {
    Meld: _Meld,
    MeldType: _MeldType
}