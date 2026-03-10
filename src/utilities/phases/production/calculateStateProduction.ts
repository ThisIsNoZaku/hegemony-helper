import type {Game} from "../../../data/game.ts";
import type StateProductionPhaseResult from "../../../data/state/stateProductionPhaseResult.ts";


export function calculateStateProduction(game: Game): StateProductionPhaseResult {
    const {state} = game;
    const {companies} = state;

    const healthOutput = companies.filter(c => c.type === "health" && c.workers && !c.companyClosed).reduce((total, policy) => {
        return total + policy.output.base;
    }, 0);
    const educationOutput = companies.filter(c => c.type === "education" && c.workers && !c.companyClosed).reduce((total, policy) => {
        return total + policy.output.base;
    }, 0);
    const luxuriesOutput = companies.filter(c => c.type === "luxuries" && c.workers && !c.companyClosed).reduce((total, policy) => {
        return total + policy.output.base;
    }, 0);
    const influenceOutput = companies.filter(c => c.type === "influence" && c.workers && !c.companyClosed).reduce((total, policy) => {
        return total + policy.output.base;
    }, 0);
    const foodOutput = companies.filter(c => c.type === "food" && c.workers && !c.companyClosed).reduce((total, policy) => {
        return total + policy.output.base;
    }, 0);

    const paidWages = {
        wc: companies.filter(c => c.workers === "wc").reduce((total, company) => {
            return total + company.wages[company.wageLevel || 0];
        }, 0),
        mc: companies.filter(c => c.workers === "mc").reduce((total, company) => {
            return total + company.wages[company.wageLevel || 0];
        }, 0),
    }

    return {
        earnedWages: {
            cc: 0,
            mc: 0,
            state: 0
        },
        paidWages,
        output: {
            health: healthOutput,
            education: educationOutput,
            luxuries: luxuriesOutput,
            influence: influenceOutput,
            food: foodOutput
        },
        startingIncome: state.treasury,
        endingIncome: state.treasury - paidWages["wc"] - paidWages["mc"]
    }
}