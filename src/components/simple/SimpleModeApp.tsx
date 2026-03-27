import SimpleWorkingClassCalculator from "./SimpleWorkingClassCalculator.tsx";
import {Button, Grid, Stack} from "@mui/material";
import {Laws} from "../Laws.tsx";
import {type ActionDispatch, useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import SimpleMiddleClassCalculator from "./SimpleMiddleClassCalculator.tsx";
import SimpleCapitalistClassCalculator from "./SimpleCapitalistClassCalculator.tsx";
import SimpleStateCalculator from "./SimpleStateCalculator.tsx";
import {getClassColor} from "../../utilities/getClassColor.ts";

export default function SimpleModeApp() {
    const {wc, mc, cc, state, laws, activePlayer} = useContext(GameContext) as Game;
    const dispatch = useContext(DispatchContext) as ActionDispatch<any>;
    return <Grid container columns={{xs: 1, sm: 1, md: 1, lg: 2}} spacing={2}>
        <Grid size={1}>
            <Stack direction="column">
                Active Player
                <Stack direction="row" justifyContent="space-between">
                    <Button variant="contained"
                            onClick={() => dispatch({type: "active_player", activePlayer: "wc"})}
                            sx={{
                                backgroundColor: getClassColor("wc"),
                                color: activePlayer === "wc" ? "white" : "darkslategray"
                            }}>Working Class</Button>
                    <Button variant="contained"
                            onClick={() => dispatch({type: "active_player", activePlayer: "mc"})}
                            sx={{
                                backgroundColor: getClassColor("mc"),
                                color: activePlayer === "mc" ? "white" : "darkslategray"
                            }}>Middle
                        Class</Button>
                    <Button variant="contained"
                            onClick={() => dispatch({type: "active_player", activePlayer: "cc"})}
                            sx={{
                                backgroundColor: getClassColor("cc"),
                                color: activePlayer === "cc" ? "white" : "darkslategray"
                            }}>Capitalist
                        Class</Button>
                    <Button variant="contained"
                            onClick={() => dispatch({type: "active_player", activePlayer: "state"})}
                            sx={{
                                backgroundColor: getClassColor("state"),
                                color: activePlayer === "state" ? "white" : "darkslategray"
                            }}>State</Button>
                </Stack>
            </Stack>

        </Grid>
        <Grid size={2}>
            <Laws/>
        </Grid>
        <Grid size={1}>
            <SimpleWorkingClassCalculator mc={mc} state={state} cc={cc} wc={wc} laws={laws} sx={{height: "100%"}}/>
        </Grid>
        {mc && <Grid size={1}>
            <SimpleMiddleClassCalculator mc={mc} cc={cc} state={state} laws={laws} sx={{height: "100%"}}/>
        </Grid>}
        <Grid size={1}>
            <SimpleCapitalistClassCalculator cc={cc} laws={laws} sx={{height: "100%"}}/>
        </Grid>
        <Grid size={1}>
            <SimpleStateCalculator state={state} laws={laws} sx={{height: "100%"}}/>
        </Grid>
    </Grid>
}