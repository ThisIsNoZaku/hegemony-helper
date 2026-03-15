import {type CompanyInstance} from "./companies";
import {
    type CapitalistPlayer,
    STARTING_CAPITALIST_DATA
} from "./capitalists/capitalists";
import {
    STARTING_WORKING_CLASS_DATA,
    type WorkingClassPlayer,
    type WorkingClassProductionPhaseResult
} from "./working-class/workingClass";
import {type MiddleClassPlayer, STARTING_MIDDLE_CLASS_DATA} from "./middle-class/middleClass";
import {STARTING_STATE_PLAYER_DATA, STARTING_STATE_PLAYER_TWO_PLAYER_DATA, type StatePlayer} from "./state/state";
import type {PlayerClass} from "./players";
import type {LawId, LawLevel} from "./laws";
import {
    type CapitalistProductionPhaseResult,
    EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT
} from "./capitalists/capitalistProductionPhaseResult";
import {
    type CapitalistScoringPhaseResult,
    EMPTY_CAPITALIST_SCORING_PHASE_RESULT
} from "./capitalists/capitalistScoringPhaseResult";
import type {MiddleClassProductionPhaseResult} from "./middle-class/middleClassProductionPhaseResult";
import type StateProductionPhaseResult from "./state/stateProductionPhaseResult";
import {EMPTY_TAX_PHASE_RESULT, type TaxPhaseResult} from "./phases.ts";
import {capitalistCompanies} from "./capitalists/capitalistCompanies.ts";

/**
 * The phases of the game.
 */
export type GamePhase = "start" | "actions" | "production" | "taxes" | "politics" | "scoring"

type ConfigureMc<T, IncludeMc extends boolean> =
    T extends readonly unknown[]
        ? { [I in keyof T]: ConfigureMc<T[I], IncludeMc> }
        : T extends object
            ? {
                [K in keyof T as IncludeMc extends true ? K : K extends "mc" ? never : K]:
                ConfigureMc<T[K], IncludeMc>
            }
            : T;

interface GameBase {
    phase: GamePhase,
    laws: Record<LawId, LawLevel>,
    cc: CapitalistPlayer,
    wc: WorkingClassPlayer,
    mc: MiddleClassPlayer,
    state: StatePlayer,
    lastProductionPhase: LastProductionPhaseBase,
    lastTaxPhase: LastTaxPhaseBase,
    lastPoliticsPhase: LastPoliticsPhaseBase,
    lastScoringPhase: LastScoringPhaseBase,
}

interface EarnedWagesBase {
    cc: number,
    mc: number,
    state: number
}

interface PaidWagesBase {
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

interface LastProductionPhaseBase {
    cc: CapitalistProductionPhaseResult,
    wc: WorkingClassProductionPhaseResult,
    mc: MiddleClassProductionPhaseResult,
    state: StateProductionPhaseResult
}

interface LastTaxPhaseBase {
    cc: TaxPhaseResult,
    wc: TaxPhaseResult,
    mc: TaxPhaseResult,
    state: number
}

interface LastPoliticsPhaseBase {
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

interface LastScoringPhaseBase {
    cc: CapitalistScoringPhaseResult,
    wc: Record<string, unknown>,
    mc: Record<string, unknown>,
    state: Record<string, unknown>
}

export type Game<IncludeMc extends boolean = true> = ConfigureMc<GameBase, IncludeMc>;
export type EarnedWages<IncludeMc extends boolean = true> = ConfigureMc<EarnedWagesBase, IncludeMc>;
export type PaidWages<IncludeMc extends boolean = true> = ConfigureMc<PaidWagesBase, IncludeMc>;
export type LastProductionPhase<IncludeMc extends boolean = true> = ConfigureMc<LastProductionPhaseBase, IncludeMc>;
export type LastTaxPhase<IncludeMc extends boolean = true> = ConfigureMc<LastTaxPhaseBase, IncludeMc>;
export type LastPoliticsPhase<IncludeMc extends boolean = true> = ConfigureMc<LastPoliticsPhaseBase, IncludeMc>;
export type LastScoringPhase<IncludeMc extends boolean = true> = ConfigureMc<LastScoringPhaseBase, IncludeMc>;

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
        cc: EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT,
        wc: {
            paidWages: {wc: 0, mc: 0},
            startingIncome: 0,
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        mc: {
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            paidWages: {wc: 0, mc: 0},
            startingIncome: 0,
            endingIncome: 0
        },
        state: {
            startingIncome: 0,
            endingIncome: 0,
            paidWages: {wc: 0, mc: 0},
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0}
        }
    },
    lastTaxPhase: {
        cc: EMPTY_TAX_PHASE_RESULT,
        wc: EMPTY_TAX_PHASE_RESULT,
        mc: EMPTY_TAX_PHASE_RESULT,
        state: 0
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
        cc: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
        wc: {},
        mc: {},
        state: {}
    },
    cc: STARTING_CAPITALIST_DATA,
    wc: STARTING_WORKING_CLASS_DATA,
    mc: STARTING_MIDDLE_CLASS_DATA,
    state: STARTING_STATE_PLAYER_DATA
}

export const initialGameState2Player: Game<false> = {
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
        cc: EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT,
        wc: {
            paidWages: {wc: 0},
            startingIncome: 0,
            earnedWages: {cc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        state: {
            startingIncome: 0,
            endingIncome: 0,
            paidWages: {wc: 0},
            earnedWages: {cc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0}
        }
    },
    lastTaxPhase: {
        cc: EMPTY_TAX_PHASE_RESULT,
        wc: EMPTY_TAX_PHASE_RESULT,
        state: 0
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
        state: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
            influenceSpent: 0
        },
    },
    lastScoringPhase: {
        cc: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
        wc: {},
        state: {}
    },
    cc: {
        ...STARTING_CAPITALIST_DATA,
        companies: [
            {...capitalistCompanies.clinic, wageLevel: 1},
            {...capitalistCompanies.college, wageLevel: 1},
            {...capitalistCompanies.shoppingMall, workers: "wc", wageLevel: 1},
            {...capitalistCompanies.superMarket, workers: "wc", wageLevel: 1},
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    wc: STARTING_WORKING_CLASS_DATA,
    state: STARTING_STATE_PLAYER_TWO_PLAYER_DATA
}

export interface PlayerWithCompanies {
    playerClass: PlayerClass,
    companies: (CompanyInstance | null)[]
}