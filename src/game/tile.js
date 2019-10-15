// import * as CONST from '../src/constants';

let CONST = require('./constants');

/**
 * Class to hold tile information.
 */
class Tile {

    /**
     * Tile constructor.
     * 
     * @param {number} number The number of the tile to indicate its value.
     */
    constructor(number){
        this._number = number;
        this._type = this.getType(number);
        this._value = this.getValue(number);
        this._unicode = this.getUnicode(number);
    }

    /**
     * Getter method for the tile number.
     * 
     * @returns {number} The number value for the tile.
     */
    get number() {
        return this._number;
    }

    /**
     * Getter method for the tile type.
     * 
     * @returns {TileType} The type of the tile.
     */
    get type() {
        return this._type;
    }

    /**
     * Getter method for the tile value.
     * 
     * @returns {TileValue} The value of the tile.
     */
    get value() {
        return this._value;
    }

    /**
     * Getter method for the unicode value of the tile.
     * 
     * @returns {string} The unicode character for the tile.
     */
    get unicode() {
        return this._unicode;
    }

    /**
     * Sets the type of the tile.
     * 
     * @param {number} num The number of tile to get the type of.
     * @returns {TileType} The type of the tile.
     */
    getType(num) {
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

    /**
     * Sets the value of the tile.
     * 
     * @param {number} num The number of the tile to get the value of.
     * @returns {TileValue} The value of the tile.
     */
    getValue(num) {
        if(CONST.ONES.indexOf(num) > -1){
            return TileValue.ONE;
        }
        else if(CONST.TWOS.indexOf(num) > -1){
            return TileValue.TWO;
        }
        else if(CONST.THREES.indexOf(num) > -1){
            return TileValue.THREE;
        }
        else if(CONST.FOURS.indexOf(num) > -1){
            return TileValue.FOUR;
        }
        else if(CONST.FIVES.indexOf(num) > -1){
            return TileValue.FIVE;
        }
        else if(CONST.SIXES.indexOf(num) > -1){
            return TileValue.SIX;
        }
        else if(CONST.SEVENS.indexOf(num) > -1){
            return TileValue.SEVEN;
        }
        else if(CONST.EIGHTS.indexOf(num) > -1){
            return TileValue.EIGHT;
        }
        else if(CONST.NINES.indexOf(num) > -1){
            return TileValue.NINE;
        }
        else if(num == CONST.EAST){
            return TileValue.EAST;
        }
        else if(num == CONST.SOUTH){
            return TileValue.SOUTH;
        }
        else if(num == CONST.WEST){
            return TileValue.WEST;
        }
        else if(num == CONST.NORTH){
            return TileValue.NORTH;
        }
        else if(num == CONST.DRAGON_GREEN){
            return TileValue.GREEN;
        }
        else if(num == CONST.DRAGON_RED){
            return TileValue.RED;
        }
        else if(num == CONST.DRAGON_WHITE){
            return TileValue.WHITE;
        }
    }

    /**
     * Sets the unicode value of the tile.
     * 
     * @param {number} num The number of the tile to get the unicode for.
     * @returns {string} The unicode character of the tile.
     */
    getUnicode(num) {
        return num; 
        //Doesn't work for console output.
        switch(num) {
            case 0: return String.fromCodePoint(0x1F019);
            case 1: return String.fromCodePoint(0x1F01A);
            case 2: return String.fromCodePoint(0x1F01B);
            case 3: return String.fromCodePoint(0x1F01C);
            case 4: return String.fromCodePoint(0x1F01D);
            case 5: return String.fromCodePoint(0x1F01E);
            case 6: return String.fromCodePoint(0x1F01F);
            case 7: return String.fromCodePoint(0x1F020);
            case 8: return String.fromCodePoint(0x1F021);
            case 9: return String.fromCodePoint(0x1F010);
            case 10: return String.fromCodePoint(0x1F011);
            case 11: return String.fromCodePoint(0x1F012);
            case 12: return String.fromCodePoint(0x1F013);
            case 13: return String.fromCodePoint(0x1F014);
            case 14: return String.fromCodePoint(0x1F015);
            case 15: return String.fromCodePoint(0x1F016);
            case 16: return String.fromCodePoint(0x1F017);
            case 17: return String.fromCodePoint(0x1F018);
            case 18: return String.fromCodePoint(0x1F007);
            case 19: return String.fromCodePoint(0x1F008);
            case 20: return String.fromCodePoint(0x1F009);
            case 21: return String.fromCodePoint(0x1F00A);
            case 22: return String.fromCodePoint(0x1F00B);
            case 23: return String.fromCodePoint(0x1F00C);
            case 24: return String.fromCodePoint(0x1F00D);
            case 25: return String.fromCodePoint(0x1F00E);
            case 26: return String.fromCodePoint(0x1F00F);
            case 27: return String.fromCodePoint(0x1F000);
            case 28: return String.fromCodePoint(0x1F001);
            case 29: return String.fromCodePoint(0x1F002);
            case 30: return String.fromCodePoint(0x1F003);
            case 31: return String.fromCodePoint(0x1F005);
            case 32: return String.fromCodePoint(0x1F004);
            case 33: return String.fromCodePoint(0x1F006);
        }
    }
}

/**
 * Compares two tiles. Used for sorting a list of tiles.
 * 
 * @param {Tile} tile1 The first tile to compare.
 * @param {Tile} tile2 The second tile to compare.
 * @returns {number} -1 if tile1 < tile2. 1 if tile1 > tile2.
 */
function CompareTiles(tile1, tile2) {
    if(tile1.number < tile2.number) return -1;
    if(tile1.number > tile2.number) return 1;
    return 0;
}

/**
 * Copies a tile list into a new list.
 * 
 * @param {Tile[]} tiles The list of tiles to copy.
 * @returns {Tile[]} The new list with all of the same tiles.
 */
function CopyTileList(tiles) {
    let copy = [];
    for(let tile of tiles){
        copy.push(new Tile(tile.number));
    }
    return copy;
}

/**
 * Prints a list of tiles on the same row.
 * 
 * @param {Tile[]} tiles The list of tiles to print.
 * @param {Tile} drawnTile Optional parameter to print an extra tile after the list of tiles.
 */
function PrintTileList(tiles, drawnTile = null) {
    let unicodes = '';
    for(let tile of tiles) {
        unicodes += tile.unicode;
        unicodes += '|';
    }
    if(drawnTile){
        unicodes += " " + drawnTile.unicode;
    }
    console.log(unicodes);
}

/**
 * Counts the amount of a certain tile in a list of tiles.
 * 
 * @param {Tile[]} tiles The list of tiles to search.
 * @param {*} tileToCount The tile to count.
 * @returns {number} The amount of the certain tile in the list.
 */
function TileListCount(tiles, tileToCount) {
    let count = 0;
    for(let tile of tiles){
        if(tile.number == tileToCount.number){
            count++;
        }
    }
    return count;
}

/**
 * Finds the index of a tile in a tile list.
 * 
 * @param {Tile[]} tiles The list of tiles to search.
 * @param {*} tileToMatch The tile to search for.
 * @returns {number} The first location of the given tile or -1 if not found.
 */
function IndexTileList(tiles, tileToMatch) {
    for(let i = 0; i < tiles.length; i++){
        if(tiles[i].number == tileToMatch.number){
            return i;
        }
    }
    return -1;
}

/**
 * Creates a list of tiles from a string. Used for easier testing.
 * 
 * 'p123456789' = All pin(dot) tiles
 * 
 * 's123456789' = All sou(bamboo) tiles
 * 
 * 'a123456789' = All wan(number) tiles
 * 
 * 'NESW' = Winds
 * 
 * 'grw' = Dragons
 * 
 * @param {string} str The string to represent a list of tiles.
 * @returns {Tile[]} The list of tiles represented by the string.
 */
function TileList(str) {
    let tiles = [];
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

/**
 * Checks if a tile is within a list of tiles.
 * 
 * @param {Tile[]} tileList The list of tiles to search.
 * @param {Tile} tileToMatch The tile to search for.
 * @returns {boolean} True if the tile is in the list, false otherwise.
 */
function TileListContains(tileList, tileToMatch) {
    for(let tile of tileList){
        if(tile.number == tileToMatch.number){
            return true;
        }
    }
    return false;
}

/**
 * Checks if two lists of tiles are equal.
 * Lists must be sorted.
 * 
 * @param {Tile[]} list1 The first tile list to compare.
 * @param {Tile[]} list2 The second tile list to compare.
 * @returns {boolean} True if the lists are equal, false otherwise.
 */
function TileListEqual(list1, list2) {
    if(list1.length != list2.length) return false;
    let equal = true;
    for(let i = 0; i < list1.length; i++){
        if(list1[i].number != list2[i].number){
            return false;
        }
    }
    return equal;
}

/**
 * Removes a tile from a list of tiles.
 * 
 * @param {Tile[]} tiles List of tiles to remove from.
 * @param {Tile} tileToRemove The tile to remove.
 * @returns {Tile[]} The list of tiles without the tile specified.
 */
function RemoveFromTileList(tiles, tileToRemove) {
    let tileNumbers = [];
    for(let tile of tiles){
        tileNumbers.push(tile.number);
    }
    let index = tileNumbers.indexOf(tileToRemove.number);
    if(index >= 0) tiles.splice(tileNumbers.indexOf(tileToRemove.number), 1);
    return tiles;
}

/**
 * Converts a list of tiles into its unicode equivalent.
 * 
 * @param {Tile[]} tiles The list of tiles to convert.
 * @returns {string} The list converted to unicode characters.
 */
function TileListToString(tiles) {
    let string = "";
    for(let tile of tiles){
        string += tile.unicode;
    }
    return string;
}

/**
 * Converts a list of tiles into a list of unique tiles in the list.
 * 
 * @param {Tile[]} tiles The list of tiles to convert.
 * @returns {Tile[]} The list of unique tiles.
 */
function TileListRemoveDuplicates(tiles) {
    let uniqueTiles = [];
    for(let tile of tiles){
        if(uniqueTiles.map((t) => t.number).indexOf(tile.number) < 0){
            uniqueTiles.push(new Tile(tile.number));
        }
    }
    return uniqueTiles;
}

/**
 * Checks if a list of tiles contains another list of tiles.
 * 
 * @param {*} tiles1 
 * @param {*} tiles2 
 */
function TileListContainsList(tiles1, tiles2) {

}

/**
 * The types a tile can take on.
 */
let TileType = {
    PIN: 0,
    SOU: 1,
    WAN: 2,
    WIND: 3,
    DRAGON: 4
}

/**
 * The values a tile can take on.
 */
let TileValue = {
    ONE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4,
    SIX: 5,
    SEVEN: 6,
    EIGHT: 7,
    NINE: 8,
    EAST: 9,
    SOUTH: 10,
    WEST: 11,
    NORTH: 12,
    GREEN: 13,
    RED: 14,
    WHITE: 15
}

module.exports = {
    Tile: Tile,
    CompareTiles: CompareTiles,
    CopyTileList: CopyTileList,
    PrintTileList: PrintTileList,
    TileListCount: TileListCount,
    IndexTileList: IndexTileList,
    TileList: TileList,
    TileListContains: TileListContains,
    TileListEqual: TileListEqual,
    RemoveFromTileList: RemoveFromTileList,
    TileType: TileType,
    TileValue: TileValue,
    TileListToString: TileListToString,
    TileListRemoveDuplicates: TileListRemoveDuplicates
}