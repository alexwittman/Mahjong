class _Action{
    private _type : _ActionType;

    constructor(type : _ActionType) {
        this._type = type;
    }

    get type() : _ActionType{
        return this._type;
    }
}

enum _ActionType {
    Discard,
    Chi,
    Pon,
    Kan,
    Riichi,
    Ron,
    Tsumo
}

// class ActionType{
//     Discard = 0;
//     Chi = 1;
//     Pon = 2;
//     Kan = 3;
//     Riichi = 4;
//     Ron = 5;
//     Tsumo = 6;
// }

module.exports = {
    Action: _Action,
    ActionType: _ActionType
}