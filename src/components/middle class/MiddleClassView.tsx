import {ClassView} from "../ClassView.tsx";
import {PopulationTrack} from "../PopulationTrack.tsx";
import {Actions as middleClass} from "../../data/middleClass.ts";
import {Laws} from "../Laws.tsx";
import {ExpectedWagesCalculator} from "../ExpectedWages.tsx";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import {MiddleClassSummary} from "./MiddleClassSummary.tsx";
import Companies from "../CompaniesContainer.tsx";
import Storages from "../capitalists/Storages.tsx";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";

export function MiddleClassView() {
    const dispatch = useContext(DispatchContext);
    const {
        mc,
        cc,
        state,
        laws
    }: Game = useContext(GameContext) as Game;
    const expectedWages: {cc: number, state: number} = {
        cc: cc.companies.filter(c => c && c.workers === "mc").map(c => c!.wages[c!.wageLevel || 0]).reduce((a, b) => a + b, 0),
        state: state.companies.filter(c => c && c.workers === "mc").map(c => c.wages[c.wageLevel || 0]).reduce((a, b) => a + b, 0)
    }
    const operationalCompanies = mc.companies.filter(c => c && c.workers).reduce((sum, _) => sum + 1, 0);
    const taxableWorkers = cc.companies.concat(state.companies).filter(c => c && c.workers === "mc").reduce((sum, _) => sum + 1, 0);
    return <ClassView
        summaryContent={<MiddleClassSummary prosperity={mc.prosperity} goods={mc.goods}
                                             income={mc.income}/>}>
        <PopulationTrack workers={mc.population} highlightColor="goldenrod" updatePopulation={value => {
            dispatch!(middleClass.update.population(mc, value))
        }}/>
        <Storages player={mc}/>
        <Laws/>
        <ExpectedWagesCalculator {...expectedWages} />
        <Companies player={mc} />
        <div>
            <strong>Estimated Taxes</strong>
            <IncomeTaxCalculator player="mc" taxableWorkers={taxableWorkers} laws={laws}/>
            <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
        </div>
    </ClassView>;
}