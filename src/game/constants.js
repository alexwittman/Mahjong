const PIN_ONE = 0;
const PIN_TWO = 1;
const PIN_THREE = 2;
const PIN_FOUR = 3;
const PIN_FIVE = 4;
const PIN_SIX = 5;
const PIN_SEVEN = 6;
const PIN_EIGHT = 7;
const PIN_NINE = 8;

const SOU_ONE = 9;
const SOU_TWO = 10;
const SOU_THREE = 11;
const SOU_FOUR = 12;
const SOU_FIVE = 13;
const SOU_SIX = 14;
const SOU_SEVEN = 15;
const SOU_EIGHT = 16;
const SOU_NINE = 17;

const WAN_ONE = 18;
const WAN_TWO = 19;
const WAN_THREE = 20;
const WAN_FOUR = 21;
const WAN_FIVE = 22;
const WAN_SIX = 23;
const WAN_SEVEN = 24;
const WAN_EIGHT = 25;
const WAN_NINE = 26;

const TERMINALS = [PIN_ONE, PIN_NINE, SOU_ONE, SOU_NINE, WAN_ONE, WAN_NINE];
const ONES = [PIN_ONE, SOU_ONE, WAN_ONE];
const TWOS = [PIN_TWO, SOU_TWO, WAN_TWO];
const THREES = [PIN_THREE, SOU_THREE, WAN_THREE];
const FOURS = [PIN_FOUR, SOU_FOUR, WAN_FOUR];
const FIVES = [PIN_FIVE, SOU_FIVE, WAN_FIVE];
const SIXES = [PIN_SIX, SOU_SIX, WAN_SIX];
const SEVENS = [PIN_SEVEN, SOU_SEVEN, WAN_SEVEN];
const EIGHTS = [PIN_EIGHT, SOU_EIGHT, WAN_EIGHT];
const NINES = [PIN_NINE, SOU_NINE, WAN_NINE];

const EAST = 27;
const SOUTH = 28;
const WEST = 29;
const NORTH = 30;

const WINDS = [EAST, SOUTH, WEST, NORTH];

const DRAGON_GREEN = 31;
const DRAGON_RED = 32;
const DRAGON_WHITE = 33;

const DRAGONS = [DRAGON_GREEN, DRAGON_RED, DRAGON_WHITE];

const HONORS = WINDS.concat(DRAGONS);

const GREEN = [SOU_TWO, SOU_THREE, SOU_FOUR, SOU_SIX, SOU_EIGHT, DRAGON_GREEN];

module.exports = {
    PIN_ONE: PIN_ONE,
    PIN_TWO: PIN_TWO,
    PIN_THREE: PIN_THREE,
    PIN_FOUR: PIN_FOUR,
    PIN_FIVE: PIN_FIVE,
    PIN_SIX: PIN_SIX,
    PIN_SEVEN: PIN_SEVEN,
    PIN_EIGHT: PIN_EIGHT,
    PIN_NINE: PIN_NINE,

    SOU_ONE: SOU_ONE,
    SOU_TWO: SOU_TWO,
    SOU_THREE: SOU_THREE,
    SOU_FOUR: SOU_FOUR,
    SOU_FIVE: SOU_FIVE,
    SOU_SIX: SOU_SIX,
    SOU_SEVEN: SOU_SEVEN,
    SOU_EIGHT: SOU_EIGHT,
    SOU_NINE: SOU_NINE,

    WAN_ONE: WAN_ONE,
    WAN_TWO: WAN_TWO,
    WAN_THREE: WAN_THREE,
    WAN_FOUR: WAN_FOUR,
    WAN_FIVE: WAN_FIVE,
    WAN_SIX: WAN_SIX,
    WAN_SEVEN: WAN_SEVEN,
    WAN_EIGHT: WAN_EIGHT,
    WAN_NINE: WAN_NINE,

    TERMINALS: [PIN_ONE, PIN_NINE, SOU_ONE, SOU_NINE, WAN_ONE, WAN_NINE],
    ONES: [PIN_ONE, SOU_ONE, WAN_ONE],
    TWOS: [PIN_TWO, SOU_TWO, WAN_TWO],
    THREES: [PIN_THREE, SOU_THREE, WAN_THREE],
    FOURS: [PIN_FOUR, SOU_FOUR, WAN_FOUR],
    FIVES: [PIN_FIVE, SOU_FIVE, WAN_FIVE],
    SIXES: [PIN_SIX, SOU_SIX, WAN_SIX],
    SEVENS: [PIN_SEVEN, SOU_SEVEN, WAN_SEVEN],
    EIGHTS: [PIN_EIGHT, SOU_EIGHT, WAN_EIGHT],
    NINES: [PIN_NINE, SOU_NINE, WAN_NINE],

    EAST: EAST,
    SOUTH: SOUTH,
    WEST: WEST,
    NORTH: NORTH,

    WINDS: [EAST, SOUTH, WEST, NORTH],

    DRAGON_GREEN: DRAGON_GREEN,
    DRAGON_RED: DRAGON_RED,
    DRAGON_WHITE: DRAGON_WHITE,

    DRAGONS: [DRAGON_GREEN, DRAGON_RED, DRAGON_WHITE],

    HONORS: WINDS.concat(DRAGONS),

    GREEN: [SOU_TWO, SOU_THREE, SOU_FOUR, SOU_SIX, SOU_EIGHT, DRAGON_GREEN]
};
