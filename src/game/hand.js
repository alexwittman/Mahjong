// import {Tile, CompareTiles} from "../src/tile";
// import {Meld} from "../src/meld";

let Tile = require('./tile').Tile;
let CompareTiles = require('./tile').CompareTiles;
let IndexTileList = require('./tile').IndexTileList;
let Meld = require('./meld').Meld;
let CopyTileList = require('./tile').CopyTileList;
let PrintTileList = require('./tile').PrintTileList;
let Pair = require('./pair').Pair;

/**
 * Class to hold information of a hand.
 */
class Hand{
    
    /**
     * Getter method for the hand's tiles.
     * 
     * @returns {Tile[]} The hand's tiles.
     */
    get tiles() {
        return this._tiles;
    }
    
    /**
     * Getter method for the hand's closed tiles.
     * 
     * @returns {Tile[]} The hand's closed tiles.
     */
    get closedTiles() {
        return this._closedTiles;
    }

    /**
     * Getter method for the hand's open tiles.
     * 
     * @returns {Tile[]} The hand's open tiles.
     */
    get openTiles() {
        return this._openTiles;
    }

    /**
     * Getter method for the hand's melds.
     * 
     * @returns {Meld[]} The hand's melds.
     */
    get melds() {
        return this._melds;
    }

    /**
     * Getter method for the amount of tiles in the hand.
     * 
     * @returns {number} The number of tiles in the hand.
     */
    get length() {
        return this._tiles.length;
    }

    /**
     * Getter method for if the hand is concealed or open.
     * 
     * @returns {boolean} True if the hand is open, false otherwise.
     */
    get isOpen() {
        return this._isOpen;
    }

    /**
     * Setter method for if the hand is concealed or open.
     * 
     * @param {boolean} isOpen Whether or not the hand is open.
     */
    set isOpen(isOpen) {
        this._isOpen = isOpen;
    }

    /**
     * Constructor for a hand.
     * 
     * @param {Tile[]} tiles The tiles to go in the hand.
     * @param {Meld[]} melds The melds in the hand.
     */
    constructor(tiles = [], melds = [], isOpen = false) {
        this._tiles = CopyTileList(tiles);
        this._closedTiles = CopyTileList(tiles);
        this._openTiles = [];
        this._melds = melds;
        for(let meld of melds) {
            this._tiles = this._tiles.concat(CopyTileList(meld.tiles));
            if(meld.is_open){
                this._openTiles.concat(CopyTileList(meld.tiles));
            }
        }
        this._closedTiles.sort(CompareTiles);
        this._openTiles.sort(CompareTiles);
        this._tiles.sort(CompareTiles);
        this._isOpen = isOpen;
    }

    /**
     * Adds a tile to a hand.
     * 
     * @param {Tile} tile The tile to add to the hand.
     */
    add(tile) {
        if(Array.isArray(tile)){
            for(let t of tile){
                this.add(t);
            }
        }
        else{
            this._tiles.push(tile);
            this._closedTiles.push(tile);
            this._tiles.sort(CompareTiles);
            this._closedTiles.sort(CompareTiles);
        }
    }

    /**
     * Removes a tile from a hand.
     * 
     * @param {Tile} tile The tile to remove from the hand.
     * @returns {boolean} True if the tile was removed from the hand, false otherwise.
     */
    remove(tile) {
        if(Array.isArray(tile)){
            for(let t of tile){
                this.remove(t);
            }
        }
        else{
            const allIndex = IndexTileList(this._tiles, tile);
            const closedIndex = IndexTileList(this._closedTiles, tile);
            if(allIndex > -1 && closedIndex > -1) {
                this._tiles.splice(allIndex, 1);
                this._closedTiles.splice(closedIndex, 1);
                return true;
            }
            else {
                return false;
            }
        }
    }

    /**
     * Adds a meld to a hand and removes tiles if necessary.
     * 
     * @param {Meld | Pair} meld The meld to add to the hand.
     */
    makeMeld(meld){
        this.melds.push(meld);
        if(meld instanceof Pair){
            if(meld.is_open) {
                for(let tile of meld.tiles){
                    this._openTiles.push(tile);
                }
                this._openTiles.sort(CompareTiles);
            }
        }
    }

    /**
     * Prints a hand to the console.
     */
    Print() {
        console.log('Hand:');
        PrintTileList(this._closedTiles);
        for(let meld of this._melds){
            PrintTileList(meld.tiles);
        }
    }
}

/**
 * Copies a hand into a new hand.
 * 
 * @param {Hand} handToCopy The hand to copy.
 * @returns {Hand} A copied version of the tile.
 */
function CopyHand(handToCopy) {
    let tiles = CopyTileList(handToCopy.closedTiles);
    let melds = [];
    for(let meld of handToCopy.melds){
        melds.push(new Meld(CopyTileList(meld.tiles)));
    }
    return new Hand(tiles, melds, handToCopy.isOpen);
}

module.exports = {
    Hand: Hand,
    CopyHand: CopyHand
}