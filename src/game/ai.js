let ActionType = require('./actions').ActionType;
class AI {
    constructor() {}

    PickInterject(gameState, actions) {
        for (let action of actions) {
            if (action == ActionType.Ron) return ActionType.Ron;
            if (action == ActionType.Pon) return ActionType.Pon;
        }
        return ActionType.None;
    }

    PickAction(gameState, actions) {
        for (let action of actions) {
            if (action == ActionType.Tsumo) return ActionType.Tsumo;
        }
        return ActionType.Discard;
    }

    PickDiscard(gameState, hand, drawnTile) {
        return hand.tiles[Math.floor(Math.random() * hand.tiles.length)].number;
    }

    PickRiichi(riichiTiles) {
        return riichiTiles[0].number;
    }

    PickChow(possibleChows) {
        return possibleChows[0];
    }

    PickKong(possibleKongs) {
        return possibleKongs[0];
    }
}

module.exports.AI = AI;
