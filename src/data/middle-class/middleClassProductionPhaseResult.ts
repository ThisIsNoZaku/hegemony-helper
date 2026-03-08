import type {ProductionPhaseResult} from "../phases.ts";

export interface MiddleClassProductionPhaseResult extends ProductionPhaseResult {
    earnedWages: {
        cc: number,
        state: number,
        mc: 0
    },
    paidWages: {
        wc: number,
        mc: 0
    },
    startingIncome: number,
    endingIncome: number
}