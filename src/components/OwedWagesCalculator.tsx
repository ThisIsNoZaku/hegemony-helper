import {FormLabel, Paper, Stack, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";

export default function OwedWagesCalculator({wc, mc}: { wc: number, mc: number }) {
    return <Paper>
        <FormLabel><strong>Estimated Wages</strong></FormLabel>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}}
               padding={1}>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PersonIcon sx={{color: "red"}}/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Working Class Wages" value={wc}
                           variant="outlined"/>
            </Stack>
            {mc !== undefined && <>
                <div style={{alignContent: "center"}}>
                    +
                </div>
                <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                    <PersonIcon sx={{color: "goldenrod"}}/>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Middle Class Wages" value={mc}
                               variant="outlined"/>
                </Stack></>}
            <div style={{alignContent: "center"}}>
                =
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Total Wages" value={(mc || 0) + wc}
                           variant="outlined"/>
            </Stack>
        </Stack>
    </Paper>
}