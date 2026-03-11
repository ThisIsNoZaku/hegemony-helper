import {useContext, useState} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Box, FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import _ from "lodash";
import SimpleCompanies from "./SimpleCompanies.tsx";

export default function ({mc, laws}: { mc: MiddleClassPlayer, laws: Record<LawId, LawLevel> }) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const [employedWorkers, setEmployedWorkers] = useState(2);
    const operationalCompanies = mc.companies.filter(c => c && c.workers).length;
    return <Paper sx={{width: "100%"}}>
        <Stack spacing={1}>
            <strong>Middle Class</strong>
            <TextField type="number" label="Capitalist/State Companies Employing MC Workers" value={employedWorkers}
                       onChange={e => {
                           setEmployedWorkers(_.clamp(Number.parseInt(e.target.value), 0, 20))
                       }}/>
            <SimpleCompanies player={mc} companies={mc.companies} dispatch={dispatch} laws={laws}/>
            <Box>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={employedWorkers} laws={laws}/>
                <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
            </Box>
        </Stack>
    </Paper>
}