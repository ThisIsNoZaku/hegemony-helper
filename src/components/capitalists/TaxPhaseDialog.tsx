import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    Stack,
    TextField
} from "@mui/material";
import type {PlayerClass} from "../../data/game.ts";

export default function TaxPhaseDialog({
                                           open,
                                           onConfirm,
                                           onCancel,
                                           employmentTax,
                                           capitalTax,
                                           endingRevenue,
                                           endingCapital,
                                           endingIncome,
                                           player,
                                           incomeTax
                                       }: {
    open: boolean,
    player: PlayerClass,
    onConfirm: () => void,
    onCancel: () => void,
    employmentTax?: number,
    capitalTax?: number,
    endingRevenue?: number,
    endingCapital?: number,
    endingIncome?: number,
    incomeTax?: number
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            {player === "cc" && <DialogTitle>Capitalist Class Taxes</DialogTitle>}
            {player === "wc" && <DialogTitle>Working Class Taxes</DialogTitle>}
            <DialogContent>
                <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <FormLabel><strong>Pay your Taxes</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            {player === "cc" && <><TextField label="Employment Tax" value={employmentTax} disabled/>
                                <TextField label="Capital Tax" value={capitalTax} disabled/>
                                <TextField label="Total Taxes" value={employmentTax + capitalTax} disabled/></>}
                            {(player === "wc" || player === "mc") &&
                                <TextField label="Income Tax" value={incomeTax} disabled/>}
                        </Stack>
                    </Box>
                    <Box>
                        <FormLabel><strong>After taxes you will have:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}} direction="row">
                            <Stack direction="row">
                                {player === "cc" && <>
                                    <TextField disabled={true} label="Revenue" value={endingRevenue}/>
                                    <TextField disabled={true} label="Capital" value={endingCapital}/>
                                </>}
                                {(player === "wc" || player === "mc") &&
                                    <TextField disabled={true} label="Income" value={endingIncome}/>}
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Go to Politics</Button>
            </DialogActions>
        </Dialog>
    );
}