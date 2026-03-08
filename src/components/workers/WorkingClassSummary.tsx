import {useTheme} from "@mui/material/styles";
import {Button, Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import {useContext, useState} from "react";
import type {Game} from "../../data/game";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import GoodsIcon from "../GoodsIcon.tsx";
import ProsperityTrack from "./ProsperityTrack.tsx";
import type {UpdateWorkingClassPlayerAction} from "../../state/Reducers.ts";
import {PlayerActionBar} from "../PlayerActionBar.tsx";
import {workingClassProsperityTrack, Actions as workingClass} from "../../data/working-class/workingClass.ts";
import type {GoodsName} from "../../data/goods.ts";
import PersonIcon from "@mui/icons-material/Person";

export function WorkingClassSummary({
                                        income,
                                        goods,
                                        prosperity
                                    }: { income: number, goods: Record<GoodsName, number>, prosperity: number }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [_specialCardDialogOpen, setSpecialCardDialogOpen] = useState(false);
    const {wc} = useContext(GameContext) as Game;

    const dispatch = useContext(DispatchContext);

    return <>
        <Grid container columns={4} spacing={2}>
            <Grid size={{xs: 4, sm: 1}}>
                <Stack spacing={1}>
                    <TextField label="Income" value={income}
                               size={isSmall ? "small" : "medium"}
                               type="number"
                               onChange={e => {
                                   dispatch!({
                                       type: "update_player",
                                       player: "wc",
                                       playerData: {
                                           ...wc,
                                           income: parseInt(e.target.value)
                                       }
                                   } as UpdateWorkingClassPlayerAction)
                               }}/>
                    <TextField label="Points" value={wc.points}
                               size={isSmall ? "small" : "medium"}
                               type="number"
                               onChange={e => {
                                   dispatch!({
                                       type: "update_player",
                                       player: "wc",
                                       playerData: {
                                           ...wc,
                                           points: Math.max(0, parseInt(e.target.value))
                                       }
                                   } as UpdateWorkingClassPlayerAction)
                               }}/>
                </Stack>
            </Grid>
            <Grid container columns={3} size={{xs: 4, sm: 3}} spacing={2}>
                {(["food", "luxuries", "influence", "health", "education"] as GoodsName[]).map((goodsName) => (
                    <Grid size={{xs: 3, sm: 1}}>
                        <TextField value={goods[goodsName]}
                                   slotProps={{
                                       input: {
                                           startAdornment: (<GoodsIcon type={goodsName as GoodsName}/>)
                                       }
                                   }}
                                   size={isSmall ? "small" : "medium"}
                                   type="number"
                                   onChange={e => {
                                       dispatch!({
                                               type: "update_player",
                                               player: "wc",
                                               playerData: {
                                                   ...wc,
                                                   goods: {
                                                       ...goods,
                                                       [goodsName]: parseInt(e.target.value)
                                                   }
                                               }
                                           } as UpdateWorkingClassPlayerAction
                                       )
                                   }}
                        />
                    </Grid>))
                }
            </Grid>
            <Grid container columns={5} sx={{width: "100%"}} spacing={1}>
                <Grid size={5}>
                    <strong>Unions</strong>
                </Grid>
                <Grid size={1}>
                    <Button sx={{backgroundColor: "#84a751"}} onClick={() => dispatch!(workingClass.update.unions(wc, {...wc.unions, food: !wc.unions.food}))}>
                        <PersonIcon sx={{color: wc.unions["food"] ? "#a0e446" : "#555555"}}/>
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button sx={{backgroundColor: "#02abe5"}} onClick={() => dispatch!(workingClass.update.unions(wc, {...wc.unions, luxuries: !wc.unions.luxuries}))}>
                        <PersonIcon sx={{color: wc.unions["luxuries"] ?"#6ee3ff" : "#555555"}}/>
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button sx={{backgroundColor: "#e31722"}} onClick={() => dispatch!(workingClass.update.unions(wc, {...wc.unions, health: !wc.unions.health}))}>
                        <PersonIcon sx={{color: wc.unions["health" ] ? "white" : "#555555"}}/>
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button sx={{backgroundColor: "#ffad22"}} onClick={() => dispatch!(workingClass.update.unions(wc, {...wc.unions, education: !wc.unions.education}))}>
                        <PersonIcon sx={{color: wc.unions["education"] ? "#ffed4c" : "#555555"}}/>
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button sx={{backgroundColor: "#a62ea4"}} onClick={() => dispatch!(workingClass.update.unions(wc, {...wc.unions, influence: !wc.unions.influence}))}>
                        <PersonIcon sx={{color: wc.unions["influence"] ? "#febeeb" : "#555555"}}/>
                    </Button>
                </Grid>
            </Grid>

            <ProsperityTrack track={workingClassProsperityTrack} value={prosperity}
                             iconColor="crimson"
                             setValue={value => dispatch!({
                                 type: "update_player",
                                 player: "wc",
                                 playerData: {
                                     ...wc,
                                     prosperity: value
                                 }
                             } as UpdateWorkingClassPlayerAction)}/>

            <PlayerActionBar enabledButtons={{}} player={"wc"} setSpecialCardDialogOpen={setSpecialCardDialogOpen}/>
        </Grid>
    </>
}