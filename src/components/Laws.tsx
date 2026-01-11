import {Grid, Paper} from "@mui/material";
import Law from "./LawToggle.tsx";

export function Laws({
                         laborLaw,
                         setLaborLaw,
                         taxLevel,
                         setTaxLevel,
                         healthLevel,
                         setHealthLevel,
                         educationLevel,
                         setEducationLevel
                     }: {
    laborLaw: 0 | 1 | 2,
    setLaborLaw: (v: 0 | 1 | 2) => void,
    taxLevel: 0 | 1 | 2,
    setTaxLevel: (v: 0 | 1 | 2) => void,
    healthLevel: 0 | 1 | 2,
    setHealthLevel: (v: 0 | 1 | 2) => void,
    educationLevel: 0 | 1 | 2,
    setEducationLevel: (v: 0 | 1 | 2) => void
}) {
    return <Paper sx={{padding: 1}}>
        <strong>Laws</strong>
        <Grid container columns={{xs: 1, sm: 4}} sx={{justifyContent: "center"}}>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Labor" value={laborLaw} setValue={setLaborLaw}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Tax" value={taxLevel} setValue={setTaxLevel}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Health" value={healthLevel} setValue={setHealthLevel}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Education" value={educationLevel} setValue={setEducationLevel}/>
            </Grid>
        </Grid>
    </Paper>
}