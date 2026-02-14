import {useReducer, useState} from 'react'
import './App.css'
import {initialGameState, type PlayerClass} from "./data/game.ts";
import reducer from "./state/Reducers.ts";
import {DispatchContext, GameContext} from "./state/GameContext.ts";
import CapitalistsView from "./components/capitalists/CapitalistsView.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@mui/material";
import {ChangeLog} from "./ChangeLog.tsx";
import {PhasesBar} from "./components/PhasesBar.tsx";
import {PlayerBar} from "./components/PlayerBar.tsx";
import {WorkingClassView} from "./components/workers/WorkingClassView.tsx";
import {MiddleClassView} from "./components/middle class/MiddleClassView.tsx";
import {StateView} from "./components/state/StateView.tsx";

function App() {
    const [state, dispatch] = useReducer(reducer, {game: initialGameState, openDialog: null});
    const [changeLogOpen, setChangeLogOpen] = useState(true);
    const [shownPage, setShownPage] = useState<PlayerClass>("wc");

    return (
        <GameContext value={state.game}>
            <DispatchContext value={dispatch}>
                <PlayerBar onChange={value => setShownPage(value)}/>
                <div className="content">
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
            </DispatchContext>
        </GameContext>

    )
}

export default App
