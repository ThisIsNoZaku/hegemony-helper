import type {Game, LastProductionPhase} from "../data/game.ts";
import calculateMiddleClassProduction from "./phases/production/calculateMiddleClassProduction.ts";
import {calculateStateProduction} from "./phases/production/calculateStateProduction.ts";
import calculateWorkingClassProduction from "./phases/production/calculateWorkingClassProduction.ts";
import {calculateCapitalistProduction} from "./phases/production/calculateCapitalistProduction.ts";

/**
 * Calculate the results of the production phase for all classes based on the current game state.
 * @param game
 */
function calculateProduction(game: Game): LastProductionPhase {
    const capitalistProduction = calculateCapitalistProduction(game);
    const stateProduction = calculateStateProduction(game);
    const middleClassProduction = calculateMiddleClassProduction(game, capitalistProduction, stateProduction);
    const workingClassProduction = calculateWorkingClassProduction(game, capitalistProduction, middleClassProduction, stateProduction);
    return {
        cc: capitalistProduction,
        wc: workingClassProduction,
        mc: middleClassProduction,
        state: stateProduction
    }
}

export default calculateProduction;