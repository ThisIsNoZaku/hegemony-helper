import type {LawId, LawLevel} from "../../data/laws.ts";
import {type Dispatch, useContext, useState} from "react";
import {
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import _ from "lodash";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import CapitalistTaxes from "../capitalists/CapitalistTaxes.tsx";
import type {CompanyInstance} from "../../data/companies.ts";
import {DispatchContext} from "../../state/GameContext.ts";
import calculateTaxMultiplier from "../../utilities/phases/taxes/calculateTaxMultiplier.ts";
import {calculateCapitalTax} from "../../utilities/phases/taxes/calculateTaxes.ts";
import SimpleCompanies from "./SimpleCompanies.tsx";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";
import {Actions as capitalists} from "../../data/capitalists/capitalistActions.ts";
import {getClassColor} from "../../utilities/getClassColor.ts";

export default function ({cc, laws, sx}: { cc: CapitalistPlayer, laws: Record<LawId, LawLevel>, sx?: SxProps<Theme> }) {
    const dispatch = useContext(DispatchContext) as Dispatch<any>;
    const [revenue, setRevenue] = useState(120);
    const [capital, setCapital] = useState(0);
    const operationalCompanies = cc.companies.filter(c => c && (c.workers || c.fullyAutomated)).length;
    const owedWages = (cc.companies.filter(c => c && c.workers) as CompanyInstance[]).reduce((total, company) => {
        total[company?.workers as "wc" | "mc"] += company.wages[Math.max(laws.labor as number, company.wageLevel || 0)];
        return total;
    }, {wc: 0, mc: 0})
    const totalWages = owedWages["wc"] + owedWages["mc"];
    const preCapitalTaxRevenue = revenue - totalWages - (operationalCompanies * calculateTaxMultiplier(laws.tax, laws.education, laws.health));
    const finalRevenue = preCapitalTaxRevenue - calculateCapitalTax(preCapitalTaxRevenue, laws.tax);
    const loansTaken = Math.ceil(Math.abs(Math.max(0, -finalRevenue) / 50));
    const finalCapital = capital + finalRevenue + (loansTaken * 50);
    return <Paper sx={{
        padding: "5px",
        backgroundColor: getClassColor("cc", .1),
        border: "2px solid " + getClassColor("cc"),
        ...(sx || {})
    }}>
        <Stack spacing={1}>
            <strong>Capitalist Class</strong>
            <Stack direction="row">
                <TextField type="number" label="Revenue" value={revenue}
                           sx={{backgroundColor: "white", flexGrow: 1}}
                           onChange={e => {
                               setRevenue(_.clamp(Number.parseInt(e.target.value), 0, 1000))
                           }}/>
                <TextField type="number" label="Capital" value={capital}
                           sx={{backgroundColor: "white", flexGrow: 1}}
                           onChange={e => {
                               setCapital(_.clamp(Number.parseInt(e.target.value), 0, 1000))
                           }}/>
            </Stack>
            <Stack spacing={.5}>
                <strong>Companies</strong>
                <SimpleCompanies update={capitalists.update} player={cc} companies={cc.companies.filter(c => !!c)}
                                 dispatch={dispatch} laws={laws}/>
                <strong>Owed Wages</strong>
                <Stack direction="row" spacing={.5}>
                    <TextField sx={{backgroundColor: "white", flexGrow: 1}} label="To Working Class"
                               value={owedWages["wc"]}/>
                    <TextField sx={{backgroundColor: "white", flexGrow: 1}} label="To Middle Class"
                               value={owedWages["mc"]}/>
                </Stack>
                <strong>Taxes</strong>
                <CapitalistTaxes laws={laws} operationalCompanies={operationalCompanies}
                                 pretaxRevenue={revenue - totalWages}/>
                <Paper>
                    <Stack>
                        <strong>Loans Taken</strong>
                        <TextField type="number" label="Loans Taken" value={loansTaken}/>
                    </Stack>
                </Paper>
                <Paper>
                    <strong>Final</strong>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <TextField type="number" label="Final Revenue" value={Math.max(0, finalRevenue)}/>
                        <TextField type="number" label="Initial Capital" value={capital}/>
                        →
                        <TextField type="number" label="Final Capital" value={finalCapital}/>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    </Paper>
}

