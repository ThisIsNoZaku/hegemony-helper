import {useContext, useState} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Box, FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import _ from "lodash";

export default function ({mc, laws}: { mc: MiddleClassPlayer, laws: Record<LawId, LawLevel> }) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const [employedWorkers, setEmployedWorkers] = useState(2);
    const [operationalCompanies, setOperationalCompanies] = useState(2);
    return <Paper sx={{width: "100%"}}>
        <Stack spacing={1}>
            <strong>Middle Class</strong>
            <TextField type="number" label="Capitalist/State Companies Employing MC Workers" value={employedWorkers}
                       onChange={e => {
                           setEmployedWorkers(_.clamp(Number.parseInt(e.target.value), 0, 20))
                       }}/>
            <TextField type="number" label="Operational Middle Class Companies" value={operationalCompanies}
                       onChange={e => {
                           setOperationalCompanies(_.clamp(Number.parseInt(e.target.value), 0, 8))
                       }}/>
            <Box>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={employedWorkers} laws={laws}/>
                <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
            </Box>
        </Stack>
    </Paper>
}