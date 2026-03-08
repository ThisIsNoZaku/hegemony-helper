import type {LawLevel} from "../data/laws.ts";

const incomeTaxRates:Record<LawLevel, Record<LawLevel, number>> = {
    0: {
        0: 3,
        1: 2,
        2: 1
    },
    1: {
        0: 4,
        1: 4,
        2: 4
    },
    2: {
        0: 5,
        1: 6,
        2: 7
    }
}

export function calculateIncomeTax(laborLaw: LawLevel, taxLaw: LawLevel) {
    return incomeTaxRates[laborLaw][taxLaw];
}