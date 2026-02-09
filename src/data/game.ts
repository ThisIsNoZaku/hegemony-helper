import {type CompanyInstance} from "./companies.ts";
import {companyDefinitions as capitalistCompanies} from "./capitalists.ts";
import {
    type CapitalistPlayer,
    type CapitalistProductionPhaseResult,
    type CapitalistScoringPhaseResult,
    type CapitalistTaxPhaseResult,
    EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT, EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
    EMPTY_CAPITALIST_TAX_PHASE_RESULT
} from "./capitalists.ts";
import {type WorkingClassPlayer, workingClassCompanies} from "./workingClass.ts";

export type Player = {
    points: number,
    loans: number,
    lastCardPlayed?: Record<string, unknown> & { name: string }
}

export type PlayerClass = "cc" | "wc" | "mc" | "state";

export type LawLevel = 0 | 1 | 2

export type LawId = "fiscal" | "labor" | "tax" | "health" | "education"

export type GamePhase = "start" | "actions" | "production" | "taxes" | "politics" | "scoring"

export type Game = {
    phase: GamePhase,
    laws: Record<LawId, LawLevel>,
    capitalists: CapitalistPlayer,
    workingClass: WorkingClassPlayer,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
    lastProductionPhase: LastProductionPhase,
    lastTaxPhase: LastTaxPhase,
    lastPoliticsPhase: LastPoliticsPhase,
    lastScoringPhase: LastScoringPhase,
}

export interface LastProductionPhase {
    capitalists: CapitalistProductionPhaseResult,
    workingClass: Record<string, unknown>,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
}

export interface LastTaxPhase {
    capitalists: CapitalistTaxPhaseResult,
    workingClass: Record<string, unknown>,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
}

export interface LastPoliticsPhase {
    cc: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
    },
    wc: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
    },
    mc: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
    },
    s: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
    }
}

export interface LastScoringPhase {
    capitalists: CapitalistScoringPhaseResult,
    workingClass: Record<string, unknown>,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
}

export type GoodsName = "food" | "health" | "education" | "luxuries" | "influence";

export type GoodsStorage = {
    quantity: number,
}
/**
 * Storage for goods from capitalist, middle class and state companies.
 */
export type BusinessGoodsStorage = GoodsStorage & {
    capacity: number
    ftzQuantity: number
}

export const initialGameState: Game = {
    phase: "actions",
    laws: {
        fiscal: 0,
        labor: 1,
        tax: 2,
        health: 1,
        education: 0,

    },
    lastProductionPhase: {
        capitalists: EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT,
        workingClass: {},
        middleClass: {},
        state: {}
    },
    lastTaxPhase: {
        capitalists: EMPTY_CAPITALIST_TAX_PHASE_RESULT,
        workingClass: {},
        middleClass: {},
        state: {}
    },
    lastPoliticsPhase: {
        cc: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
        },
        wc: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
        },
        mc: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
        },
        s: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
        },
    },
    lastScoringPhase: {
        capitalists: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
        workingClass: {},
        middleClass: {},
        state: {}
    },
    capitalists: {
        points: 0,
        loans: 0,
        revenue: 120,
        capital: 0,
        capitalTrackPosition: 0,
        goods: {
            food: {
                quantity: 1,
                capacity: 8,
                ftzQuantity: 0
            },
            education: {
                quantity: 2,
                capacity: 12,
                ftzQuantity: 0
            },
            health: {
                quantity: 0,
                capacity: 12,
                ftzQuantity: 0
            },
            luxuries: {
                quantity: 2,
                capacity: 12,
                ftzQuantity: 0
            },
            influence: {
                quantity: 1,
                capacity: 999999,
                ftzQuantity: 0
            }
        },
        companies: [
            {...capitalistCompanies.clinic, wageLevel: 1} as CompanyInstance,
            {
                ...capitalistCompanies.superMarket,
                wageLevel: 1,
                workers: "wc",
            } as CompanyInstance,
            {
                ...capitalistCompanies.shoppingMall,
                wageLevel: 1,
                workers: "mc",
            } as CompanyInstance,
            {...capitalistCompanies.college, wageLevel: 1, workers: "wc"} as CompanyInstance,
            null, null, null, null,
            null, null, null, null],
    },
    workingClass: {
        points: 0,
        loans: 0,
        prosperity: 0,
        workerCount: 10,
        population: 3,
        companies: [
            {...workingClassCompanies.farm},
            {...workingClassCompanies.farm}
        ],
        goods: {
            food: 0,
            education: 0,
            health: 0,
            luxuries: 0,
            influence: 0
        },
        income: 30
    },
    middleClass: {},
    state: {}
}
