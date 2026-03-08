import type {Game} from "../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../data/capitalists/capitalistProductionPhaseResult.ts";

export function calculateCapitalistProduction(game: Game): CapitalistProductionPhaseResult {
    const {cc} = game;
    const {companies, revenue} = cc;

    const foodOutput = companies.filter(c => c && c.workers && c.type === "food").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const luxuriesOutput = companies.filter(c => c && c.workers && c.type === "luxuries").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const healthOutput = companies.filter(c => c && c.workers && c.type === "health").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const educationOutput = companies.filter(c => c && c.workers && c.type === "education").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0);
    const influenceOutput = companies.filter(c => c && c.workers && c.type === "influence").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0);

    const wcWages = companies.reduce((total, company) => {
        if (company && company.workers === "wc") {
            return total + company.wages[company.wageLevel || 0];
        }
        return total;
    }, 0)
    const mcWages = companies.reduce((total, company) => {
        if (company && company.workers === "mc") {
            return total + company.wages[company.wageLevel || 0];
        }
        return total;
    }, 0)
    const totalWages = wcWages + mcWages;

    return {
        paidWages: {mc: mcWages, wc: wcWages},
        output: {
            food: foodOutput,
            luxuries: luxuriesOutput,
            health: healthOutput,
            education: educationOutput,
            influence: influenceOutput
        },
        startingIncome: revenue,
        startingCapital: cc.capital,
        endingCapital: cc.capital - Math.max(0, totalWages - revenue),
        endingIncome: Math.max(0, revenue - totalWages),
    }
}