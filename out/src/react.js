import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <table className="AppTable">
        <tr className="TopRow">
          <td className="TopLeft" />
          <TopPlayerArea player={this.props.gameState.topPlayer} />
          <td className="TopRight" />
        </tr>
        <tr className="MiddleRow">
          <LeftPlayerArea player={this.props.gameState.leftPlayer} />
          <CenterArea />
          <RightPlayerArea player={this.props.gameState.rightPlayer} />
        </tr>
        <tr className="BottomRow">
          <td className="TopLeft" />
          <PlayerArea player={this.props.gameState.player} />
          <td className="TopRight" />
        </tr>
      </table>
    );
  }
}

class PlayerArea extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <td className="playerArea">
        Player
        <Hand tiles={this.props.player.closedTiles} />
      </td>
    );
  }
}

class CenterArea extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <table className="CenterArea">
        <tr className="TopRow">
          <div />
          <TopPlayerDiscards />
          <div />
        </tr>
        <tr className="MiddleRow">
          <LeftPlayerDiscards />
          <div />
          <RightPlayerDiscards />
        </tr>
        <tr className="BottomRow">
          <div />
          <PlayerDiscards />
          <div />
        </tr>
      </table>
      //<td className="centerArea">Center Area</td>
    );
  }
}

class LeftPlayerArea extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <td className="leftPlayerArea">
        Left Player
        <OpponentHand tileCount={this.props.player.closedTileCount} />
      </td>
    );
  }
}

class RightPlayerArea extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <td className="rightPlayerArea">
        Right Player
        <OpponentHand tileCount={this.props.player.closedTileCount} />
      </td>
    );
  }
}

class TopPlayerArea extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <td className="topPlayerArea">
        Top Player
        <OpponentHand
          tileCount={this.props.player.closedTileCount}
          inline={true}
        />
      </td>
    );
  }
}

class LeftPlayerDiscards extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <td className="leftPlayerDiscards">Left Player Discards</td>;
  }
}

class RightPlayerDiscards extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <td className="rightPlayerDiscards">Right Player Discards</td>;
  }
}

class TopPlayerDiscards extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <td className="topPlayerDiscards">Top Player Discards</td>;
  }
}

class PlayerDiscards extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <td className="playerDiscards">Player Discards</td>;
  }
}

class Hand extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    let hand = [];
    for (let i = 0; i < this.props.tiles.length; i += 2) {
      hand.push(
        <Tile unicode={this.props.tiles[i] + this.props.tiles[i + 1]} />
      );
    }
    return <div>{hand}</div>;
  }
}

class OpponentHand extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    let hand = [];
    for (let i = 0; i < this.props.tileCount; i++) {
      if (this.props.inline) {
        hand.push(<div style={{ display: "inline" }}>🀫</div>);
      } else {
        hand.push(<div>🀫</div>);
      }
    }
    return <div>{hand}</div>;
  }
}

class Tile extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <button className="tile">
        <font size="5">{this.props.unicode}</font>
      </button>
    );
  }
}

class Discard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <div>{this.props.unicode}</div>;
  }
}

const GameState = {
  player: {
    discards: "🀙🀚🀜🀜🀝🀝🀠🀓🀇🀋🀏🀁🀂",
    closedTiles: "🀙🀚🀜🀜🀝🀝🀠🀓🀇🀋🀏🀁🀂",
    melds: {}
  },
  leftPlayer: {
    discards: "🀙🀚🀜🀜🀝🀝🀠🀓🀇🀋🀏🀁🀂",
    closedTileCount: 13,
    melds: {}
  },
  rightPlayer: {
    discards: "🀙🀚🀜🀜🀝🀝🀠🀓🀇🀋🀏🀁🀂",
    closedTileCount: 13,
    melds: {}
  },
  topPlayer: {
    discards: "🀙🀚🀜🀜🀝🀝🀠🀓🀇🀋🀏🀁🀂",
    closedTileCount: 13,
    melds: {}
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App gameState={GameState} />, rootElement);
