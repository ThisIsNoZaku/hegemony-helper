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

export default function TaxPhaseDialog({
                            open,
                            onConfirm,
                            onCancel,
                            employmentTax,
                            capitalTax,
                            endingRevenue,
                            endingCapital
                        }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    employmentTax: number,
    capitalTax: number,
    endingRevenue: number,
    endingCapital: number
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Pay Your Taxes</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Employment Tax" value={employmentTax} disabled/>
                            <TextField label="Capital Tax" value={capitalTax} disabled/>
                            <TextField label="Total Taxes" value={employmentTax + capitalTax} disabled/>
                        </Stack>
                    </Box>
                    <Box>
                        <FormLabel><strong>After taxes you will have:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}} direction="row">
                            <Stack direction="row">
                                <TextField disabled={true} label="Revenue" value={endingRevenue}/>
                                <TextField disabled={true} label="Capital" value={endingCapital}/>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Go to Scoring</Button>
            </DialogActions>
        </Dialog>
    );
}