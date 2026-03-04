import {ClassView} from "../ClassView.tsx";
import {WorkingClassSummary} from "./WorkingClassSummary.tsx";
import type {Game} from "../../data/game.ts";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import {Laws} from "../Laws.tsx";
import {Actions as workingClass} from "../../data/workingClass.ts"
import {PopulationTrack} from "../PopulationTrack.tsx";
import {ExpectedWagesCalculator} from "../ExpectedWages.tsx";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import {Box} from "@mui/material";

export function WorkingClassView() {
    const dispatch = useContext(DispatchContext);
    const {
        mc,
        cc,
        state,
        wc,
        laws
    }: Game = useContext(GameContext) as Game;

    const expectedWages: { mc: number, cc: number, state: number } = {
        mc: mc.companies.filter(c => c && c.hasBonusWorker)
            .map(c => c!.wages[c!.wageLevel || 0])
            .reduce((a, b) => a + b, 0),
        cc: cc.companies.filter(c => c && c.workers === "wc").map(c => c!.wages[c!.wageLevel || 0]).reduce((a, b) => a + b, 0),
        state: state.companies.filter(c => c && c.workers === "wc").map(c => c.wages[c.wageLevel || 0]).reduce((a, b) => a + b, 0)
    }
    return <ClassView
        summaryContent={<WorkingClassSummary prosperity={wc.prosperity} goods={wc.goods}
                                             income={wc.income}/>}>
        <PopulationTrack workers={wc.population} highlightColor="red" updatePopulation={value => {
            dispatch!(workingClass.update.population(wc, value))
        }}/>
        <Laws/>
        <ExpectedWagesCalculator {...expectedWages} />
        <Box>
            <strong>Taxes</strong>
            <IncomeTaxCalculator player="wc" taxableWorkers={Math.floor(wc.population / 3)} laws={laws}/>
        </Box>
    </ClassView>
}