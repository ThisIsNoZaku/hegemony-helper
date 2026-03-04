import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    Grid,
    InputAdornment,
    Stack,
    TextField
} from "@mui/material";
import {EducationIcon, FoodIcon, HealthIcon, InfluenceIcon, LuxuryIcon} from "../Icons.tsx";
import type {
    EarnedWages,
    LastProductionPhase,
    PaidWages,
    PlayerClass,
    ProductionOutput
} from "../../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../../data/capitalists.ts";
import type {Player} from "../../data/players.ts";

export default function ProductionPhaseDialog({
                                                  open,
                                                  onConfirm,
                                                  onCancel,
                                                  player,
                                                  production
                                              }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    player: PlayerClass,
    production: LastProductionPhase
}) {
    const paidWages: PaidWages = (() => {
        switch (player) {
            case "cc":
                return production.capitalists.paidWages;
            case "mc":
                return production.middleClass.paidWages;
            case "state":
                return production.state.paidWages;
        }
    })();
    const earnedWages: EarnedWages = (() => {
        switch (player) {
            case "wc":
                return production.workingClass.earnedWages;
            case "mc":
                return production.middleClass.earnedWages;
            default:
                return {
                    cc: 0,
                    mc: 0,
                    state: 0
                }
        }
    })();
    const endingIncome = (() => {
        switch (player) {
            case "wc":
                return production.workingClass.endingIncome;
            case "mc":
                return production.middleClass.endingIncome;
            default:
                return 0;
        }
    })();
    const output: ProductionOutput = (() => {
        switch (player) {
            case "cc":
                return production.capitalists.output;
            case "mc":
                return production.middleClass.output;
            case "state":
                return production.state.output;
            case "wc":
                return production.workingClass.output;
            default:
                return {
                    food: 0,
                    health: 0,
                    education: 0,
                    luxuries: 0,
                    influence: 0
                }
        }
    })();
    return (
        <Dialog open={open} onClose={onCancel}>
            {player === "cc" && <DialogTitle>Capitalist Class Production</DialogTitle>}
            {player === "wc" && <DialogTitle>Working Class Production</DialogTitle>}
            <DialogContent>
                <Grid spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    {player !== "wc" && <PaidWages paidWages={paidWages}/>}
                    {(player === "wc" || player === "mc") && <ReceivedWages player={player} wages={earnedWages}/>}
                    {player === "cc" && <Box>
                        <FormLabel><strong>Leaving you with:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Revenue" value={production.capitalists.endingRevenue}/>
                            <TextField label="Capital" value={production.capitalists.endingCapital}/>
                        </Stack>
                    </Box>}
                    {player !== "cc" && <Box>
                        <FormLabel><strong>Leaving you with:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Income" value={endingIncome}/>
                        </Stack>
                    </Box>}
                    <Box>
                        <FormLabel><strong>Collect These Resources:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            {player !== "state" && <TextField
                                label="Food"
                                value={output.food}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><FoodIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "state" && player !== "wc" && <TextField
                                label="Luxuries"
                                value={output.luxuries}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><LuxuryIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "wc" && <TextField
                                label="Health"
                                value={output.health}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><HealthIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "wc" && <TextField
                                label="Education"
                                value={output.education}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EducationIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "wc" && <TextField
                                label="Influence"
                                value={output.influence}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><InfluenceIcon/></InputAdornment>
                                }}
                            />}
                        </Stack>
                    </Box>
                </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Go to Taxes</Button>

            </DialogActions>
        </Dialog>
    );
}

function PaidWages({paidWages}: { paidWages: { wc: number, mc: number } }) {
    return <Box>
        <FormLabel><strong>Pay These Wages:</strong></FormLabel>
        <Stack spacing={1} sx={{marginTop: 1}}>
            <TextField label="Working Class Wages" value={paidWages.wc}/>
            <TextField label="Middle Class Wages" value={paidWages.mc}/>
        </Stack>
    </Box>
}

function ReceivedWages({wages, player}: { wages: { cc: number, mc: number, state: number }, player: "wc" | "mc" }) {
    return <Box>
        <FormLabel><strong>Receive these wages:</strong></FormLabel>
        <Stack spacing={1} sx={{marginTop: 1}}>
            {player === "wc" && <TextField label="From Middle Class" value={wages.mc}/>}
            <TextField label="From State" value={wages.state}/>
            <TextField label="From Capitalist Class" value={wages.cc}/>
        </Stack>
    </Box>;
}