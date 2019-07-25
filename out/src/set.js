// import { Tile } from "./tile";
// import { DRAGON_WHITE } from "./constants";
// import { Player } from "./player";
// import { Hand } from "./hand";
let Tile = require('./tile').Tile;
let _DRAGON_WHITE = require('./constants').DRAGON_WHITE;
let Player = require('./player').Player;
let Hand = require('./hand').Hand;
class _TileSet {
    constructor() {
        this._set = this.ConstructSet();
    }
    get set() {
        return this._set;
    }
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
    ShuffleTiles(tiles) {
        for (let i = tiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }
    FirstTile() {
        return this._set.splice(0, 1)[0];
    }
    DealHands(players) {
        console.log("Dealing Hands.");
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
    DealTile(player) {
        player.drawnTile = this.FirstTile();
    }
}
module.exports = {
    TileSet: _TileSet
};
