import {AppBar, Button, Toolbar} from "@mui/material";
import {Link} from "react-router";
import {Actions} from "../state/Reducers.ts";
import type {Game} from "../data/game.ts";
import {Phases} from "../data/phases.ts";

function color(from: string, to: string) {
    if (from === to) {
        return "info";
    }

    if (Phases.indexOf(to) - Phases.indexOf(from) === 1) {
        return "success"
    }

    return "inherit";
}

function variant(from: string, to: string) {
    if (from === to || Phases.indexOf(to) - Phases.indexOf(from) === 1) {
        return "contained";
    }
    return "outlined";
}

export function PhasesBar({state, dispatch}: { state: Game, dispatch: any }) {
    return <AppBar position="fixed" sx={{marginTop: 10, top: 'auto', bottom: 0}}>
        <Toolbar variant="regular" sx={{justifyContent: "space-around"}}>
            <Button variant={variant(state.phase, "actions")}
                    color={color(state.phase, "actions")}>
                Actions
            </Button>
            <Button onClick={() => dispatch!(Actions.gotoPhase({from: "actions", to: "production"}))}
                    component={Link} to={`/${window.location.hash.slice(2).split("/")[0]}/production`}
                    variant={variant(state.phase, "production")}
                    color={color(state.phase, "production")}>
                {state.phase === "actions" && "Go To"} Production
            </Button>
            <Button
                component={Link} to={`/${window.location.hash.slice(2).split("/")[0]}/taxes`}
                variant={variant(state.phase, "taxes")}
                color={color(state.phase, "taxes")}>
                {state.phase === "production" && "Go To"} Taxes
            </Button>
            <Button
                component={Link} to={`/${window.location.hash.slice(2).split("/")[0]}/politics`}
                variant={variant(state.phase, "politics")}
                color={color(state.phase, "politics")}>
                {state.phase === "taxes" && "Go To"} Politics
            </Button>
            <Button
                component={Link} to={`/${window.location.hash.slice(2).split("/")[0]}/scoring`}
                variant={variant(state.phase, "scoring")}
                color={color(state.phase, "scoring")}>
                {state.phase === "politics" && "Go To"} Scoring
            </Button>
        </Toolbar>
    </AppBar>
}