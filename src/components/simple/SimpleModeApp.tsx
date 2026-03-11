import SimpleWorkingClassCalculator from "./SimpleWorkingClassCalculator.tsx";
import {Box, Stack} from "@mui/material";
import {Laws} from "../Laws.tsx";
import {useContext} from "react";
import {GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import SimpleMiddleClassCalculator from "./SimpleMiddleClassCalculator.tsx";
import SimpleCapitalistClassCalculator from "./SimpleCapitalistClassCalculator.tsx";

export default function SimpleModeApp() {
    const {wc, mc, cc, laws} = useContext(GameContext) as Game;
    return <Stack sx={{width: "100%", flexGrow: 1, paddingTop: "35px", paddingBottom: "35px"}} spacing={4}>
        <Laws/>
        <SimpleWorkingClassCalculator wc={wc} laws={laws}/>
        <SimpleMiddleClassCalculator mc={mc} laws={laws}/>
        <SimpleCapitalistClassCalculator cc={cc} laws={laws}/>
    </Stack>
}