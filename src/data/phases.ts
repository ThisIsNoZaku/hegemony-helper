import type {GoodsName} from "./goods.ts";
import type {EmployeePlayerClass, EmployerPlayerClass} from "./players.ts";

export interface ProductionPhaseResult {
    /**
     * Wages earned from other classes.
     */
    earnedWages?: Record<EmployerPlayerClass, number>
    /**
     * Wages paid to other classes.
     */
    paidWages?: Record<EmployeePlayerClass, number>
    /**
     * Goods produced during the production phase.
     */
    output: Record<GoodsName, number>,
    startingIncome: number,
    endingIncome: number
}

export interface TaxPhaseResult {
    /**
     * Income tax paid by employee classes.
     */
    incomeTaxPaid?: number,
    /**
     * Corporate tax paid by the capitalist class.
     */
    corporateTaxPaid?: number,
    /**
     * Employment tax paid by the capitalist and middle classes.
     */
    employmentTaxPaid?: number,
    /**
     * Income taxes received from mc and wc.
     */
    incomeTaxReceived?: Record<EmployeePlayerClass, number>
    /**
     * Corporate taxes received from cc.
     */
    corporateTaxReceived?: number,
    /**
     * Employment taxes received from cc and mc.
     */
    employmentTaxReceived?: Record<EmployerPlayerClass, number>
}

export interface ScoringPhaseResult {
    pointsEarned: number
}

export const Phases = ["actions", "production", "taxes", "politics", "scoring"];