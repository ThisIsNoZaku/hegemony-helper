import {type CompanyInstance} from "./companies.ts";
import {
    type CapitalistPlayer,
    EMPTY_CAPITALIST_TAX_PHASE_RESULT, STARTING_CAPITALIST_DATA
} from "./capitalists/capitalists.ts";
import {
    STARTING_WORKING_CLASS_DATA,
    type WorkingClassPlayer,
    type WorkingClassProductionPhaseResult
} from "./working-class/workingClass.ts";
import {type MiddleClassPlayer, STARTING_MIDDLE_CLASS_DATA} from "./middle-class/middleClass.ts";
import {STARTING_STATE_PLAYER_DATA, type StatePlayer} from "./state/state.ts";
import type {PlayerClass} from "./players.ts";
import type {LawId, LawLevel} from "./laws.ts";
import {
    type CapitalistProductionPhaseResult,
    EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT
} from "./capitalists/capitalistProductionPhaseResult.ts";
import type {CapitalistTaxPhaseResult} from "./capitalists/capitalistTaxPhaseResult.ts";
import {
    type CapitalistScoringPhaseResult,
    EMPTY_CAPITALIST_SCORING_PHASE_RESULT
} from "./capitalists/capitalistScoringPhaseResult.ts";
import type {MiddleClassProductionPhaseResult} from "./middle-class/middleClassProductionPhaseResult.ts";
import type StateProductionPhaseResult from "./state/stateProductionPhaseResult.ts";

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
    middleClass: MiddleClassProductionPhaseResult,
    state:StateProductionPhaseResult
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
            startingIncome: 0,
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        middleClass: {
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
    cc: STARTING_CAPITALIST_DATA,
    wc: STARTING_WORKING_CLASS_DATA,
    mc: STARTING_MIDDLE_CLASS_DATA,
    state: STARTING_STATE_PLAYER_DATA
}

export interface PlayerWithCompanies {
    playerClass: PlayerClass,
    companies: (CompanyInstance | null)[]
}