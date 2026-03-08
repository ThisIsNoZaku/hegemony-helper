import {Button, Grid} from "@mui/material";
import type {
    UndoPlayCardAction,
    UpdateCapitalistPlayerAction, UpdateMiddleClassPlayerAction, UpdatePlayerAction,
    UpdateWorkingClassPlayerAction
} from "../state/Reducers.ts";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import type {Game} from "../data/game.ts";
import type {PlayerClass} from "../data/players.ts";

export type AllowedButtons = "play_special_card" | "loans";

export function PlayerActionBar({enabledButtons, player, setSpecialCardDialogOpen, lastCardPlayed}: {
    enabledButtons: Record<string, boolean>,
    player: PlayerClass,
    setSpecialCardDialogOpen: (open: boolean) => void,
    lastCardPlayed?: Record<string, any>
}) {
    const dispatch = useContext(DispatchContext);
    const game = useContext(GameContext) as Game;
    const {wc, cc, mc, state} = game;

    const undoCardPlay = () => {
        dispatch!({type: "undo_play_card", player} as UndoPlayCardAction);
    }

    const takeLoan = () => {
        if(player === "cc") {
            dispatch!(
                {
                    type: "update_player",
                    player: "cc",
                    playerData: {...cc, loans: cc.loans + 1, capital: cc.capital + 50}
                } as UpdateCapitalistPlayerAction)
        } else {
            dispatch!(
                {
                    type: "update_player",
                    player: player,
                    playerData: {...game[player], loans: game[player].loans + 1, income: game[player].income + 50}
                } as UpdatePlayerAction)
        }
    }

    const repayLoan = () => {
        if(game[player].loans <= 0) return; // No loans to repay
        if(player === "cc") {
            dispatch!(
                {
                    type: "update_player",
                    player: "cc",
                    playerData: {...cc, loans: cc.loans - 1, capital: cc.capital - 50}
                } as UpdateCapitalistPlayerAction)
        } else {
            dispatch!(
                {
                    type: "update_player",
                    player: player,
                    playerData: {...game[player], loans: game[player].loans - 1, income: game[player].income - 50}
                } as UpdatePlayerAction)
        }
    }

    const passLaw = () => {
        switch (player) {
            case "cc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "cc",
                        playerData: {...cc, points: cc.points + 3}
                    } as UpdateCapitalistPlayerAction);
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...wc, points: wc.points + 3}
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
                        playerData: {...cc, points: cc.points + 1}
                    } as UpdateCapitalistPlayerAction);
                break;
            case "wc":
                dispatch!(
                    {
                        type: "update_player",
                        player: "wc",
                        playerData: {...wc, points: wc.points + 1}
                    } as UpdateWorkingClassPlayerAction);
                break;
        }
    }

    return <Grid container size={4} columns={{xs: 3, sm: 6}} spacing={1}>
        {/*<Grid size={1}>*/}
        {/*    <Button variant="contained" onClick={() => setSpecialCardDialogOpen(true)}*/}
        {/*            sx={{height: "100%"}}*/}
        {/*    >*/}
        {/*        Play a special card*/}
        {/*    </Button>*/}
        {/*</Grid>*/}
        {/*<Grid size={1}>*/}
        {/*    <Button variant="contained"*/}
        {/*            onClick={undoCardPlay}*/}
        {/*            disabled={!lastCardPlayed}*/}
        {/*            sx={{height: "100%"}}*/}
        {/*    >*/}
        {/*        Undo last card ({lastCardPlayed?.name})*/}
        {/*    </Button>*/}
        {/*</Grid>*/}

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
                Repay Loan ({game[player].loans} loans)
            </Button>
        </Grid>
        {/*<Grid size={1}>*/}
        {/*    <Button variant="contained" onClick={passLaw}*/}
        {/*            sx={{height: "100%"}}*/}
        {/*    >*/}
        {/*        Pass a Law (+3★)*/}
        {/*    </Button>*/}
        {/*</Grid>*/}
        {/*<Grid size={1}>*/}
        {/*    <Button variant="contained" onClick={supportLaw}*/}
        {/*            sx={{height: "100%"}}*/}
        {/*    >*/}
        {/*        Support a Law (+1★)*/}
        {/*    </Button>*/}
        {/*</Grid>*/}
    </Grid>
}