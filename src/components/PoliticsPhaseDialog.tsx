import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import type {PlayerClass} from "../data/players.ts";

function PoliticsPhaseDialog({open, onConfirm, onCancel, proposedLawsPassed, supportedLawsPassed, setSupportedLawsPassed, setProposedLawsPassed}: {
    player: PlayerClass,
    open: boolean,
    proposedLawsPassed: number,
    setProposedLawsPassed: (value: number) => void,
    supportedLawsPassed: number,
    setSupportedLawsPassed: (value: number) => void,
    onCancel: () => void,
    onConfirm: () => void
}) {
    const totalPoints = (3 * proposedLawsPassed) + supportedLawsPassed;
    return <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Politics Phase</DialogTitle>
        <DialogContent>
            <Stack>
                <div>
                    <strong>How many laws were passed that you proposed?</strong>
                </div>
                <TextField type="number"
                           value={proposedLawsPassed}
                           onChange={e => setProposedLawsPassed(Math.max(0, Number.parseInt(e.target.value)))}
                />
                <div>
                    <strong>How many laws were passed that you supported?</strong>
                </div>
                <TextField type="number"
                           value={supportedLawsPassed}
                           onChange={e => setSupportedLawsPassed(Math.max(0, Number.parseInt(e.target.value)))}
                />
                <strong>Total points earned:</strong>
                <TextField type="number"
                           value={totalPoints} disabled
                />

            </Stack>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between"}}>
            <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
            <Button onClick={onConfirm} variant="contained">Done, Go to Scoring</Button>
        </DialogActions>
    </Dialog>
}

export default PoliticsPhaseDialog;