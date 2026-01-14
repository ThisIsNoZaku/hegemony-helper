import type {Game, LastPoliticsPhase, PlayerClass} from "../data/game.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import type {UpdatePoliticsAction} from "../state/Reducers.ts";

function PoliticsPhaseDialog({open, player, onConfirm, onCancel}: {
    player: PlayerClass,
    open: boolean,
    onCancel: () => void,
    onConfirm: () => void
}) {
    const dispatch = useContext(DispatchContext);
    const game = useContext(GameContext) as Game;
    const totalPoints = (3 * game?.lastPoliticsPhase[player as keyof LastPoliticsPhase].proposedLawsPassed) + game?.lastPoliticsPhase[player as keyof LastPoliticsPhase].supportedLawsPassed;
    return <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Politics Phase</DialogTitle>
        <DialogContent>
            <Stack>
                <div>
                    How many laws were passed that you proposed?
                </div>
                <TextField type="number"
                           value={game?.lastPoliticsPhase[player as keyof LastPoliticsPhase].proposedLawsPassed}
                           onChange={e =>dispatch!({type: "updatePolitics", player, proposedPassed: Math.max(0, Number.parseInt(e.target.value))} as UpdatePoliticsAction)}
                />
                <div>
                    How many laws were passed that you supported?
                </div>
                <TextField type="number"
                           value={game?.lastPoliticsPhase[player as keyof LastPoliticsPhase].supportedLawsPassed}
                           onChange={e =>dispatch!({type: "updatePolitics", player, supportedPassed: Math.max(0, Number.parseInt(e.target.value))} as UpdatePoliticsAction)}
                />
                <div>For a total of</div>
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