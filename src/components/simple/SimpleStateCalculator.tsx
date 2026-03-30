import type {StatePlayer} from "../../data/state/state.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";
import {Box, FormLabel, Paper, Stack, TextField, Tooltip} from "@mui/material";
import {Actions as stateActions} from "../../data/state/stateActions.ts";
import {EducationIcon, HealthIcon, InfluenceIcon} from "../Icons.tsx";
import SimpleCompanies from "./SimpleCompanies.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {getClassColor} from "../../utilities/getClassColor.ts";
import WarningIcon from "@mui/icons-material/Warning";

export default function SimpleStateCalculator({state, laws, sx}: {
    state: StatePlayer,
    laws: Record<LawId, LawLevel>,
    sx?: SxProps<Theme>
}) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const openCompanies = state.companies.filter(c => !c.companyClosed);
    const owedWages = openCompanies.reduce((wages, company) => {
        if (company.workers) {
            wages[company.workers] += company.wages[Math.max(laws.labor, company.wageLevel as number)];
        }
        return wages;
    }, {
        wc: 0,
        mc: 0
    });
    const requiredcompanies = (laws.fiscal + 1) * 3;
    return <Paper sx={{
        padding: "5px",
        backgroundColor: getClassColor("state", .1),
        border: "2px solid " + getClassColor("state"),
        ...(sx || {})
    }}><Stack spacing={1}>
        <strong>State</strong>
        <TextField label="Treasury" type="number"
                   value={state.treasury}
                   onChange={e => {
                       dispatch(stateActions.update.treasury(Number.parseInt(e.target.value)));
                   }}/>
        <Paper>
            <FormLabel component="label">
                <strong>Public Services</strong>
            </FormLabel>
            <Stack direction="row" justifyContent="space-around">
                <Box alignContent="center" alignItems="center" display="flex">
                    <HealthIcon sx={{color: "red"}}/> = ${10 - (laws.health * 5)}
                </Box>
                <Box alignContent="center" alignItems="center" display="flex">
                    <EducationIcon sx={{color: "orange"}}/> = ${10 - (laws.education * 5)}
                </Box>
                <Box alignContent="center" alignItems="center" display="flex">
                    <InfluenceIcon sx={{color: "purple"}}/> = $10
                </Box>
            </Stack>
        </Paper>
        <Paper>
            <FormLabel component="label">
                <strong>Public Companies</strong>
                <Tooltip title="Wrong number of public companies open">
                    <WarningIcon sx={{
                        color: "orange",
                        visibility: requiredcompanies === openCompanies.length ? "hidden" : "visible"
                    }}/>
                </Tooltip>
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