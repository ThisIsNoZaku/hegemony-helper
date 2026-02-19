import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";

function StartOfTurnDialog({startOfTurnResult, open, onClose}: { startOfTurnResult: any, loans: number, open: boolean, onClose: () => void }) {
    return <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Stack>
                <div>
                    {startOfTurnResult.loans > 0 ? `Pay $${startOfTurnResult.loans * 5} in interest on your loans.` : ""}
                </div>
                <div>
                    Draw 5 Action Cards.
                </div>
                <div>
                    Discard any available companies and refill to 4.
                </div>
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