import type {Game} from "../../../data/game.ts";
import calculateCompanyOutput from "./calculateCompanyOutput.ts";
import type {CompanyInstance} from "../../../data/companies.ts";

import type {CapitalistProductionPhaseResult} from "../../../data/capitalists/capitalistProductionPhaseResult.ts";
import type {MiddleClassProductionPhaseResult} from "../../../data/middle-class/middleClassProductionPhaseResult.ts";
import type StateProductionPhaseResult from "../../../data/state/stateProductionPhaseResult.ts";

export default function calculateMiddleClassProduction(game: Game, capitalistProduction:CapitalistProductionPhaseResult, stateProduction: StateProductionPhaseResult): MiddleClassProductionPhaseResult {
    const {mc} = game;
    const {companies, income} = mc;

    const foodOutput = companies.filter(c => c && c.workers && c.type === "food").reduce((total, company) => {
        return total + calculateCompanyOutput(company as CompanyInstance);
    }, 0);
    const luxuriesOutput = companies.filter(c => c && c.workers && c.type === "luxuries").reduce((total, company) => {
        return total + calculateCompanyOutput(company as CompanyInstance);
    }, 0);
    const healthOutput = companies.filter(c => c && c.workers && c.type === "health").reduce((total, company) => {
        return total + calculateCompanyOutput(company as CompanyInstance);
    }, 0);
    const educationOutput = companies.filter(c => c && c.workers && c.type === "education").reduce((total, company) => {
        return total + calculateCompanyOutput(company as CompanyInstance);
    }, 0);
    const influenceOutput = companies.filter(c => c && c.workers && c.type === "influence").reduce((total, company) => {
        return total + calculateCompanyOutput(company as CompanyInstance);
    }, 0);

    const paidWages = companies.filter(c => c && c.hasBonusWorker)
        .map(c => c as CompanyInstance)
        .reduce((total, company) => {
            return total + company.wages[company.wageLevel || 0];
        }, 0);

    const earnedWages = {
        cc: capitalistProduction.paidWages["mc"],
        state: stateProduction.paidWages["mc"],
        mc: 0
    } satisfies MiddleClassProductionPhaseResult["earnedWages"]

    return {
        paidWages: {
            wc: paidWages,
            mc: 0
        },
        earnedWages,
        output: {
            food: foodOutput,
            luxuries: luxuriesOutput,
            health: healthOutput,
            education: educationOutput,
            influence: influenceOutput
        },
        startingIncome: income,
        endingIncome: income + earnedWages["cc"] + earnedWages["state"] - paidWages
    }
}