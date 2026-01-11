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
import {EducationIcon, FoodIcon, HealthIcon, LuxuryIcon} from "./Icons.tsx";

export default function ProductionPhaseDialog({
                                   open,
                                   onConfirm,
                                   onCancel,
                                   production
                               }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    production: {
        wages: { mc: number, wc: number, total: number },
        output: { food: number, luxuries: number, health: number, education: number },
        startingCapital: number,
        startingRevenue: number,
        endingCapital: number,
        endingRevenue: number
    }
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Do Your Production</DialogTitle>
            <DialogContent>
                <Grid spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <FormLabel><strong>Pay These Wages:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Working Class Wages" value={production.wages.wc}/>
                            <TextField label="Middle Class Wages" value={production.wages.mc}/>
                        </Stack>
                    </Box>
                    <Box>
                        <FormLabel><strong>Collect These Resources:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField
                                label="Food"
                                value={production.output.food}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><FoodIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Luxuries"
                                value={production.output.luxuries}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><LuxuryIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Health"
                                value={production.output.health}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><HealthIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Education"
                                value={production.output.education}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EducationIcon/></InputAdornment>
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