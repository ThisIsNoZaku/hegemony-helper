import {type CompanyInstance} from "./companies.ts";
import {
    type CapitalistPlayer,
    type CapitalistProductionPhaseResult,
    type CapitalistScoringPhaseResult,
    type CapitalistTaxPhaseResult,
    capitalistCompanies as capitalistCompanies,
    EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT,
    EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
    EMPTY_CAPITALIST_TAX_PHASE_RESULT
} from "./capitalists.ts";
import {
    workingClassCompanies,
    type WorkingClassPlayer,
    type WorkingClassProductionPhaseResult
} from "./workingClass.ts";
import {middleClassCompanies, type MiddleClassPlayer} from "./middleClass.ts";
import {publicCompanies, type StatePlayer} from "./state.ts";

/**
 * All players.
 */
export type PlayerClass = "cc" | "wc" | "mc" | "state";
/**
 * All players which own companies and hire people.
 */
export type EmployerPlayerClass = "cc" | "mc" | "state";

/**
 * All players with workers that receive wages.
 */
export type EmployeePlayerClass = "wc" | "mc";

/**
 * All levels laws can be at.
 * 0 = C
 * 1 = B
 * 2 = A
 */
export type LawLevel = 0 | 1 | 2
/**
 * Names for all laws:
 */
export type LawId = "fiscal" | "labor" | "tax" | "health" | "education" | "foreignTrade" | "immigration";
/**
 * The phases of the game.
 */
export type GamePhase = "start" | "actions" | "production" | "taxes" | "politics" | "scoring"

export interface Game {
    /**
     * The current phase of the game.
     */
    phase: GamePhase,
    /**
     * The levels of all laws.
     */
    laws: Record<LawId, LawLevel>,
    /**
     * The state of the capitalist player.
     */
    cc: CapitalistPlayer,
    /**
     * The state of the working class player.
     */
    wc: WorkingClassPlayer,
    /**
     * The state of the middle class player.
     */
    mc: MiddleClassPlayer,
    /**
     * The state of the state player.
     */
    state: StatePlayer,
    lastProductionPhase: LastProductionPhase,
    lastTaxPhase: LastTaxPhase,
    lastPoliticsPhase: LastPoliticsPhase,
    lastScoringPhase: LastScoringPhase,
}

export interface EarnedWages {
    cc: number,
    mc: number,
    state: number
}

export interface PaidWages {
    wc: number,
    mc: number
}

export interface ProductionOutput {
    food: number,
    health: number,
    education: number,
    luxuries: number,
    influence: number
}

export interface LastProductionPhase {
    capitalists: CapitalistProductionPhaseResult,
    workingClass: WorkingClassProductionPhaseResult,
    middleClass: Record<string, unknown> & { earnedWages: EarnedWages, endingIncome: number, output: ProductionOutput },
    state: Record<string, unknown> & { output: ProductionOutput }
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
        influenceSpent: number,
    },
    wc: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
        influenceSpent: number,
    },
    mc: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
        influenceSpent: number,
    },
    state: {
        proposedLawsPassed: number,
        supportedLawsPassed: number,
        influenceSpent: number,
    }
}

export interface LastScoringPhase {
    capitalists: CapitalistScoringPhaseResult,
    workingClass: Record<string, unknown>,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
}

export const initialGameState: Game = {
    phase: "actions",
    laws: {
        fiscal: 0,
        labor: 1,
        tax: 2,
        health: 1,
        education: 0,
        foreignTrade: 1,
        immigration: 1
    },
    lastProductionPhase: {
        capitalists: EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT,
        workingClass: {
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        middleClass: {
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        state: {
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0}
        }
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
            influenceSpent: 0
        },
        wc: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
            influenceSpent: 0
        },
        mc: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
            influenceSpent: 0
        },
        state: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
            influenceSpent: 0
        },
    },
    lastScoringPhase: {
        capitalists: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
        workingClass: {},
        middleClass: {},
        state: {}
    },
    cc: {
        playerClass: "cc",
        points: 0,
        loans: 0,
        revenue: 120,
        capital: 0,
        capitalTrackPosition: 0,
        storages: {
            food: {
                quantity: 1,
                capacity: 8,
                ftzQuantity: 0,
                ftzCapacity: 8,
            },
            education: {
                quantity: 2,
                capacity: 12,
            },
            health: {
                quantity: 0,
                capacity: 12
            },
            luxuries: {
                quantity: 2,
                capacity: 12,
                ftzQuantity: 0,
                ftzCapacity: 12
            },
            influence: {
                quantity: 1,
                capacity: 999999,
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
    wc: {
        playerClass: "wc",
        points: 0,
        loans: 0,
        prosperity: 0,
        population: 10,
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
        income: 20
    },
    mc: {
        playerClass: "mc",
        points: 0,
        loans: 0,
        prosperity: 0,
        population: 10,
        companies: [
            {...middleClassCompanies.convenienceStore, wageLevel: 1, workers: "mc", hasBonusWorker: false},
            {...middleClassCompanies.doctorsOffice, wageLevel: 1, workers: "mc", hasBonusWorker: false},
            null, null, null, null, null, null
        ],
        goods: {
            food: 0,
            education: 0,
            health: 0,
            luxuries: 0,
            influence: 0
        },
        storages: {
            food: {
                quantity: 1,
                capacity: 8
            },
            education: {
                quantity: 0,
                capacity: 8
            },
            health: {
                quantity: 1,
                capacity: 8
            },
            luxuries: {
                quantity: 0,
                capacity: 8
            },
            influence: {
                quantity: 0,
                capacity: 999999
            }
        },
        income: 30
    },
    state: {
        playerClass: "state",
        points: 0,
        loans: 0,
        treasury: 120,
        publicServices: {
            health: 6,
            education: 6,
            influence: 4
        },
        companies: [
            {...publicCompanies.universityHospital, wageLevel: 1, workers: "wc"},
            {...publicCompanies.technicalUniversity, wageLevel: 1, workers: "mc"},
            {...publicCompanies.nationalPublicBroadcasting},
            {...publicCompanies.publicHospital},
            {...publicCompanies.publicUniversity},
            {...publicCompanies.regionalTvStation},
            {...publicCompanies.publicHospital},
            {...publicCompanies.publicUniversity},
            {...publicCompanies.regionalTvStation}
        ]
    }
}

export interface PlayerWithCompanies {
    playerClass: PlayerClass,
    companies: (CompanyInstance | null)[]
}