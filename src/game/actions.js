/**
 * Host class for an action type.
 */
class Action {
    /**
     * Constructor for Action class.
     *
     * @param {ActionType} type The type of action to be represented by this class.
     */
    constructor(type) {
        this._type = type;
    }

    /**
     * Getter method for Action class.
     *
     * @returns {ActionType} The type of action.
     */
    get type() {
        return this._type;
    }
}

/**
 * Types of actions a player can perform.
 */
let ActionType = {
    Discard: 0,
    Chi: 1,
    Pon: 2,
    Kan: 3,
    Riichi: 4,
    Ron: 5,
    Tsumo: 6,
    None: 7
};

/**
 * Converts string input to actiontype.
 * @param {string} action String of the action.
 */
function StringToAction(action) {
    switch (action) {
        case '0':
            return ActionType.Discard;
        case '1':
            return ActionType.Chi;
        case '2':
            return ActionType.Pon;
        case '3':
            return ActionType.Kan;
        case '4':
            return ActionType.Riichi;
        case '5':
            return ActionType.Ron;
        case '6':
            return ActionType.Tsumo;
        default:
            return ActionType.None;
    }
}

function AbleTo(actions, actionToCheck) {
    for (let action of actions) {
        if (action == actionToCheck) return true;
    }
    return false;
}

module.exports = {
    Action: Action,
    ActionType: ActionType,
    StringToAction: StringToAction,
    AbleTo: AbleTo
};
