import SimpleWorkingClassCalculator from "./SimpleWorkingClassCalculator.tsx";
import {Button, Grid, Stack} from "@mui/material";
import {Laws} from "../Laws.tsx";
import {type ActionDispatch, useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import SimpleMiddleClassCalculator from "./SimpleMiddleClassCalculator.tsx";
import SimpleCapitalistClassCalculator from "./SimpleCapitalistClassCalculator.tsx";
import SimpleStateCalculator from "./SimpleStateCalculator.tsx";
import {getClassColor} from "../../utilities/getClassColor.ts";
import type {PlayerClass} from "../../data/players.ts";

export default function SimpleModeApp() {
    const {wc, mc, cc, state, laws, activePlayer, round, turn} = useContext(GameContext) as Game;
    const dispatch = useContext(DispatchContext) as ActionDispatch<any>;
    return <Grid container columns={{xs: 1, sm: 1, md: 1, lg: 2}} spacing={2}>
        <Grid size={1} justifyContent="space-around" flexGrow={1}>
            <Stack direction="column">
                Active Player
                <Stack direction="row" justifyContent="space-around">
                    <ActivePlayerButton label="Working Class" dispatch={dispatch} playerClass="wc" currentActivePlayer={activePlayer}/>
                    {mc && <ActivePlayerButton label="Middle Class" dispatch={dispatch} playerClass="mc" currentActivePlayer={activePlayer}/>}
                    <ActivePlayerButton label="Capitalist Class" dispatch={dispatch} playerClass="cc" currentActivePlayer={activePlayer}/>
                    {mc && <ActivePlayerButton label="State" dispatch={dispatch} playerClass="state" currentActivePlayer={activePlayer}/>}
                    {round !== 5 && <Button variant="contained" onClick={() => dispatch({
                        type: "end_round"
                    })}>
                        End Round (Round {round} Turn {turn})
                    </Button>}
                    {round === 5 && <Button variant="contained" onClick={() => dispatch({
                        type: "end_turn"
                    })}>
                        End Turn (Round {round} Turn {turn})
                    </Button>}
                </Stack>
            </Stack>

        </Grid>
        <Grid size={2}>
            <Laws/>
        </Grid>
        <Grid size={1}>
            <SimpleWorkingClassCalculator mc={mc} state={state} cc={cc} wc={wc} laws={laws} sx={{height: "100%"}}/>
        </Grid>
        {mc && <Grid size={1}>
            <SimpleMiddleClassCalculator mc={mc} cc={cc} state={state} laws={laws} sx={{height: "100%"}}/>
        </Grid>}
        <Grid size={1}>
            <SimpleCapitalistClassCalculator cc={cc} laws={laws} sx={{height: "100%"}}/>
        </Grid>
        <Grid size={1}>
            <SimpleStateCalculator state={state} laws={laws} sx={{height: "100%"}}/>
        </Grid>
    </Grid>
}

interface ActivePlayerButtonProps {
    label: string,
    currentActivePlayer: string,
    dispatch: (...args: any) => void,
    playerClass: PlayerClass
}

function ActivePlayerButton({currentActivePlayer, label, dispatch, playerClass}: ActivePlayerButtonProps) {
    return <Button variant="contained"
                   onClick={() => dispatch({type: "active_player", activePlayer: playerClass})}
                   sx={{
                       backgroundColor: getClassColor(playerClass, playerClass === currentActivePlayer ? 1 : .8),
                       color: "#F5F5F4",
                       boxShadow:  `0px 0px 4px 8px ${getClassColor(playerClass, currentActivePlayer === playerClass ? 0.4 : 0.0 )}`
                   }}>{label}</Button>
}