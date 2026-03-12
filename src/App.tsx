import {useEffect, useReducer, useState} from 'react'
import './App.css'
import {initialGameState} from "./data/game.ts";
import reducer from "./state/Reducers.ts";
import {DispatchContext, GameContext} from "./state/GameContext.ts";
import CapitalistsView from "./components/capitalists/CapitalistsView.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Tooltip} from "@mui/material";
import {ChangeLog} from "./ChangeLog.tsx";
import {PhasesBar} from "./components/PhasesBar.tsx";
import {PlayerBar} from "./components/PlayerBar.tsx";
import {WorkingClassView} from "./components/workers/WorkingClassView.tsx";
import {MiddleClassView} from "./components/middle class/MiddleClassView.tsx";
import {StateView} from "./components/state/StateView.tsx";
import Dialogs from "./components/dialogs/Dialogs.tsx";
import {useNavigate} from "react-router";
import type {PlayerClass} from "./data/players.ts";
import {ErrorBoundary} from "react-error-boundary";
import SimpleModeApp from "./components/simple/SimpleModeApp.tsx";

type mode = "simple" | "full";

function App() {
    const [state, dispatch] = useReducer(reducer, {game: initialGameState, openDialog: null});
    const [changeLogOpen, setChangeLogOpen] = useState(true);
    const [shownPage, setShownPage] = useState<PlayerClass>("wc");
    const navigate = useNavigate();
    useEffect(() => {
        const hash = window.location.hash.slice(2).split("/");
        const playerClass = hash[0] as PlayerClass;
        // const phase = hash[1];
        if (playerClass && ["wc", "mc", "cc", "state"].includes(playerClass)) {
            setShownPage(playerClass);
        } else {
            navigate("/wc/actions");
        }

    }, [window.location.hash]);

    const [mode, setMode] = useState<mode | undefined>();

    return (
        <GameContext value={state.game}>
            <DispatchContext value={dispatch}>
                <Dialog open={!mode}>
                    <DialogTitle>Choose a mode</DialogTitle>
                    <DialogContent>
                        <Tooltip title="Basic calculators, little automation and state tracking.">
                            <Button onClick={() => setMode("simple")} variant="contained" fullWidth>
                                Simple Mode
                            </Button>
                        </Tooltip>
                    </DialogContent>
                </Dialog>
                {mode === "simple" && <SimpleModeApp/>}
                {mode === "full" && <>
                    <PlayerBar onChange={value => setShownPage(value)}/>
                    <div className="content">
                        <ErrorBoundary fallback={"An error occurred."}>
                            <Slide direction="right" in={shownPage == "wc"} onChange={() => {
                            }} mountOnEnter unmountOnExit>
                                <div>
                                    <WorkingClassView/>
                                </div>
                            </Slide>
                            <Slide direction="right" in={shownPage == "mc"} onChange={() => {
                            }} mountOnEnter unmountOnExit>
                                <div>
                                    <MiddleClassView/>
                                </div>
                            </Slide>
                            <Slide direction="right" in={shownPage == "cc"} onChange={() => {
                            }} mountOnEnter unmountOnExit>
                                <div>
                                    <CapitalistsView/>
                                </div>
                            </Slide>
                            <Slide direction="right" in={shownPage == "state"} onChange={() => {
                            }} mountOnEnter unmountOnExit>
                                <div>
                                    <StateView/>
                                </div>
                            </Slide>
                        </ErrorBoundary>
                    </div>
                    <PhasesBar state={state.game} dispatch={dispatch}/>
                    <Dialog open={changeLogOpen}>
                        <DialogTitle>Change Log</DialogTitle>
                        <DialogContent>
                            <div style={{maxHeight: 600, overflowY: "auto"}}>
                                <ChangeLog/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setChangeLogOpen(false)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialogs activePlayer={shownPage} game={state.game}/>
                </>}
            </DispatchContext>
        </GameContext>
    )
}

export default App
