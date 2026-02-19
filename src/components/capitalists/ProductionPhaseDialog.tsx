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
import type {Player, PlayerClass} from "../../data/game.ts";
import type {CapitalistProductionPhaseResult} from "../../data/capitalists.ts";

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
    production: CapitalistProductionPhaseResult
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            {player === "cc" && <DialogTitle>Capitalist Class Production</DialogTitle>}
            {player === "wc" && <DialogTitle>Working Class Production</DialogTitle>}
            <DialogContent>
                <Grid spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    {player !== "wc" && <PaidWages paidWages={production.paidWages}/>}
                    {(player === "wc" || player === "mc") && <ReceivedWages player={player} wages={production.earnedWages}/>}
                    {player === "cc" && <Box>
                        <FormLabel><strong>Leaving you with:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Revenue" value={production.endingRevenue}/>
                            <TextField label="Capital" value={production.endingCapital}/>
                        </Stack>
                    </Box>}
                    {player !== "cc" && <Box>
                        <FormLabel><strong>Leaving you with:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Income" value={production.endingIncome}/>
                        </Stack>
                    </Box>}
                    <Box>
                        <FormLabel><strong>Collect These Resources:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            {player !== "state" && <TextField
                                label="Food"
                                value={production.output.food}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><FoodIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "state" && player !== "wc" && <TextField
                                label="Luxuries"
                                value={production.output.luxuries}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><LuxuryIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "wc" &&<TextField
                                label="Health"
                                value={production.output.health}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><HealthIcon/></InputAdornment>
                                }}
                            />}
                            {player !== "wc" && <TextField
                                label="Education"
                                value={production.output.education}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EducationIcon/></InputAdornment>
                                }}
                            />}
                            <TextField
                                label="Influence"
                                value={production.output.influence}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><InfluenceIcon/></InputAdornment>
                                }}
                            />
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