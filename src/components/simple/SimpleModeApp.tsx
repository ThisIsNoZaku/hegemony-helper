import SimpleWorkingClassCalculator from "./SimpleWorkingClassCalculator.tsx";
import {Grid} from "@mui/material";
import {Laws} from "../Laws.tsx";
import {useContext} from "react";
import {GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import SimpleMiddleClassCalculator from "./SimpleMiddleClassCalculator.tsx";
import SimpleCapitalistClassCalculator from "./SimpleCapitalistClassCalculator.tsx";
import SimpleStateCalculator from "./SimpleStateCalculator.tsx";

export default function SimpleModeApp() {
    const {wc, mc, cc, state, laws} = useContext(GameContext) as Game;
    return <Grid container columns={{xs: 1, sm: 1, md: 1, lg: 2}} spacing={2}>
        <Grid size={2}>
            <Laws/>
        </Grid>
        <Grid size={1}>
            <SimpleWorkingClassCalculator mc={mc} state={state} cc={cc} wc={wc} laws={laws} sx={{height: "100%"}}/>
        </Grid>
        {mc &&<Grid size={1}>
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