import {Box, FormLabel, Stack, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {calculateIncomeTax} from "../../utilities/phases/taxes/calculateIncomeTax.ts";
import BalanceIcon from "@mui/icons-material/Balance";
import PaidIcon from "@mui/icons-material/Paid";
import {getClassColor} from "../../utilities/getClassColor.ts";
import type {EmployeePlayerClass} from "../../data/players.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import BusinessIcon from "@mui/icons-material/Business";

export function IncomeTaxCalculator({taxableWorkers, laws, player}: {
    player: EmployeePlayerClass,
    taxableWorkers: number,
    laws: Record<LawId, LawLevel>
}) {
    return <Box>
        <FormLabel component="legend"><strong>Estimated Income Taxes</strong></FormLabel>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}} padding={1}>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                {player === "wc" && <><PersonIcon sx={{color: getClassColor(player)}}/><TextField
                    slotProps={{inputLabel: {shrink: true}}} label="Taxable Workers"
                    value={taxableWorkers}
                    variant="outlined"/></>}
                {player === "mc" && <>
                    <Stack>
                        <BusinessIcon sx={{color: getClassColor("cc")}}/>
                        <BusinessIcon sx={{color: getClassColor("state")}}/>
                    </Stack>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Taxable Workers"
                               value={taxableWorkers}
                               variant="outlined"/></>}
            </Stack>
            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                x
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <BalanceIcon/><TextField slotProps={{inputLabel: {shrink: true}}} label="Taxes per Worker"
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
    </Box>
}