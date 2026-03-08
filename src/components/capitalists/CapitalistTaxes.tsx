import {FormLabel, Paper, Stack} from "@mui/material";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import CapitalTaxesCalculator from "../taxes/CapitalTaxesCalculator.tsx";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";

export default function CapitalistTaxes({laws, operationalCompanies, pretaxRevenue}: {
    laws: Record<LawId, LawLevel>,
    operationalCompanies: number,
    pretaxRevenue: number
}) {
    const employmentTaxAmount = calculateTaxMultiplier(laws.tax, laws.health, laws.education) * operationalCompanies;
    return <Stack direction="column" spacing={1}>
        <Paper>
            <FormLabel><strong>Estimated Employment Tax</strong></FormLabel>
            <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
        </Paper>
        <Paper>
            <FormLabel><strong>Estimated Capital Tax</strong></FormLabel>
            <CapitalTaxesCalculator taxLaw={laws.tax} pretaxRevenue={pretaxRevenue - employmentTaxAmount}/>
        </Paper>
    </Stack>
}