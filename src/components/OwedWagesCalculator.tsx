import {FormLabel, Paper, Stack, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";

import type {EmployeePlayerClass} from "../data/players.ts";

export default function OwedWagesCalculator({wc, mc}: { wc: number, mc: number }) {
    return <Paper>
        <FormLabel><strong>Estimated Owed Wages</strong></FormLabel>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between", flexGrow: 1}}
               padding={1}>
            <ClassWage playerClass="wc" wage={wc}/>
            {mc !== undefined && <>
                <div style={{alignContent: "center"}}>
                    +
                </div>
                <ClassWage playerClass="mc" wage={mc}/>
            </>}
            <div style={{alignContent: "center"}}>
                =
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Total Wages" value={(mc || 0) + wc}
                           sx={{flexGrow: 1}}
                           variant="outlined"/>
            </Stack>
        </Stack>
    </Paper>
}

function ClassWage({wage, playerClass}: { wage: number, playerClass: EmployeePlayerClass }) {
    const label = playerClass === "wc" ? "Working Class Wages" : "Middle Class Wages";
    return <Stack direction="row" sx={{alignContent: "center", alignItems: "center", flexGrow: 1}}>
        <PersonIcon sx={{color: playerClass === "wc" ? "red" : "goldenrod"}}/>
        <TextField slotProps={{inputLabel: {shrink: true}}} label={label} value={wage}
                   sx={{flexGrow: 1}}
                   variant="outlined"/>
    </Stack>
}