import {Box, FormLabel, Stack, TextField} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";

export function ExpectedWagesCalculator({mc, cc, state}: { mc?: number, cc: number, state: number }) {
    return <Box>
        <FormLabel><strong>Estimated Earned Wages</strong></FormLabel>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}}
               padding={1}>
            {mc !== undefined && <>
                <Stack direction="row" sx={{alignContent: "center", alignItems: "center", flexGrow: 1}}>
                    <PersonIcon sx={{color: "goldenrod"}}/>
                    <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from Middle Class" value={mc}
                               variant="outlined"
                               sx={{flexGrow: 1}}
                    />
                </Stack>
                <div style={{alignContent: "center"}}>
                    +
                </div>
            </>}
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center", flexGrow: 1}}>
                <PersonIcon sx={{color: "blue"}}/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from Capitalist Class" value={cc}
                           variant="outlined"
                           sx={{flexGrow: 1}}
                />
            </Stack>
            <div style={{alignContent: "center"}}>
                +
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center", flexGrow: 1}}>
                <PersonIcon sx={{color: "grey"}}/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Wages from State"
                           value={state}
                           variant="outlined"
                           sx={{flexGrow: 1}}
                />
            </Stack>
            <div style={{alignContent: "center"}}>
                =
            </div>
            <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                <PaidIcon/>
                <TextField slotProps={{inputLabel: {shrink: true}}} label="Total Wages" value={(mc || 0) + cc + state}
                           sx={{flexGrow: 1}}
                           variant="outlined"/>
            </Stack>
        </Stack>
    </Box>
}