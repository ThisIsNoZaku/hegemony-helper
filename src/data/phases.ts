import type {GoodsName} from "./goods.ts";
import type {EmployeePlayerClass, EmployerPlayerClass} from "./players.ts";

export interface PhaseResult {
    /**
     * Wages received from other classes.
     */
    earnedWages: Record<EmployerPlayerClass, number>
    /**
     * Wages paid to other classes.
     */
    paidWages: Record<EmployeePlayerClass, number>
    /**
     * Goods produced.
     */
    output: Record<GoodsName, number>,
    /**
     * The amount of income the player had at the start of the phase.
     */
    startingIncome: number,
    /**
     * The amount of income the player had at the end of the phase.
     */
    endingIncome: number

    startingCapital?: number;

    endingCapital?: number;
}

/**
 *
 */
export interface ProductionPhaseResult extends PhaseResult {

}

export const EMPTY_PRODUCTION_PHASE_RESULT: ProductionPhaseResult = {
    earnedWages: {
        cc: 0,
        mc: 0,
        state: 0
    },
    paidWages: {
        wc: 0,
        mc: 0
    },
    output: {
        food: 0,
        luxuries: 0,
        health: 0,
        education: 0,
        influence: 0
    },
    startingIncome: 0,
    endingIncome: 0,
    startingCapital: 0,
    endingCapital: 0
};

export interface TaxPhaseResult extends PhaseResult {
    /**
     * Income tax paid by employee classes.
     */
    incomeTaxPaid: number,
    /**
     * Corporate tax paid by the capitalist class.
     */
    corporateTaxPaid: number,
    /**
     * Employment tax paid by the capitalist and middle classes.
     */
    employmentTaxPaid: number
}

export const EMPTY_TAX_PHASE_RESULT: TaxPhaseResult = {
    ...EMPTY_PRODUCTION_PHASE_RESULT,
    incomeTaxPaid: 0,
    corporateTaxPaid: 0,
    employmentTaxPaid: 0
}

export interface ScoringPhaseResult extends PhaseResult {
    pointsEarned: number
}

export const Phases = ["actions", "production", "taxes", "politics", "scoring"];