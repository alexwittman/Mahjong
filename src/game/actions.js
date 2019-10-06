/**
 * Host class for an action type.
 */
class _Action{

    /**
     * Constructor for Action class.
     * 
     * @param {_ActionType} type The type of action to be represented by this class.
     */
    constructor(type) {
        this._type = type;
    }

    /**
     * Getter method for Action class.
     * 
     * @returns {_ActionType} The type of action.
     */
    get type() {
        return this._type;
    }
}

/**
 * Types of actions a player can perform.
 */
let _ActionType = {
    Discard: 0,
    Chi: 1,
    Pon: 2,
    Kan: 3,
    Riichi: 4,
    Ron: 5,
    Tsumo: 6
}

module.exports = {
    Action: _Action,
    ActionType: _ActionType
}