//import { Game } from "./game";
let Game = require('./game').Game;
let TileSet = require('./set').TileSet;
let Hand = require('./hand').Hand;
let PrintTileList = require('./tile').PrintTileList;
let Tenpai = require('./tenpai').Tenpai;
let AI_Util = require('./ai_util').AI_Util;
let MinimalTileSet = require('./set').MinimalTileSet;
let fs = require('fs');
let performance = require('perf_hooks').performance;
let HandPartition = require('./hand_partition').Hand_Partition;
let Player = require('./player').Player;
let Tile = require('./tile').Tile;

let _main = () => {
    let game = new Game();
    game.StartGame();

    // for(let i = 0; i < 4; i++){
    //     let hand = RandomHand();
    //     PrintTileList(hand.tiles);
    //     console.log((new Tenpai(hand)).isTenpai);
    // }

    //let aiUtil = new AI_Util();
    //PrintTileList(MinimalTileSet());
    // for(let i = 0; i <= 7; i++){
    //     //let combs = aiUtil.TileCombinations(MinimalTileSet(), i);
    //     let combs = aiUtil.TileCombinations([1,2,3], i);
    //     console.log(combs);
    //     console.log(i, combs.length);
    // }
    //aiUtil.TilesToTenpai(RandomHand(), 3); 

    // let hand = RandomHand();
    // PrintTileList(hand.tiles);
    // let tilesToRemove = [hand.tiles[0]];
    // hand.remove(tilesToRemove);
    // PrintTileList(hand.tiles);

    // let NineVectors = aiUtil.All9Vectors();
    // let file = fs.createWriteStream('9Vectors.txt');
    // NineVectors.forEach(function(v) { file.write(v.join(' ') + '\n'); });
    // file.end();

    // let NineVectors = [];
    // console.log('printing data');
    // fs.readFile('9Vectors.txt', 'utf-8', (err, data) => {
    //     if(err) throw err;
    //     data = data.split('\n');
    //     for(let d of data){
    //         let vec = [];
    //         for(let num of d){
    //             let val = parseInt(num);
    //             if(!isNaN(val)){
    //                 vec.push(val);
    //             }
    //         }
    //         NineVectors.push(vec);
    //     }
    //     //console.log("data: ", data.split('\n'));
    // });
    // console.log(NineVectors);
    
    
    // let total = 0;
    // let n = 20;
    // for(let i = 0; i < n; i++){
    //     let hand;
    //     let tenpai;
    //     let length = 0;
    //     let count = 0;
    //     while(length == 0)
    //     {
    //         hand = RandomHand();
    //         //PrintTileList(hand.tiles);
    //         tenpai = new Tenpai(hand);
    //         length = tenpai.tiles.length;
    //         count++;
    //     }
    //     //PrintTileList(hand.tiles);
    //     //PrintTileList(tenpai.tiles);
    //     console.log(i, ": ", count);
    //     total += count;
    // }
    // console.log("Average number of hands: ", total / n);

    // let n = 10000;
    // let total = 0;
    // for(let i = 0; i < n; i++){
    //     let hand = RandomHand();
    //     let t1 = performance.now();
    //     let tenpai = new Tenpai(hand);
    //     let t2 = performance.now();
    //     total += t2 - t1;
    // }
    // console.log("Average Tenpai calculation: ", total / n, "milliseconds");

    // let handPartition = new HandPartition();
    // let n = 100000;
    // let total = 0;
    // for(let i = 0; i < n; i++){
    //     let hand = RandomHand();
    //     let t1 = performance.now();
    //     handPartition.partition(hand);
    //     let t2 = performance.now();
    //     total += t2 - t1;
    // }
    // console.log("Average partition calculation: ", total / n, "milliseconds");
    // console.log("Total Time: ", total, " Milliseconds");
}

let RandomHand = () => {
    let set = new TileSet();
    let hand = new Hand();
    for(let i = 0; i < 13; i++){
        hand.add(set.FirstTile())
    }
    return hand;
}

_main();

module.exports = {
    main: _main
}