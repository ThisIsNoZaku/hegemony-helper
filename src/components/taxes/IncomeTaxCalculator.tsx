import {Paper, Stack, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {calculateIncomeTax} from "../../utilities/calculateIncomeTax.ts";
import BalanceIcon from "@mui/icons-material/Balance";
import PaidIcon from "@mui/icons-material/Paid";
import {getClassColor} from "../../utilities/getClassColor.ts";
import type {EmployeePlayerClass} from "../../data/players.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";

export function IncomeTaxCalculator({taxableWorkers, laws, player}: {
    player: EmployeePlayerClass,
    taxableWorkers: number,
    laws: Record<LawId, LawLevel>
}) {
    return <Paper>
        <strong>Estimated Income Taxes</strong>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PersonIcon sx={{color: getClassColor(player)}}/><TextField slotProps={{inputLabel: {shrink: true}}} label="Taxable Workers"
                                        value={taxableWorkers}
                                        variant="outlined"/>
            </Stack>
            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                x
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <BalanceIcon/><TextField slotProps={{inputLabel: {shrink: true}}} label="Taxable Workers"
                                         value={calculateIncomeTax(laws.labor, laws.tax)}
                                         variant="outlined"/>
            </Stack>
            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                =
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Income Tax Owed"
                           value={taxableWorkers * calculateIncomeTax(laws.labor, laws.tax)}
                           variant="outlined"/>
            </Stack>
        </Stack>
    </Paper>
}