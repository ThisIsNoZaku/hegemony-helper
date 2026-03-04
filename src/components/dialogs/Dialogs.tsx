import ProductionPhaseDialog from "../capitalists/ProductionPhaseDialog.tsx";
import {Actions} from "../../state/Reducers.ts";
import TaxPhaseDialog from "../capitalists/TaxPhaseDialog.tsx";
import PoliticsPhaseDialog from "../PoliticsPhaseDialog.tsx";
import ScoringPhaseDialog from "../capitalists/ScoringPhaseDialog.tsx";
import StartOfTurnDialog from "../capitalists/StartOfTurnDialog.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import type {Game, PlayerClass} from "../../data/game.ts";

export default function Dialogs({activePlayer, game}: {activePlayer: PlayerClass, game:Game}) {
    const dispatch = useContext(DispatchContext);
    const {phase, lastProductionPhase, lastTaxPhase, lastScoringPhase} = game as Game;
    return <>
        <ProductionPhaseDialog open={phase === "production"}
                               player={activePlayer}
                               onConfirm={() => dispatch!(Actions.gotoPhase({from: "production", to: "taxes"}))}
                               onCancel={() => dispatch!(Actions.gotoPhase({to: "actions", from: "production"}))}
                               production={lastProductionPhase}/>
        <TaxPhaseDialog
            player={activePlayer}
            open={phase === "taxes"}
            onConfirm={() => dispatch!(Actions.gotoPhase({to: "politics", from: "taxes"}))}
            onCancel={() => dispatch!(Actions.gotoPhase({to: "production", from: "taxes"}))}
            employmentTax={lastTaxPhase.capitalists.employmentTaxPaid}
            capitalTax={lastTaxPhase.capitalists.capitalTaxPaid}
            endingRevenue={lastTaxPhase.capitalists.endingRevenue}
            endingCapital={lastTaxPhase.capitalists.endingCapital}
        />
        <PoliticsPhaseDialog
            open={phase === "politics"}
            player={"cc"}
            onConfirm={() => dispatch!(Actions.gotoPhase({to: "scoring", from: "politics"}))}
            onCancel={() => dispatch!(Actions.gotoPhase({to: "taxes", from: "politics"}))}
        />
        <ScoringPhaseDialog open={phase === "scoring"}
                            player={activePlayer}
                            onConfirm={() => dispatch!(Actions.gotoPhase({to: "politics", from: "scoring"}))}
                            onCancel={() => dispatch!(Actions.gotoPhase({to: "scoring", from: "politics"}))}
                            scoring={lastScoringPhase.capitalists}/>
        <StartOfTurnDialog
            loans={game[activePlayer].loans}
            open={phase === "start"}
            onClose={() => dispatch!(Actions.gotoPhase({to: "production", from: "start"}))}
        />
    </>
}