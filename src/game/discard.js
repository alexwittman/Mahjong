let Tile = require('./tile').Tile;


/**
 * Class to keep track of discards.
 */
class Discard {

    /**
     * Constructs a discard given a tile and a player index.
     * 
     * @param {Tile} tile The tile that was discarded.
     * @param {number} playerindex The index of the player who discarded the tile.
     */
    constructor(tile, playerIndex) {
        this._tile = tile;
        this._playerIndex = playerIndex;
    }

    /**
     * Getter method for the discard's tile.
     * 
     * @returns {Tile} The discard's tile.
     */
    get tile() {
        return this._tile;
    }

    /**
     * Getter method for the discard's player index.
     * 
     * @returns {number} The player who discarded the tile.
     */
    get playerIndex() {
        return this._playerIndex;
    }

}

module.exports = {
    Discard: Discard
}