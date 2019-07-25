class _Action {
    constructor(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
}
var _ActionType;
(function (_ActionType) {
    _ActionType[_ActionType["Discard"] = 0] = "Discard";
    _ActionType[_ActionType["Chi"] = 1] = "Chi";
    _ActionType[_ActionType["Pon"] = 2] = "Pon";
    _ActionType[_ActionType["Kan"] = 3] = "Kan";
    _ActionType[_ActionType["Riichi"] = 4] = "Riichi";
    _ActionType[_ActionType["Ron"] = 5] = "Ron";
    _ActionType[_ActionType["Tsumo"] = 6] = "Tsumo";
})(_ActionType || (_ActionType = {}));
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
};
