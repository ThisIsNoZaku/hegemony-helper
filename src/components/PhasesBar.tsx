import {AppBar, Button, Toolbar} from "@mui/material";
import {Actions, type AppState} from "../state/Reducers.ts";
import type {Game} from "../data/game.ts";

export function PhasesBar({state, dispatch}: { state: Game, dispatch: any }) {
    return <AppBar position="fixed" sx={{marginTop: 10, top: 'auto', bottom: 0}}>
        <Toolbar variant="regular" sx={{justifyContent: "space-around"}}>
            <Button variant={state.phase === "actions" ? "contained" : "outlined"}
                    color={state.phase === "actions" ? "success" : "inherit"}>
                Actions
            </Button>
            <Button onClick={() => dispatch!(Actions.gotoPhase({from: "actions", to: "production"}))}
                    variant={state.phase === "production" ? "contained" : "outlined"}
                    color={state.phase === "production" ? "success" : "inherit"}>
                Production
            </Button>
            <Button
                variant={state.phase === "taxes" ? "contained" : "outlined"}
                color={state.phase === "taxes" ? "success" : "inherit"}>
                Taxes
            </Button>
            <Button
                variant={state.phase === "politics" ? "contained" : "outlined"}
                color={state.phase === "politics" ? "success" : "inherit"}>
                Politics
            </Button>
            <Button
                variant={state.phase === "scoring" ? "contained" : "outlined"}
                color={state.phase === "scoring" ? "success" : "inherit"}>
                Scoring
            </Button>
        </Toolbar>
    </AppBar>
}