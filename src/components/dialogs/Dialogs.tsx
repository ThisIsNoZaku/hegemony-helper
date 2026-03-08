import ProductionPhaseDialog from "./ProductionPhaseDialog.tsx";
import {Actions} from "../../state/Reducers.ts";
import TaxPhaseDialog from "./TaxPhaseDialog.tsx";
import PoliticsPhaseDialog from "../PoliticsPhaseDialog.tsx";
import ScoringPhaseDialog from "./ScoringPhaseDialog.tsx";
import StartOfTurnDialog from "./StartOfTurnDialog.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import type {PlayerClass} from "../../data/players.ts";

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