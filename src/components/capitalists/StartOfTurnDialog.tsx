import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import type {PlayerClass} from "../../data/game.ts";

function StartOfTurnDialog({loans, prosperityLoss, player, open, onClose}: { player: PlayerClass, startOfTurnResult: any, loans: number, prosperityLoss?: number, open: boolean, onClose: () => void }) {
    return <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Stack>
                <div>
                    {loans > 0 ? `Pay $${loans * 5} in interest on your loans.` : ""}
                </div>
                <div>
                    Draw 5 Action Cards.
                </div>
                {(player === "cc" || player === "wc") &&<div>
                    Discard any available companies and refill to {player === "cc" ? 4 : 3}.
                </div>}
                <div>
                    Discard any Business Deals and draw new ones according to Foreign Trade.
                </div>
                <div>
                    Discard the current Export card and replace it.
                </div>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Done
            </Button>
        </DialogActions>
    </Dialog>
};

export default StartOfTurnDialog;