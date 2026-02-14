import {Stack, TextField} from "@mui/material";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import type {LawId, LawLevel} from "../../data/game.ts";
import BusinessIcon from '@mui/icons-material/Business';
import BalanceIcon from '@mui/icons-material/Balance';
import PaidIcon from '@mui/icons-material/Paid';

export default function EmploymentTaxesCalculator({laws, operationalCompanies}: {
    laws: Record<LawId, LawLevel>,
    operationalCompanies: number
}) {
    const taxMultiplier = calculateTaxMultiplier(laws.tax, laws.health, laws.education);
    return <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>
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
        <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
            <PaidIcon/>
            <TextField slotProps={{inputLabel: {shrink: true}}} label="Employment Tax Owed"
                       value={taxMultiplier * operationalCompanies}
                       variant="outlined"/>
        </Stack>
    </Stack>
}
