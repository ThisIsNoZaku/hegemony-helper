import type {StatePlayer} from "../../data/state/state.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";
import {FormLabel, InputAdornment, Paper, Stack, TextField} from "@mui/material";
import {Actions as stateActions} from "../../data/state/stateActions.ts";
import {EducationIcon, HealthIcon, InfluenceIcon} from "../Icons.tsx";
import SimpleCompanies from "./SimpleCompanies.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";

export default function SimpleStateCalculator({state, laws, sx}: {
    state: StatePlayer,
    laws: Record<LawId, LawLevel>,
    sx?: SxProps<Theme>
}) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const owedWages = state.companies.reduce((wages, company) => {
        if(company.workers) {
            wages[company.workers] += company.wages[Math.max(laws.labor, company.wageLevel as number)];
        }
        return wages;
    }, {
        wc: 0,
        mc: 0
    });
    return <Paper sx={sx}><Stack spacing={1}>
        <strong>State</strong>
        <TextField label="Treasury" type="number"
                   value={state.treasury}
                   onChange={e => {
                       stateActions.update.treasury(Number.parseInt(e.target.value));
                   }}/>
        <Paper>
            <FormLabel component="label">
                <strong>Public Services</strong>
            </FormLabel>
            <Stack direction="row" justifyContent="space-between">

                <TextField
                    value={state.publicServices.health}
                    type="number"
                    onChange={e => stateActions.update.publicServices.health(Math.max(0, Number.parseInt(e.target.value)))}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                <HealthIcon/>
                            </InputAdornment>
                        }
                    }}/>
                <TextField
                    value={state.publicServices.education}
                    type="number"
                    onChange={e => stateActions.update.publicServices.education(Math.max(0, Number.parseInt(e.target.value)))}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                <EducationIcon/>
                            </InputAdornment>
                        }
                    }}/>
                <TextField
                    value={state.publicServices.influence}
                    type="number"
                    onChange={e => stateActions.update.publicServices.influence(Math.max(0, Number.parseInt(e.target.value)))}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                <InfluenceIcon/>
                            </InputAdornment>
                        }
                    }}/>
            </Stack>
        </Paper>
        <Paper>
            <FormLabel component="label">
                <strong>Public Companies</strong>
            </FormLabel>
            <SimpleCompanies player={state}
                             update={stateActions.update}
                             companies={state.companies}
                             dispatch={dispatch}
                             laws={laws}
                             fixed={true}/>
        </Paper>
        <Paper>
            <FormLabel component="legend"><strong>Owed Wages</strong></FormLabel>
            <Stack direction="row" spacing={1} sx={{marginTop: "10px"}}>
                <TextField sx={{flexGrow: 1}} label="To Working Class" value={owedWages["wc"]}/>
                <TextField sx={{flexGrow: 1}} label="To Middle Class" value={owedWages["mc"]}/>
            </Stack>
        </Paper>
    </Stack>
    </Paper>
}