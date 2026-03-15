import type StateProductionPhaseResult from "../../../data/state/stateProductionPhaseResult.ts";
import type {Game} from "../../../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../../../data/capitalists/capitalistProductionPhaseResult.ts";
import type {MiddleClassProductionPhaseResult} from "../../../data/middle-class/middleClassProductionPhaseResult.ts";
import type {WorkingClassProductionPhaseResult} from "../../../data/working-class/workingClass.ts";

export default function calculateWorkingClassProduction(game:Game,
                                                        capitalistProduction: CapitalistProductionPhaseResult,
                                                        stateProduction: StateProductionPhaseResult,
                                                        middleClassProduction?: MiddleClassProductionPhaseResult): WorkingClassProductionPhaseResult {

    return {
        paidWages: {
            mc: 0,
            wc: 0
        },
        earnedWages: {
            state: stateProduction.paidWages["wc"],
            mc: middleClassProduction?.paidWages["wc"] || 0,
            cc: capitalistProduction.paidWages["wc"]
        },
        output: {
            food: 0,
            luxuries: 0,
            health: 0,
            education: 0,
            influence: 0
        },
        startingIncome: game.wc.income,
        endingIncome: game.wc.income + stateProduction.paidWages["wc"] + (middleClassProduction?.paidWages["wc"] || 0) + capitalistProduction.paidWages["wc"]
    };
}