import type {Game, LastProductionPhase} from "../data/game.ts";
import calculateMiddleClassProduction from "./calculateMiddleClassProduction.ts";
import {calculateStateProduction} from "./calculateStateProduction.ts";
import calculateWorkingClassProduction from "./calculateWorkingClassProduction.ts";
import {calculateCapitalistProduction} from "./calculateCapitalistProduction.ts";

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
        capitalists: capitalistProduction,
        workingClass: workingClassProduction,
        middleClass: middleClassProduction,
        state: stateProduction
    }
}

export default calculateProduction;