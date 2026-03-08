import {Paper, Stack, TextField} from "@mui/material";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import BusinessIcon from '@mui/icons-material/Business';
import BalanceIcon from '@mui/icons-material/Balance';
import PaidIcon from '@mui/icons-material/Paid';
import type {LawId, LawLevel} from "../../data/laws.ts";
import IconField from "../IconField.tsx";

export default function EmploymentTaxesCalculator({laws, operationalCompanies}: {
    laws: Record<LawId, LawLevel>,
    operationalCompanies: number
}) {
    const taxMultiplier = calculateTaxMultiplier(laws.tax, laws.health, laws.education);
    return <Paper>
        <strong>Estimated Employment Taxes</strong>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>

            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <BusinessIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Num. Companies"
                           value={operationalCompanies}
                           variant="outlined"/>
            </Stack>
            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center"}}>
                x
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <BalanceIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Tax Multiplier" value={taxMultiplier}
                           variant="outlined"/>
            </Stack>
            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center"}}>
                =
            </div>
            <IconField icon={<PaidIcon/>} value={taxMultiplier * operationalCompanies} label="Employment Tax Owed"/>
        </Stack>
    </Paper>
}
