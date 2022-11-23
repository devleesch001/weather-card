const CardinalIncrement = 22.5;

export function cardinalIntFromDegree(degree: number) {
    const valueDegree = Math.round(degree / CardinalIncrement);
    return valueDegree;
}

enum CardinalDirection {
    N = 0,
    NNE = 1,
    NE = 2,
    ENE = 3,
    E = 4,
    ESE = 5,
    SE = 6,
    SSE = 7,
    S = 8,
    SSW = 9,
    SW = 10,
    WSW = 11,
    w = 12,
    WNW = 13,
    NW = 14,
    NNW = 15,
}

export function cardinalPoint(valueDegree: number) {
    return CardinalDirection[valueDegree];
}
