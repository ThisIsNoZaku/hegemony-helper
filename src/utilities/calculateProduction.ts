import type {Game, LastProductionPhase} from "../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../data/capitalists.ts";

function calculateProduction(game: Game): LastProductionPhase {
    const capitalistProduction = calculateCapitalistProduction(game);
    return {
        capitalists: capitalistProduction,
        workingClass: {
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        middleClass: {
            earnedWages: {cc: 0, mc: 0, state: 0},
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0},
            endingIncome: 0
        },
        state: {
            output: {food: 0, health: 0, education: 0, luxuries: 0, influence: 0}
        }
    }
}

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
        startingRevenue: revenue,
        startingCapital: cc.capital,
        endingCapital: cc.capital - Math.max(0, totalWages - revenue),
        endingRevenue: Math.max(0, revenue - totalWages),
    }
}

export default calculateProduction;