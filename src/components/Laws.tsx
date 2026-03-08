import {Grid, Paper} from "@mui/material";
import Law from "./LawToggle.tsx";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import type {Game} from "../data/game.ts";
import type {UpdateLawAction} from "../state/Reducers.ts";

export function Laws() {
    const {laws} = useContext(GameContext) as Game;
    const {fiscal, labor, tax, health, education, foreignTrade, immigration} = laws;
    const dispatch = useContext(DispatchContext);
    return <Paper sx={{padding: 1}}>
        <strong>Laws</strong>
        <Grid container columns={{xs: 1, sm: 5}} sx={{justifyContent: "center"}}>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Fiscal" value={fiscal} setValue={v => dispatch!({type: "update_law", law: "fiscal", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Labor" value={labor} setValue={v => dispatch!({type: "update_law", law: "labor", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Tax" value={tax} setValue={v => dispatch!({type: "update_law", law: "tax", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Health" value={health} setValue={v => dispatch!({type: "update_law", law: "health", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Education" value={education} setValue={v => dispatch!({type: "update_law", law: "education", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Foreign Trade" value={foreignTrade} setValue={v => dispatch!({type: "update_law", law: "foreignTrade", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Immigration" value={immigration} setValue={v => dispatch!({type: "update_law", law: "immigration", level: v} as UpdateLawAction)}/>
            </Grid>
        </Grid>
    </Paper>
}