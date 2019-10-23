// import { Tile } from "./tile";
// import { DRAGON_WHITE } from "./constants";
// import { Player } from "./player";
// import { Hand } from "./hand";

let Tile = require('./tile').Tile;
let _DRAGON_WHITE = require('./constants').DRAGON_WHITE;
let Player = require('./player').Player;
let Hand = require('./hand').Hand;


/**
 * Class to hold a set of tiles.
 */
class TileSet {

    /**
     * Constructs a tile set of 136 tiles.
     */
    constructor() {
        this._set = this.ConstructSet();
    }

    /**
     * Getter method for retrieving the set.
     * 
     * @returns {Tile[]} The set of all 136 tiles.
     */
    get set() {
        return this._set;
    }

    /**
     * Constructs the set of 136 tiles.
     * 
     * @returns {Tile[]} The set of 136 tiles.
     */
    ConstructSet() {
        let tiles = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < _DRAGON_WHITE; j++) {
                tiles.push(new Tile(j));
            }
        }
        this.ShuffleTiles(tiles);
        return tiles;
    }

    /**
     * Shuffles the list of tiles.
     * 
     * @param {Tile[]} tiles 
     */
    ShuffleTiles(tiles) {

        for (let i = tiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }

    /**
     * Gets the first tile from the set and removes it from the list.
     * 
     * @returns {Tile} The first tile in the set.
     */
    FirstTile() {
        return this._set.splice(0, 1)[0];
    }

    /**
     * Deals 13 tiles to four players.
     * 
     * @param {Player[]} players The list of players to deal tiles to.
     */
    DealHands(players) {
        console.log("Dealing Hands.")
        let TileLists = [];
        for (let i = 0; i < 4; i++) {
            TileLists[i] = [];
        }
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                TileLists[j].push(this.FirstTile());
            }
        }
        for (let i = 0; i < 4; i++) {
            players[i].hand = new Hand(TileLists[i]);
        }
    }

    /**
     * Deals a tile to a player.
     * 
     * @param {Player} player The player to deal the tile to.
     * @returns {boolean} True if a tile was dealt to the player, false otherwise.
     */
    DealTile(player) {
        if (this._set.length > 0) {
            player.drawnTile = this.FirstTile();
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Creates a minimal tile set with each of the 34 different tiles.
 * 
 * @returns {Tile[]} The set of 34 tiles.
 */
let MinimalTileSet = () => {
    let tiles = [];
    for (let j = 0; j <= _DRAGON_WHITE; j++) {
        let tile = new Tile(j);
        console.log(j, tile, tile.unicode);
        tiles.push(tile);
    }
    return tiles;
}

module.exports = {
    TileSet: TileSet,
    MinimalTileSet: MinimalTileSet
}