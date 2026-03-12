import {useTheme} from "@mui/material/styles";
import {Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import {useContext} from "react";
import type {Game} from "../../data/game";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import GoodsIcon from "../GoodsIcon.tsx";
import ProsperityTrack from "../workers/ProsperityTrack.tsx";
import type {UpdateMiddleClassPlayerAction} from "../../state/Reducers.ts";
import {middleClassProsperityTrack} from "../../data/middle-class/middleClass.ts";
import type {GoodsName} from "../../data/goods.ts";

export function MiddleClassSummary({
                                       income,
                                       goods,
                                       prosperity
                                   }: { income: number, goods: Record<GoodsName, number>, prosperity: number }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const {mc} = useContext(GameContext) as Game;

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
                                       player: "mc",
                                       playerData: {
                                           ...mc,
                                           income: parseInt(e.target.value)
                                       }
                                   } as UpdateMiddleClassPlayerAction)
                               }}/>
                    <TextField label="Points" value={mc.points}
                               size={isSmall ? "small" : "medium"}
                               type="number"
                               onChange={e => {
                                   dispatch!({
                                       type: "update_player",
                                       player: "mc",
                                       playerData: {
                                           ...mc,
                                           points: Math.max(0, parseInt(e.target.value))
                                       }
                                   } as UpdateMiddleClassPlayerAction)
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
                                           player: "mc",
                                           playerData: {
                                               ...mc,
                                               goods: {
                                                   ...mc.goods,
                                                    [goodsName]: parseInt(e.target.value)
                                               }
                                           }
                                       } as UpdateMiddleClassPlayerAction)
                                   }}
                        />
                    </Grid>))
                }
            </Grid>

            <ProsperityTrack player={mc} track={middleClassProsperityTrack} value={prosperity} setValue={value => dispatch!({
                type: "update_player",
                player: "mc",
                playerData: {
                    ...mc,
                    prosperity: value
                }
            } as UpdateMiddleClassPlayerAction)}/>
        </Grid>
    </>
}