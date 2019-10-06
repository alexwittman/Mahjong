let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let mahjong = require('../game/game');
let PrintTileList = require('../game/tile').PrintTileList;
let TileListToString = require('../game/tile').TileListToString;
let Player = require('../game/player').Player;
let main = require('../game/main').main;

let game = new mahjong.Game();

app.get('/', function(req, res){
    res.send('Game started.');
});

http.listen(3000, function(){
  console.log('listening on *:3000.');
  main();
});