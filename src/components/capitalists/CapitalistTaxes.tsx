import type {LawId, LawLevel} from "../../data/game.ts";
import {Paper, Stack} from "@mui/material";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import CapitalTaxesCalculator from "../taxes/CapitalTaxesCalculator.tsx";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";

export default function CapitalistTaxes({laws, operationalCompanies, pretaxRevenue}: {
    laws: Record<LawId, LawLevel>,
    operationalCompanies: number,
    pretaxRevenue: number
}) {
    const employmentTaxAmount = calculateTaxMultiplier(laws.tax, laws.health, laws.education) * operationalCompanies;
    return <Stack direction="column" spacing={3}>
        <Paper>
            <EmploymentTaxesCalculator laws={laws} operationalCompanies={operationalCompanies}/>
        </Paper>
        <Paper>
            <CapitalTaxesCalculator taxLaw={laws.tax} pretaxRevenue={pretaxRevenue - employmentTaxAmount}/>
        </Paper>
    </Stack>
}