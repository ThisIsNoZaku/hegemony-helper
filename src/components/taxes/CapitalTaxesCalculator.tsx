import {Paper, Stack, TextField} from "@mui/material";
import type {LawLevel} from "../../data/game.ts";
import MoneyIcon from '@mui/icons-material/Money';
import PaidIcon from "@mui/icons-material/Paid";
import {calculateCapitalTax} from "../../utilities/calculateTaxes.ts";

export default function CapitalTaxesCalculator({taxLaw, pretaxRevenue}: { taxLaw: LawLevel, pretaxRevenue: number }) {
    return <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>
        <Paper>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <MoneyIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Pretax Revenue" value={pretaxRevenue}
                           variant="outlined"/>
            </Stack>
        </Paper>
        <div style={{alignContent: "center", alignItems: "center", justifyContent: "center"}}>
            =
        </div>
        <Paper>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Capital Tax Owed" value={calculateCapitalTax(pretaxRevenue, taxLaw)}
                           variant="outlined"/>
            </Stack>
        </Paper>
    </Stack>
}