import type {ProductionPhaseResult} from "../phases.ts";
import type {EmployeePlayerClass} from "../players.ts";

/**
 * The result of the production phase for the capitalist class, including wages paid to other classes and changes in capital.
 *
 * Uses the 'income' field from ProductionPhaseResult as an alias for revenue.
 */
export interface CapitalistProductionPhaseResult extends ProductionPhaseResult {
    startingCapital: number,
    endingCapital: number,
    paidWages: Record<EmployeePlayerClass, number>
}

export const EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT: CapitalistProductionPhaseResult = {
    earnedWages: {mc: 0, cc: 0, state: 0},
    paidWages: {mc: 0, wc: 0},
    output: {food: 0, luxuries: 0, health: 0, education: 0, influence: 0},
    startingIncome: 0,
    startingCapital: 0,
    endingCapital: 0,
    endingIncome: 0
}