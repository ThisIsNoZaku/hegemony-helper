import {Box, FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {WorkingClassPlayer} from "../../data/working-class/workingClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Actions as workingClass} from "../../data/working-class/workingClass.ts";

export default function ({wc, laws}: { wc: WorkingClassPlayer, laws: Record<LawId, LawLevel> }) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    return <Paper sx={{width: "100%"}}>
        <Stack>
            <strong>Working Class</strong>
            <TextField type="number" label="Workers" value={wc.population} onChange={e => {
                dispatch(workingClass.update.population(Math.min(30, Math.max(10, Number.parseInt(e.target.value)))));
            }}/>
            <Box>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={Math.floor(wc.population / 3)} laws={laws}/>
            </Box>
        </Stack>
    </Paper>
}