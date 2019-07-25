// import * as CONST from '../src/constants';
let CONST = require('./constants');
class _Tile {
    constructor(num) {
        this._number = num;
        this._type = this.getType(num);
        this._value = this.getValue(num);
        this._unicode = this.getUnicode(num);
    }
    get number() {
        return this._number;
    }
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
    get unicode() {
        return this._unicode;
    }
    getType(num) {
        if (num <= 8) {
            return _TileType.PIN;
        }
        else if (num <= 17) {
            return _TileType.SOU;
        }
        else if (num <= 26) {
            return _TileType.WAN;
        }
        else if (num <= 30) {
            return _TileType.WIND;
        }
        else if (num <= 33) {
            return _TileType.DRAGON;
        }
    }
    getValue(num) {
        if (CONST.ONES.indexOf(num) > -1) {
            return _TileValue.ONE;
        }
        else if (CONST.TWOS.indexOf(num) > -1) {
            return _TileValue.TWO;
        }
        else if (CONST.THREES.indexOf(num) > -1) {
            return _TileValue.THREE;
        }
        else if (CONST.FOURS.indexOf(num) > -1) {
            return _TileValue.FOUR;
        }
        else if (CONST.FIVES.indexOf(num) > -1) {
            return _TileValue.FIVE;
        }
        else if (CONST.SIXES.indexOf(num) > -1) {
            return _TileValue.SIX;
        }
        else if (CONST.SEVENS.indexOf(num) > -1) {
            return _TileValue.SEVEN;
        }
        else if (CONST.EIGHTS.indexOf(num) > -1) {
            return _TileValue.EIGHT;
        }
        else if (CONST.NINES.indexOf(num) > -1) {
            return _TileValue.NINE;
        }
        else if (num == CONST.EAST) {
            return _TileValue.EAST;
        }
        else if (num == CONST.SOUTH) {
            return _TileValue.SOUTH;
        }
        else if (num == CONST.WEST) {
            return _TileValue.WEST;
        }
        else if (num == CONST.NORTH) {
            return _TileValue.NORTH;
        }
        else if (num == CONST.DRAGON_GREEN) {
            return _TileValue.GREEN;
        }
        else if (num == CONST.DRAGON_RED) {
            return _TileValue.RED;
        }
        else if (num == CONST.DRAGON_WHITE) {
            return _TileValue.WHITE;
        }
    }
    getUnicode(num) {
        switch (num) {
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
function _CompareTiles(tile1, tile2) {
    if (tile1.number < tile2.number)
        return -1;
    if (tile1.number > tile2.number)
        return 1;
    return 0;
}
function _CopyTileList(tiles) {
    let copy = [];
    for (let tile of tiles) {
        copy.push(new Tile(tile.number));
    }
    return copy;
}
function _PrintTileList(tiles, drawnTile = null) {
    let unicodes = '';
    for (let tile of tiles) {
        unicodes += tile.unicode;
    }
    if (drawnTile) {
        unicodes += " " + drawnTile.unicode;
    }
    console.log(unicodes);
}
function _TileListCount(tiles, tileToCount) {
    let count = 0;
    for (let tile of tiles) {
        if (tile.number == tileToCount.number) {
            count++;
        }
    }
    return count;
}
function _IndexTileList(tiles, tileToMatch) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].number == tileToMatch.number) {
            return i;
        }
    }
    return -1;
}
function _TileList(str) {
    let tiles = [];
    while (str != '') {
        switch (str[0]) {
            case 'p': {
                str = str.substr(1);
                while ('0123456789'.indexOf(str[0]) > -1) {
                    tiles.push(new Tile(-1 + parseInt(str[0])));
                    str = str.substr(1);
                }
                break;
            }
            case 's': {
                str = str.substr(1);
                while ('0123456789'.indexOf(str[0]) > -1) {
                    tiles.push(new Tile(8 + parseInt(str[0])));
                    str = str.substr(1);
                }
                break;
            }
            case 'a': {
                str = str.substr(1);
                while ('0123456789'.indexOf(str[0]) > -1) {
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
function _TileListContains(tileList, tileToMatch) {
    for (let tile of tileList) {
        if (tile.number == tileToMatch.number) {
            return true;
        }
    }
    return false;
}
function _TileListEqual(a, b) {
    if (a.length != b.length)
        return false;
    let equal = true;
    for (let i = 0; i < a.length; i++) {
        if (a[i].number != b[i].number) {
            return false;
        }
    }
    return equal;
}
function _RemoveFromTileList(tiles, tileToRemove) {
    let tileNumbers = [];
    for (let tile of tiles) {
        tileNumbers.push(tile.number);
    }
    tiles.splice(tileNumbers.indexOf(tileToRemove.number), 1);
    return tiles;
}
function _TileListToString(tiles) {
    let string = "";
    for (let tile of tiles) {
        string += tile.unicode;
    }
    return string;
}
var _TileType;
(function (_TileType) {
    _TileType[_TileType["PIN"] = 0] = "PIN";
    _TileType[_TileType["SOU"] = 1] = "SOU";
    _TileType[_TileType["WAN"] = 2] = "WAN";
    _TileType[_TileType["WIND"] = 3] = "WIND";
    _TileType[_TileType["DRAGON"] = 4] = "DRAGON";
})(_TileType || (_TileType = {}));
var _TileValue;
(function (_TileValue) {
    _TileValue[_TileValue["ONE"] = 0] = "ONE";
    _TileValue[_TileValue["TWO"] = 1] = "TWO";
    _TileValue[_TileValue["THREE"] = 2] = "THREE";
    _TileValue[_TileValue["FOUR"] = 3] = "FOUR";
    _TileValue[_TileValue["FIVE"] = 4] = "FIVE";
    _TileValue[_TileValue["SIX"] = 5] = "SIX";
    _TileValue[_TileValue["SEVEN"] = 6] = "SEVEN";
    _TileValue[_TileValue["EIGHT"] = 7] = "EIGHT";
    _TileValue[_TileValue["NINE"] = 8] = "NINE";
    _TileValue[_TileValue["EAST"] = 9] = "EAST";
    _TileValue[_TileValue["SOUTH"] = 10] = "SOUTH";
    _TileValue[_TileValue["WEST"] = 11] = "WEST";
    _TileValue[_TileValue["NORTH"] = 12] = "NORTH";
    _TileValue[_TileValue["GREEN"] = 13] = "GREEN";
    _TileValue[_TileValue["RED"] = 14] = "RED";
    _TileValue[_TileValue["WHITE"] = 15] = "WHITE";
})(_TileValue || (_TileValue = {}));
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
};
