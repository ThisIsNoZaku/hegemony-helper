import {type Game, type LastProductionPhase, type LastTaxPhase} from "../../../data/game.ts";
import calculateTaxMultiplier from "./calculateTaxMultiplier.ts";
import {EMPTY_TAX_PHASE_RESULT, type TaxPhaseResult} from "../../../data/phases.ts";
import {calculateIncomeTax} from "./calculateIncomeTax.ts";

export default function calculateTaxes(game: Game, lastProductionPhase: LastProductionPhase): LastTaxPhase {
    const cc = allCapitalistTaxes(game, lastProductionPhase);
    const wc = allWorkingClassTaxes(game);
    const mc = allMiddleClassTaxes(game);
    return {
        cc,
        wc,
        mc,
        state: cc.corporateTaxPaid + cc.employmentTaxPaid + wc.incomeTaxPaid + mc.incomeTaxPaid + mc.employmentTaxPaid
    }
}

export function calculateCapitalTax(revenue: number, taxLevel: number): number {
    if (revenue < 5) {
        return 0;
    }
    switch (taxLevel) {
        case 0:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 4;
            } else if (revenue < 50) {
                return 7;
            } else if (revenue < 100) {
                return 10;
            } else if (revenue < 200) {
                return 20;
            } else if (revenue < 300) {
                return 40;
            } else {
                return 60;
            }
        case 1:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 10;
            } else if (revenue < 100) {
                return 15;
            } else if (revenue < 200) {
                return 30;
            } else if (revenue < 300) {
                return 70;
            } else {
                return 120;
            }
        case 2:
            if (revenue < 10) {
                return 1;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 12;
            } else if (revenue < 100) {
                return 24;
            } else if (revenue < 200) {
                return 40;
            } else if (revenue < 300) {
                return 100;
            } else {
                return 160;
            }
    }
    throw new Error();
}

export function allCapitalistTaxes(game: Game, lastProductionPhase: LastProductionPhase): TaxPhaseResult {
    const employmentTaxPaid = game.cc.companies.filter(c => c !== null && c.workers).length * calculateTaxMultiplier(game.laws.tax, game.laws.health, game.laws.education);
    const corporateTaxPaid = calculateCapitalTax(game.lastProductionPhase.cc.endingIncome - employmentTaxPaid, game.laws.tax);
    return {
        employmentTaxPaid,
        corporateTaxPaid,
        startingIncome: game.lastProductionPhase.cc.endingIncome,
        startingCapital: game.lastProductionPhase.cc.endingCapital,
        endingIncome: Math.max(0, game.lastProductionPhase.cc.endingIncome - employmentTaxPaid - corporateTaxPaid),
        endingCapital: game.lastProductionPhase.cc.endingCapital - Math.max(0, (employmentTaxPaid + corporateTaxPaid) - game.lastProductionPhase.cc.endingIncome),
        output: lastProductionPhase.cc.output,
        incomeTaxPaid: 0,
        earnedWages: {
            state: 0,
            mc: 0,
            cc: 0
        },
        paidWages: {
            mc: 0,
            wc: 0
        }
    }
}

export function allWorkingClassTaxes(game: Game): TaxPhaseResult {
    const incomeTaxPaid = calculateIncomeTax(game.laws.labor, game.laws.tax) * Math.floor(game.wc.population / 3);
    return {
        ...EMPTY_TAX_PHASE_RESULT,
        incomeTaxPaid,
        startingIncome: game.lastProductionPhase.wc.endingIncome,
        endingIncome: Math.max(0, game.lastProductionPhase.wc.endingIncome - incomeTaxPaid)
    }
}

export function allMiddleClassTaxes(game: Game): TaxPhaseResult {
    const incomeTaxPaid = calculateIncomeTax(game.laws.labor, game.laws.tax) *
        (game.cc.companies.filter(c => c?.workers === "mc").length + game.state.companies.filter(c => c.workers === "mc").length);
    const employmentTaxPaid = game.cc.companies.filter(c => c !== null && c.workers === "mc").length * calculateTaxMultiplier(game.laws.tax, game.laws.health, game.laws.education);
    return {
        ...EMPTY_TAX_PHASE_RESULT,
        employmentTaxPaid,
        incomeTaxPaid,
        startingIncome: game.lastProductionPhase.mc.endingIncome,
        endingIncome: Math.max(0, game.lastProductionPhase.mc.endingIncome - incomeTaxPaid)
    }
}