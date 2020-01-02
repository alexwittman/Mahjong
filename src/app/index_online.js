let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let mahjong = require("../game/game");
let PrintTileList = require("../game/tile").PrintTileList;
let TileListToString = require("../game/tile").TileListToString;
let Player = require("../game/player").Player;

let game = new mahjong.Game(1);
let playersConnected = 0;
let playerIds = [];

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  if (playersConnected < 4) {
    console.log("a user connected");
    playersConnected++;
    playerIds.push(socket.id);
    console.log(socket.id);
    if (playersConnected == 4) {
      console.log("all players connected");
      game.StartGame();
      SendGameState();
      console.log("hands sent");
    }
  }
});

http.listen(3000, function() {
  console.log("listening on *:3000.");
});

function GetGameState(playerNum) {
  return {
    playerID: playerNum,
    playerTiles: TileListToString(game._players[playerNum]._hand.tiles)
  };
}

function SendGameState() {
  for (let i = 0; i < 4; i++) {
    io.to(playerIds[i]).emit("update", GetGameState(i));
  }
}
