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
import {capitalTrack} from "../../data/capitalTrack.ts";
import findCapitalTrackPosition from "../../utilities/findCapitalTrackPosition.ts";
import type {PlayerClass} from "../../data/players.ts";
import type {CapitalistScoringPhaseResult} from "../../data/capitalists/capitalistScoringPhaseResult.ts";

function ScoringPhaseDialog({
                                open,
                                onConfirm,
                                onCancel,
                                scoring,
                                player
                            }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    player: PlayerClass,
    scoring: CapitalistScoringPhaseResult
}) {
    const pointsGained = calculateScore(player, scoring);
    return <Dialog open={open} onClose={onCancel}>
        {player === "cc" && <DialogTitle>Capitalist Class Scoring</DialogTitle>}
        <DialogContent>
            <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                {player === "cc" && <><Box>
                    <Stack spacing={1} sx={{marginTop: 1}}>
                        <TextField label="Final Capital" value={scoring.finalCapital} disabled/>
                    </Stack>
                </Box>
                    {scoring.finalTrackMarkerPosition > scoring.startingTrackMarkerPosition &&
                        <Box>
                            <FormLabel>
                                <strong>Move the marker on your Capital Track from
                                    ${capitalTrack[scoring.startingTrackMarkerPosition][0]}/{capitalTrack[scoring.startingTrackMarkerPosition][1]}★
                                    to
                                    ${capitalTrack[scoring.finalTrackMarkerPosition][0]}/{capitalTrack[scoring.finalTrackMarkerPosition][1]}★
                                </strong>
                            </FormLabel>
                        </Box>}
                </>}
                <Box>
                    <FormLabel><strong>Then Score:</strong></FormLabel>
                    <Stack spacing={1} sx={{marginTop: 1}}>
                        <TextField label="Points" value={`${pointsGained}★`} disabled/>
                    </Stack>
                </Box>
            </Stack>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between"}}>
            <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
            <Button onClick={onConfirm} variant="contained">Done, Next Turn</Button>
        </DialogActions>
    </Dialog>
}

function calculateScore(player: PlayerClass, scoring: CapitalistScoringPhaseResult) {
    switch (player) {
        case "cc":
            return findCapitalTrackPosition(scoring.finalCapital) + (Math.max(0, scoring.finalTrackMarkerPosition - scoring.startingTrackMarkerPosition) * 3);
        case "wc":
            return 0;
    }
}

export default ScoringPhaseDialog;