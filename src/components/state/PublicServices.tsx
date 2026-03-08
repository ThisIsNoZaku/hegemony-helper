import type {PublicService} from "../../data/goods.ts";
import {Box, FormLabel, Grid, InputAdornment, Paper, Stack, TextField} from "@mui/material";
import {EducationIcon, HealthIcon, InfluenceIcon} from "../Icons.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {type StatePlayer} from "../../data/state/state.ts";
import {Actions as stateActions} from "../../data/state/stateActions.ts";

export function PublicServices({state, publicServices}: {
    state: StatePlayer,
    publicServices: Record<PublicService, { capacity: number, quantity: number, cost: number }>
}) {
    const dispatch = useContext(DispatchContext);
    return <Paper elevation={3} sx={{padding: "10px"}}>
        <FormLabel component="legend"><strong>Public Services</strong></FormLabel>
        <Grid container columns={3}>
            <Grid size={1}>
                <Stack>
                    <div>${publicServices["health"].cost}</div>
                    {/** TODO: Capacity limit **/}
                    <TextField value={publicServices["health"].quantity} type="number" slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">
                                <HealthIcon/>
                            </InputAdornment>
                        }
                    }}
                               onChange={e => dispatch!(stateActions.update.publicServices.health(state, Math.min(publicServices["health"].capacity, Math.max(0, Number.parseInt(e.target.value)))))}
                    />
                </Stack>
            </Grid>
            <Grid size={1}>
                <Stack>
                    <div>${publicServices["education"].cost}</div>
                    <TextField value={publicServices["education"].quantity} type="number" slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">
                                <EducationIcon/>
                            </InputAdornment>
                        }
                    }}
                               onChange={e => dispatch!(stateActions.update.publicServices.education(state, Math.min(publicServices["education"].capacity, Math.max(0, Number.parseInt(e.target.value)))))}
                    />
                </Stack>
            </Grid>
            <Grid size={1}>
                <Stack>
                    <div>$10</div>
                    <TextField value={publicServices["influence"].quantity} type="number" slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">
                                <InfluenceIcon/>
                            </InputAdornment>
                        }
                    }}
                               onChange={e => dispatch!(stateActions.update.publicServices.influence(state, Math.min(publicServices["influence"].capacity, Math.max(0, Number.parseInt(e.target.value)))))}
                    />
                </Stack>
            </Grid>
        </Grid>
    </Paper>
}