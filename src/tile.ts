// import * as CONST from '../src/constants';

let CONST = require('./constants');

class _Tile {
    private _number : number;
    private _type : _TileType;
    private _value : _TileValue;
    private _unicode : string;

    constructor(num : number){
        this._number = num;
        this._type = this.getType(num);
        this._value = this.getValue(num);
        this._unicode = this.getUnicode(num);
    }

    get number() : number {
        return this._number;
    }

    get type() : _TileType {
        return this._type;
    }

    get value() : _TileValue {
        return this._value;
    }

    get unicode() : string {
        return this._unicode;
    }

    getType(num : number) : _TileType {
        if(num <= 8) {
            return TileType.PIN;
        }
        else if(num <= 17) {
            return TileType.SOU;
        }
        else if(num <= 26) {
            return TileType.WAN;
        }
        else if(num <= 30) {
            return TileType.WIND;
        }
        else if(num <= 33) {
            return TileType.DRAGON;
        }
    }

    getValue(num : number) : _TileValue {
        if(CONST.ONES.indexOf(num) > -1){
            return _TileValue.ONE;
        }
        else if(CONST.TWOS.indexOf(num) > -1){
            return _TileValue.TWO;
        }
        else if(CONST.THREES.indexOf(num) > -1){
            return _TileValue.THREE;
        }
        else if(CONST.FOURS.indexOf(num) > -1){
            return _TileValue.FOUR;
        }
        else if(CONST.FIVES.indexOf(num) > -1){
            return _TileValue.FIVE;
        }
        else if(CONST.SIXES.indexOf(num) > -1){
            return _TileValue.SIX;
        }
        else if(CONST.SEVENS.indexOf(num) > -1){
            return _TileValue.SEVEN;
        }
        else if(CONST.EIGHTS.indexOf(num) > -1){
            return _TileValue.EIGHT;
        }
        else if(CONST.NINES.indexOf(num) > -1){
            return _TileValue.NINE;
        }
        else if(num == CONST.EAST){
            return _TileValue.EAST;
        }
        else if(num == CONST.SOUTH){
            return _TileValue.SOUTH;
        }
        else if(num == CONST.WEST){
            return _TileValue.WEST;
        }
        else if(num == CONST.NORTH){
            return _TileValue.NORTH;
        }
        else if(num == CONST.DRAGON_GREEN){
            return _TileValue.GREEN;
        }
        else if(num == CONST.DRAGON_RED){
            return _TileValue.RED;
        }
        else if(num == CONST.DRAGON_WHITE){
            return _TileValue.WHITE;
        }
    }

    getUnicode(num : number) : string {
        switch(num) {
            case 0: return '\u{0001F019}';
            case 1: return '\u{0001F01A}';
            case 2: return '\u{0001F01B}';
            case 3: return '\u{0001F01C}';
            case 4: return '\u{0001F01D}';
            case 5: return '\u{0001F01E}';
            case 6: return '\u{0001F01F}';
            case 7: return '\u{0001F020}';
            case 8: return '\u{0001F021}';
            case 9: return '\u{0001F010}';
            case 10: return '\u{0001F011}';
            case 11: return '\u{0001F012}';
            case 12: return '\u{0001F013}';
            case 13: return '\u{0001F014}';
            case 14: return '\u{0001F015}';
            case 15: return '\u{0001F016}';
            case 16: return '\u{0001F017}';
            case 17: return '\u{0001F018}';
            case 18: return '\u{0001F007}';
            case 19: return '\u{0001F008}';
            case 20: return '\u{0001F009}';
            case 21: return '\u{0001F00A}';
            case 22: return '\u{0001F00B}';
            case 23: return '\u{0001F00C}';
            case 24: return '\u{0001F00D}';
            case 25: return '\u{0001F00E}';
            case 26: return '\u{0001F00F}';
            case 27: return '\u{0001F000}';
            case 28: return '\u{0001F001}';
            case 29: return '\u{0001F002}';
            case 30: return '\u{0001F003}';
            case 31: return '\u{0001F005}';
            case 32: return '\u{0001F004}';
            case 33: return '\u{0001F006}';
        }
    }
}

function _CompareTiles(tile1 : _Tile, tile2 : _Tile) : number {
    if(tile1.number < tile2.number) return -1;
    if(tile1.number > tile2.number) return 1;
    return 0;
}

