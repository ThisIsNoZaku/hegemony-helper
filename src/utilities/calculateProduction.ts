import type {Game, LastProductionPhase} from "../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../data/capitalists.ts";

function calculateProduction(game: Game): LastProductionPhase {
    return {
        capitalists: calculateCapitalistProduction(game),
        workingClass: {},
        middleClass: {},
        state: {}
    }
}

export function calculateCapitalistProduction(game: Game): CapitalistProductionPhaseResult {
    const {capitalists} = game;
    const {companies, revenue} = capitalists;

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
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const mcWages = companies.reduce((total, company) => {
        if (company && company.workers === "mc") {
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const totalWages = wcWages + mcWages;

    return {
        paidWages: { mc: mcWages, wc: wcWages},
        output: { food: foodOutput, luxuries: luxuriesOutput, health: healthOutput, education: educationOutput, influence: influenceOutput },
        startingRevenue: revenue,
        startingCapital: capitalists.capital,
        endingCapital: capitalists.capital - Math.max(0, totalWages - revenue),
        endingRevenue: Math.max(0, revenue - totalWages),
    }
}

export default calculateProduction;