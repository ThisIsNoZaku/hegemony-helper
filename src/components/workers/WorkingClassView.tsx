import {ClassView} from "../ClassView.tsx";
import {WorkingClassSummary} from "./WorkingClassSummary.tsx";
import type {Game} from "../../data/game.ts";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import {Laws} from "../Laws.tsx";
import {Actions as wc} from "../../data/workingClass.ts"
import {PopulationTrack} from "../PopulationTrack.tsx";

export function WorkingClassView() {
    const dispatch = useContext(DispatchContext);
    const {
        workingClass,
        laws
    }: Game = useContext(GameContext) as Game;
    return <ClassView
        summaryContent={<WorkingClassSummary prosperity={workingClass.prosperity} goods={workingClass.goods}
                                             income={workingClass.income}/>}>
        <PopulationTrack workers={workingClass.population} highlightColor="red" updatePopulation={value => {
            dispatch!(wc.update.population(workingClass, value))
        }}/>
        <Laws/>
    </ClassView>
}