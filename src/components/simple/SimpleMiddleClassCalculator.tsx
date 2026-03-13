import {useContext, useState} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Box, FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import _ from "lodash";
import SimpleCompanies from "./SimpleCompanies.tsx";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";
import {Actions as middleClass} from "../../data/middle-class/middleClassActions.ts";

export default function ({mc, laws, sx}: { mc: MiddleClassPlayer, laws: Record<LawId, LawLevel>, sx?: SxProps<Theme> }) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const [employedWorkers, setEmployedWorkers] = useState(2);
    const operationalCompanies = mc.companies.filter(c => c && c.workers).length;
    return <Paper sx={sx}>
        <Stack spacing={1}>
            <strong>Middle Class</strong>
            <TextField type="number" label="Capitalist/State Companies Employing MC Workers" value={employedWorkers}
                       onChange={e => {
                           setEmployedWorkers(_.clamp(Number.parseInt(e.target.value), 0, 20))
                       }}/>
            <SimpleCompanies update={middleClass.update} player={mc} companies={mc.companies} dispatch={dispatch} laws={laws}/>
            <Box>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={employedWorkers} laws={laws}/>
                <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
            </Box>
        </Stack>
    </Paper>
}