function _CopyTileList(tiles : _Tile[]) : _Tile[] {
    let copy : _Tile[] = [];
    for(let tile of tiles){
        copy.push(new Tile(tile.number));
    }
    return copy;
}

function _PrintTileList(tiles : _Tile[], drawnTile : _Tile = null) {
    let unicodes : string = '';
    for(let tile of tiles) {
        unicodes += tile.unicode;
    }
    if(drawnTile){
        unicodes += " " + drawnTile.unicode;
    }
    console.log(unicodes);
}

function _TileListCount(tiles : _Tile[], tileToCount : _Tile) : number {
    let count : number = 0;
    for(let tile of tiles){
        if(tile.number == tileToCount.number){
            count++;
        }
    }
    return count;
}

function _IndexTileList(tiles : _Tile[], tileToMatch : _Tile) : number {
    for(let i : number = 0; i < tiles.length; i++){
        if(tiles[i].number == tileToMatch.number){
            return i;
        }
    }
    return -1;
}

function _TileList(str : string) : _Tile[] {
    let tiles : _Tile[] = [];
    while(str != ''){
        switch(str[0]) {
            case 'p': {
                str = str.substr(1);
                while('0123456789'.indexOf(str[0]) > -1){
                    tiles.push(new Tile(-1 + parseInt(str[0])));
                    str = str.substr(1);
                }
                break;
            }
            case 's': {
                str = str.substr(1);
                while('0123456789'.indexOf(str[0]) > -1){
                    tiles.push(new Tile(8 + parseInt(str[0])));
                    str = str.substr(1);
                }
                break;
            }
            case 'a': {
                str = str.substr(1);
                while('0123456789'.indexOf(str[0]) > -1){
                    tiles.push(new Tile(17 + parseInt(str[0])));
                    str = str.substr(1);
                }
                break;
            }
            case 'N': {
                tiles.push(new Tile(30));
                str = str.substr(1);
                break;
            }
            case 'E': {
                tiles.push(new Tile(27));
                str = str.substr(1);
                break;
            }
            case 'S': {
                tiles.push(new Tile(28));
                str = str.substr(1);
                break;
            }
            case 'W': {
                tiles.push(new Tile(29));
                str = str.substr(1);
                break;
            }
            case 'g': {
                tiles.push(new Tile(31));
                str = str.substr(1);
                break;
            }
            case 'r': {
                tiles.push(new Tile(32));
                str = str.substr(1);
                break;
            }
            case 'w': {
                tiles.push(new Tile(33));
                str = str.substr(1);
                break;
            }
            default: return [];
        }
    }
    return tiles;
}

function _TileListContains(tileList : _Tile[], tileToMatch : _Tile) : boolean {
    for(let tile of tileList){
        if(tile.number == tileToMatch.number){
            return true;
        }
    }
    return false;
}

function _TileListEqual(a : _Tile[], b : _Tile[]) : boolean {
    if(a.length != b.length) return false;
    let equal : boolean = true;
    for(let i : number = 0; i < a.length; i++){
        if(a[i].number != b[i].number){
            return false;
        }
    }
    return equal;
}

function _RemoveFromTileList(tiles : _Tile[], tileToRemove : _Tile) : _Tile[] {
    let tileNumbers : number[] = [];
    for(let tile of tiles){
        tileNumbers.push(tile.number);
    }
    tiles.splice(tileNumbers.indexOf(tileToRemove.number), 1);
    return tiles;
}

function _TileListToString(tiles : _Tile[]) : String {
    let string = "";
    for(let tile of tiles){
        string += tile.unicode;
    }
    return string;
}

enum _TileType {
    PIN,
    SOU,
    WAN,
    WIND,
    DRAGON
}

enum _TileValue {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    EAST,
    SOUTH,
    WEST,
    NORTH,
    GREEN,
    RED,
    WHITE
}

module.exports = {
    Tile: _Tile,
    CompareTiles: _CompareTiles,
    CopyTileList: _CopyTileList,
    PrintTileList: _PrintTileList,
    TileListCount: _TileListCount,
    IndexTileList: _IndexTileList,
    TileList: _TileList,
    TileListContains: _TileListContains,
    TileListEqual: _TileListEqual,
    RemoveFromTileList: _RemoveFromTileList,
    TileType: _TileType,
    TileValue: _TileValue,
    TileListToString: _TileListToString
}