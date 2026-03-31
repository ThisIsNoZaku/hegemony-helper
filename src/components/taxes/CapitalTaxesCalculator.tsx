import {Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import MoneyIcon from '@mui/icons-material/Money';
import PaidIcon from "@mui/icons-material/Paid";
import {calculateCapitalTax} from "../../utilities/phases/taxes/calculateTaxes.ts";
import type {LawLevel} from "../../data/laws.ts";

export default function CapitalTaxesCalculator({taxLaw, pretaxRevenue}: { taxLaw: LawLevel, pretaxRevenue: number }) {
    const theme = useTheme();
    const mediaQuery = useMediaQuery(theme.breakpoints.up("md"));
    return <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>
        <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
            <MoneyIcon/>
            <TextField slotProps={{inputLabel: {shrink: true}}} label="Pretax Revenue" value={pretaxRevenue}
                       sx={{flexGrow: 1}}
                       variant="outlined"/>
        </Stack>
        {mediaQuery && <>
            <div style={{visibility: "hidden"}}>
                +
            </div>
            <Stack direction="row" sx={{visibility: "hidden"}}>
                <MoneyIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Pretax Revenue" value={pretaxRevenue}
                           sx={{flexGrow: 1}}
                           variant="outlined"/>
            </Stack></>}
        <div style={{alignContent: "center", alignItems: "center", justifyContent: "center"}}>
            =
        </div>
        <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
            <PaidIcon/>
            <TextField slotProps={{inputLabel: {shrink: true}}} label="Capital Tax Owed"
                       value={calculateCapitalTax(pretaxRevenue, taxLaw)}
                       sx={{flexGrow: 1}}
                       variant="outlined"/>
        </Stack>
    </Stack>
}