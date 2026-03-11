import {calculateCapitalistProduction} from "../../src/utilities/phases/production/calculateCapitalistProduction";
import {initialGameState} from "../../src/data/game";
import {CapitalistProductionPhaseResult} from "../../src/data/capitalists/capitalistProductionPhaseResult";

describe('capitalist production', () => {
    it('Calculates wages and goods output correctly', () => {
        expect(calculateCapitalistProduction(initialGameState)).toEqual<CapitalistProductionPhaseResult>({
            startingCapital: 0,
            endingCapital: 0,
            paidWages: {
                mc: 20,
                wc: 40
            },
            output: {
                food: 4,
                luxuries: 6,
                education: 6,
                health: 0,
                influence: 0
            },
            startingIncome: 120,
            endingIncome: 60
        })
    })
});