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
import {capitalTrack} from "../data/capitalTrack.ts";
import findCapitalTrackPosition from "../utilities/findCapitalTrackPosition.ts";

function ScoringPhaseDialog({
                                open,
                                onConfirm,
                                onCancel,
                                scoring
                            }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    scoring: {
        finalCapital: number,
        startingTrackMarkerPosition: number,
        finalTrackMarkerPosition: number
    }
}) {
    const pointsGained = findCapitalTrackPosition(scoring.finalCapital) + (Math.max(0, scoring.finalTrackMarkerPosition - scoring.startingTrackMarkerPosition) * 3);
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Do Your Scoring</DialogTitle>
            <DialogContent>
                <strong>You will have:</strong>
                <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Final Capital" value={scoring.finalCapital} disabled/>
                        </Stack>
                    </Box>
                    {scoring.finalTrackMarkerPosition > scoring.startingTrackMarkerPosition &&
                        <Box>
                            <FormLabel>
                                <strong>Move the marker on your Capital Track to
                                    ${capitalTrack[scoring.finalTrackMarkerPosition][0]}/{capitalTrack[scoring.finalTrackMarkerPosition][1]}★</strong>
                            </FormLabel>
                        </Box>}
                    <Box>
                        <FormLabel><strong>Then Score:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Points" value={pointsGained} disabled/>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Next Turn</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScoringPhaseDialog;