import type {ProductionPhaseResult} from "../phases.ts";

export default interface StateProductionPhaseResult extends ProductionPhaseResult {
    paidWages: {
        mc: number,
        wc: number
    }
}