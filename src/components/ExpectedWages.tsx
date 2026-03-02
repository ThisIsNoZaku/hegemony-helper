import {FormLabel, Paper, Stack, TextField} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";

export function ExpectedWagesCalculator({mc, cc, state}: { mc?: number, cc: number, state: number }) {
    return <Paper>
        <FormLabel><strong>Estimated Wages</strong></FormLabel>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}}
               padding={1}>
            {mc !== undefined && <>
                <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                    <PersonIcon sx={{color: "goldenrod"}}/>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from Middle Class" value={mc}
                               variant="outlined"/>
                </Stack>
                <div style={{alignContent: "center"}}>
                    +
                </div>
            </>}
            {cc !== undefined && <>

                <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                    <PersonIcon sx={{color: "blue"}}/>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from Capitalist Class" value={cc}
                               variant="outlined"/>
                </Stack>
            </>}
            {state !== undefined && <>
                <div style={{alignContent: "center"}}>
                    +
                </div>
                <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                    <PersonIcon sx={{color: "grey"}}/>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from Capitalist Class"
                               value={state}
                               variant="outlined"/>
                </Stack>
            </>}
            <div style={{alignContent: "center"}}>
                =
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Total Wages" value={(mc || 0) + cc + state}
                           variant="outlined"/>
            </Stack>
        </Stack>
    </Paper>
}