import {Stack, TextField} from "@mui/material";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import type {LawId, LawLevel} from "../../data/game.ts";

export default function EmploymentTaxesCalculator({pretaxRevenue, laws, operationalCompanies}: {pretaxRevenue: number, laws: Record<LawId, LawLevel>, operationalCompanies: number}) {
    const estimatedEmploymentTax = operationalCompanies * calculateTaxMultiplier(laws.tax, laws.health, laws.education);
    return <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
        <TextField label="Estimated pre-tax profix/loss" value={pretaxRevenue}
                   disabled={true}
                   sx={{
                       '& *.Mui-disabled': {
                           color: "inherit",
                           WebkitTextFillColor: 'inherit'
                       }
                   }}/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <strong>-</strong>
        </div>
        <TextField label="Est. Employment Tax" value={estimatedEmploymentTax} disabled={true}
                   sx={{
                       '& *.Mui-disabled': {
                           color: "inherit",
                           WebkitTextFillColor: 'inherit'
                       }
                   }}/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <strong>{"=>"}</strong>
        </div>

        <TextField label="Estimated profix/loss" value={pretaxRevenue - estimatedEmploymentTax}
                   disabled={true}
                   sx={{
                       '& *.Mui-disabled': {
                           color: "inherit",
                           WebkitTextFillColor: 'inherit'
                       }
                   }}/>
    </Stack>
}