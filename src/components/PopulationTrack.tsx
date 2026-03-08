import {Grid, Paper} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';

function calculatePopulation(workers: number) {
    if (workers >= 30) {
        return 7;
    }
    switch (workers) {
        case 12:
        case 13:
        case 14:
            return 1;
        case 15:
        case 16:
        case 17:
            return 2;
        case 18:
        case 19:
        case 20:
            return 3;
        case 21:
        case 22:
        case 23:
            return 4;
        case 24:
        case 25:
        case 26:
            return 5;
        case 27:
        case 28:
        case 29:
            return 6;
        default:
            return 0;
    }
}

export function PopulationTrack({workers, highlightColor, updatePopulation}: {
    workers: number,
    highlightColor: string,
    updatePopulation: (value: number) => void
}) {
    const population = calculatePopulation(workers);
    return <Grid container columns={22} spacing={0.5} direction="row" sx={{flexGrow: 1, width: "100%"}}>
        <Grid size={22}>
            <strong>Population</strong>
        </Grid>
        <Grid sx={{height: "100%", aspectRatio: 1, flexGrow: 1}} size={1}>
            <Paper sx={{display: "flex", height: "100%", alignContent: "center", justifyContent: "center"}} elevation={1}>
                <PersonIcon sx={{color: highlightColor, alignSelf: "center"}}/>
            </Paper>
        </Grid>
        {new Array(21).fill(null).map((_, i) => {
            const value = i + 10;
            const highlighted = value === workers || (i === 20 && workers >= 30);
            return <Grid sx={{height: "100%", aspectRatio: 1}} key={i} size={1}>
                <Paper sx={{height: "100%"}}>
                    <button onClick={() => updatePopulation(value)} style={{
                        height: "100%",
                        width: "100%",
                        color: highlighted ? "white" : "inherit",
                        backgroundColor: highlighted ? highlightColor : "inherit",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        {value}
                    </button>
                </Paper>
            </Grid>
        })}
        <Grid sx={{height: "100%", aspectRatio: 1}} size={1}>
            <Paper sx={{flexGrow: 1, height: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
                <PeopleIcon sx={{color: highlightColor, alignItems: "center"}}/>
            </Paper>
        </Grid>
        <Grid size={2}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 0 ? "white" : "inherit",
                    backgroundColor: population === 0 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    3
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 1 ? "white" : "inherit",
                    backgroundColor: population === 1 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    4
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 2 ? "white" : "inherit",
                    backgroundColor: population === 2 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    5
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 3 ? "white" : "inherit",
                    backgroundColor: population === 3 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    6
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 4 ? "white" : "inherit",
                    backgroundColor: population === 4 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    7
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 5 ? "white" : "inherit",
                    backgroundColor: population === 5 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    8
                </div>
            </Paper>
        </Grid>
        <Grid size={3}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 6 ? "white" : "inherit",
                    backgroundColor: population === 6 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    9
                </div>
            </Paper>
        </Grid>
        <Grid size={1}>
            <Paper sx={{height: "100%"}}>
                <div style={{
                    color: population === 7 ? "white" : "inherit",
                    backgroundColor: population === 7 ? highlightColor : "inherit",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    10
                </div>
            </Paper>
        </Grid>
    </Grid>
}