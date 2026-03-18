import {FormLabel, Paper, Stack, TextField} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {WorkingClassPlayer} from "../../data/working-class/workingClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Actions as workingClass} from "../../data/working-class/workingClass.ts";
import {type SxProps} from "@mui/system";
import {type Theme} from "@mui/material/styles";
import {getClassColor} from "../../utilities/getClassColor.ts";
import {ExpectedWagesCalculator} from "../ExpectedWages.tsx";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {StatePlayer} from "../../data/state/state.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {PlayerClass} from "../../data/players.ts";

export default function ({wc, mc, cc, state, laws, sx}: {
    wc: WorkingClassPlayer,
    mc: MiddleClassPlayer,
    cc: CapitalistPlayer,
    state: StatePlayer,
    laws: Record<LawId, LawLevel>,
    sx?: SxProps<Theme>
}) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const estimatedWages = cc.companies.concat(state.companies).reduce((total, c) => {
        if (c?.workers === "wc") {
            total[c.class] += c.wages[c.wageLevel as number];
        }
        return total;
    }, {
        cc: 0,
        state: 0,
        mc: 0
    } as Record<PlayerClass, number>);
    (mc || {companies: []}).companies.filter(c => c).reduce((wages, c) => {
        if (c?.hasBonusWorker) {
            wages.mc += c.wages[c.wageLevel as number];
        }
        return wages;
    }, estimatedWages);
    return <Paper sx={{
        padding: "5px",
        backgroundColor: getClassColor("wc", .1),
        border: "2px solid " + getClassColor("wc"),
        ...(sx || {})
    }}>
        <Stack spacing={1}>
            <FormLabel component="legend"><strong>Working Class</strong></FormLabel>
            <Paper>
                <Stack spacing={1.} direction="row" justifyContent="space-between" alignItems="center">
                    <TextField type="number"
                               sx={{width: "100%"}}
                               label="Workers" value={wc.population} onChange={e => {
                        dispatch(workingClass.update.population(Math.min(30, Math.max(10, Number.parseInt(e.target.value)))));
                    }}/>
                    <div>
                        =
                    </div>
                    <TextField type="number"
                               sx={{width: "100%"}}
                               label="Population" value={Math.floor(wc.population / 3)}/>
                </Stack>
            </Paper>
            <Paper>
                <ExpectedWagesCalculator cc={estimatedWages.cc} state={estimatedWages.state} mc={estimatedWages.mc}/>
            </Paper>
            <Paper>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={Math.floor(wc.population / 3)} laws={laws}/>
            </Paper>
        </Stack>
    </Paper>
}