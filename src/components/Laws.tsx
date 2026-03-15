import {Grid, Paper} from "@mui/material";
import Law from "./LawToggle.tsx";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import type {Game} from "../data/game.ts";
import type {UpdateLawAction} from "../state/Reducers.ts";

const borderRadius = "12px";

export function Laws() {
    const {laws} = useContext(GameContext) as Game;
    const {fiscal, labor, tax, health, education, foreignTrade, immigration} = laws;
    const dispatch = useContext(DispatchContext);
    return <Paper sx={{padding: 1}}>
        <strong>Laws</strong>
        <Grid container spacing={0.5} columns={{xs: 1, sm: 5}} sx={{justifyContent: "center"}}>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#099fd5", borderRadius}}>
                <Law title="Fiscal" law="fiscal" value={fiscal}
                     setValue={v => dispatch!({type: "update_law", law: "fiscal", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#9187be", borderRadius}}>
                <Law title="Labor" law="labor" value={labor}
                     setValue={v => dispatch!({type: "update_law", law: "labor", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#ce5faf", borderRadius}}>
                <Law title="Tax" law="tax" value={tax}
                     setValue={v => dispatch!({type: "update_law", law: "tax", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#df100f", borderRadius}}>
                <Law title="Health" law="health" value={health}
                     setValue={v => dispatch!({type: "update_law", law: "health", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#ffa600", borderRadius}}>
                <Law title="Education" law="education" value={education}
                     setValue={v => dispatch!({type: "update_law", law: "education", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#c9a166", borderRadius}}>
                <Law title="Foreign Trade" law="foreignTrade" value={foreignTrade}
                     setValue={v => dispatch!({type: "update_law", law: "foreignTrade", level: v} as UpdateLawAction)}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around", backgroundColor: "#82817f", borderRadius}}>
                <Law title="Immigration" law="immigration" value={immigration}
                     setValue={v => dispatch!({type: "update_law", law: "immigration", level: v} as UpdateLawAction)}/>
            </Grid>
        </Grid>
    </Paper>
}