import type {TaxPhaseResult} from "../phases.ts";

export interface CapitalistTaxPhaseResult extends TaxPhaseResult {
    // How much employment tax was paid
    employmentTaxPaid: number,
    // How much capital tax was paid
    capitalTaxPaid: number
    // Revenue before taxes
    startingRevenue: number,
    // Capital before taxes
    startingCapital: number,
    // Revenue after taxes
    endingRevenue: number,
    // Capital after taxes
    endingCapital: number
}