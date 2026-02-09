import {Button, Grid} from "@mui/material";
import type {
    UndoPlayCardAction,
    UpdateCapitalistPlayerAction,
    UpdateWorkingClassPlayerAction
} from "../state/Reducers.ts";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import type {Game, PlayerClass} from "../data/game.ts";

export type AllowedButtons = "play_special_card" | "loans";

export function PlayerActionBar({enabledButtons, player, setSpecialCardDialogOpen, lastCardPlayed}: {
    enabledButtons: Record<string, boolean>,
    player: PlayerClass,
    setSpecialCardDialogOpen: (open: boolean) => void,
    lastCardPlayed?: Record<string, any>
}) {
    const dispatch = useContext(DispatchContext);
    const {workingClass, capitalists, middleClass, state} = useContext(GameContext) as Game;

    const undoCardPlay = () => {
        dispatch!({type: "undo_play_card", player} as UndoPlayCardAction);
    }

    const takeLoan = () => {
        switch (player) {
            case "cc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "cc",
                        playerData: {...capitalists, loans: capitalists.loans + 1, capital: capitalists.capital + 50}
                    } as UpdateCapitalistPlayerAction)
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...workingClass, loans: workingClass.loans + 1, income: workingClass.income + 50}
                    } as UpdateWorkingClassPlayerAction)
                break
        }
    }

    const repayLoan = () => {
        switch (player) {
            case "cc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "cc",
                        playerData: {...capitalists, loans: capitalists.loans - 1, income: capitalists.capital - 50}
                    } as UpdateCapitalistPlayerAction)
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...workingClass, loans: workingClass.loans - 1, income: workingClass.income - 50}
                    } as UpdateWorkingClassPlayerAction)
                break
        }
    }

    const passLaw = () => {
        switch (player) {
            case "cc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "cc",
                        playerData: {...capitalists, points: capitalists.points + 3}
                    } as UpdateCapitalistPlayerAction);
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...workingClass, points: workingClass.points + 3}
                    } as UpdateWorkingClassPlayerAction);
                break;
        }
    }

    const supportLaw = () => {
        switch (player) {
            case "cc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "cc",
                        playerData: {...capitalists, points: capitalists.points + 1}
                    } as UpdateCapitalistPlayerAction);
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...workingClass, points: workingClass.points + 1}
                    } as UpdateWorkingClassPlayerAction);
                break;
        }
    }

    return <Grid container size={4} columns={{xs: 3, sm: 6}} spacing={1}>
        <Grid size={1}>
            <Button variant="contained" onClick={() => setSpecialCardDialogOpen(true)}
                    sx={{height: "100%"}}
            >
                Play a special card
            </Button>
        </Grid>
        <Grid size={1}>
            <Button variant="contained"
                    onClick={undoCardPlay}
                    disabled={!lastCardPlayed}
                    sx={{height: "100%"}}
            >
                Undo last card ({lastCardPlayed?.name})
            </Button>
        </Grid>

        <Grid size={1}>
            <Button onClick={takeLoan} variant="contained"
                    sx={{height: "100%"}}
            >
                Take Loan
            </Button>
        </Grid>

        <Grid size={1}>
            <Button onClick={repayLoan} variant="contained"
                    sx={{height: "100%"}}
            >
                Repay Loan
            </Button>
        </Grid>
        <Grid size={1}>
            <Button variant="contained" onClick={passLaw}
                    sx={{height: "100%"}}
            >
                Pass a Law (+3★)
            </Button>
        </Grid>
        <Grid size={1}>
            <Button variant="contained" onClick={supportLaw}
                    sx={{height: "100%"}}
            >
                Support a Law (+1★)
            </Button>
        </Grid>
    </Grid>
}