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
import {STARTING_STATE_PLAYER_DATA, type StatePlayer} from "./state/state";
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
    cc: CapitalistProductionPhaseResult,
    wc: WorkingClassProductionPhaseResult,
    mc: MiddleClassProductionPhaseResult,
    state:StateProductionPhaseResult
}

export interface LastTaxPhase {
    cc: TaxPhaseResult,
    wc: TaxPhaseResult,
    mc: TaxPhaseResult,
    state: number
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
    cc: CapitalistScoringPhaseResult,
    wc: Record<string, unknown>,
    mc: Record<string, unknown>,
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

export interface PlayerWithCompanies {
    playerClass: PlayerClass,
    companies: (CompanyInstance | null)[]
}