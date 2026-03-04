import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {PlayerClass} from "../../data/game.ts";
import {cloneElement, type ReactElement, type ReactNode} from "react";

function PhaseDialog({open, title, player, onConfirm, onCancel, children}: {
    children: ReactElement,
    player: PlayerClass,
    open: boolean,
    title: string,
    onConfirm?: () => void,
    onCancel?: () => void
}) {
    return <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {cloneElement(children, {player} as any)}
        </DialogContent>
        <DialogActions>
            {onConfirm && <Button onClick={onConfirm} variant="contained">
                Done
            </Button>}
            <Button onClick={onCancel} variant="contained" color="error">Cancel</Button>
        </DialogActions>
    </Dialog>;
}