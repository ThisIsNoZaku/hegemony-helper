import {Stack} from "@mui/material";
import OwedWagesCalculator from "../OwedWagesCalculator.tsx";
import type {CompanyInstance} from "../../data/companies.ts";
import _ from "lodash";
import CapitalistTaxes from "./CapitalistTaxes.tsx";
import type {LawId, LawLevel} from "../../data/laws.ts";

export default function CapitalistExpenses({revenue, companies, laws} : {revenue: number, companies:CompanyInstance[], laws:Record<LawId, LawLevel>}) {
    const operationalCompanies: CompanyInstance[] = companies.filter(c => c !== null && (c.workers || c.fullyAutomated))
        .map(c => c!);
    const estimatedWages = {
        mc: _.sum(operationalCompanies.filter(c => c.workers === "mc").map(c => c.wages[c.wageLevel || 0] || 0)),
        wc: _.sum(operationalCompanies.filter(c => c.workers === "wc").map(c => c.wages[c.wageLevel || 0] || 0))
    }
    return <Stack spacing={1}>
        <OwedWagesCalculator wc={estimatedWages.wc} mc={estimatedWages.mc} />
        <CapitalistTaxes laws={laws} operationalCompanies={operationalCompanies.length} pretaxRevenue={revenue - estimatedWages.mc - estimatedWages.wc}/>
    </Stack>
}