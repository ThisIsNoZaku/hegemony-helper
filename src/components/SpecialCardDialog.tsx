import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import specialCards from "../data/specialCards.ts";

export default function SpecialCardDialog({open, onClose}: { open: boolean, onClose: (card?: { name: string }) => void }) {
    return <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Stack spacing={1}>
                {specialCards.map(card => <Button onClick={() => onClose(card)} variant="contained">
                    {card.name}
                </Button>)}
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose(undefined)}>Close</Button>
        </DialogActions>
    </Dialog>
}