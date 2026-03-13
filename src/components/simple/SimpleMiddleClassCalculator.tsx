import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import SimpleCompanies from "./SimpleCompanies.tsx";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";
import {Actions as middleClass} from "../../data/middle-class/middleClassActions.ts";
import type {CompanyInstance} from "../../data/companies.ts";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {StatePlayer} from "../../data/state/state.ts";

export default function ({mc, cc, state, laws, sx}: {
    mc: MiddleClassPlayer,
    cc: CapitalistPlayer,
    state: StatePlayer,
    laws: Record<LawId, LawLevel>,
    sx?: SxProps<Theme>
}) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const employedWorkers = cc.companies.concat(state.companies).filter(c => c && c.workers === "mc")
        .length;
    const operationalCompanies: CompanyInstance[] = mc.companies.filter(c => c && c.workers) as CompanyInstance[];
    const owedWages = operationalCompanies.reduce((wages, company) => {
        return wages + (company.hasBonusWorker ? company.wages[Math.max(laws.labor as number, (company.wageLevel || 0))] : 0)
    }, 0);
    return <Paper sx={sx}>
        <Stack spacing={1}>
            <strong>Middle Class</strong>
            <SimpleCompanies update={middleClass.update} player={mc} companies={mc.companies} dispatch={dispatch}
                             laws={laws}/>
            <Paper>
                <FormLabel component="legend"><strong>Owed Wages</strong></FormLabel>
                <Stack direction="row" spacing={.5}>
                    <TextField sx={{flexGrow: 1}} label="To Working Class" value={owedWages}/>
                </Stack>
            </Paper>
            <Paper>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="mc" taxableWorkers={employedWorkers} laws={laws}/>
                <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies.length}/>
            </Paper>
        </Stack>
    </Paper>
}