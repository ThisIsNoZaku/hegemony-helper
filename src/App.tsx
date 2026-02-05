import {useReducer, useState} from 'react'
import './App.css'
import {initialGameState} from "./data/game.ts";
import reducer, {Actions} from "./state/Reducers.ts";
import {DispatchContext, GameContext} from "./state/GameContext.ts";
import CapitalistsView from "./components/capitalists/CapitalistsView.tsx";
import {AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Toolbar} from "@mui/material";
import {ChangeLog} from "./ChangeLog.tsx";

function App() {
    const [state, dispatch] = useReducer(reducer, initialGameState);
    const [changeLogOpen, setChangeLogOpen] = useState(true);

    return (
        <GameContext value={state}>
            <DispatchContext value={dispatch}>
                <CapitalistsView/>
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
                <AppBar position="sticky" sx={{marginTop: 10, top: 'auto', bottom: 0}}>
                    <Toolbar variant="regular" sx={{justifyContent: "space-between"}}>
                        <Button variant={state.phase === "actions" ? "contained" : "outlined"}
                                color={state.phase === "actions" ? "success" : "inherit"}>
                            Actions
                        </Button>
                        <Button onClick={() => dispatch!(Actions.gotoPhase({from: "actions", to: "production"}))}
                                variant={state.phase === "production" ? "contained" : "outlined"}
                                color={state.phase === "production" ? "success" : "inherit"}>
                            Production
                        </Button>
                        <Button
                            variant={state.phase === "taxes" ? "contained" : "outlined"}
                            color={state.phase === "taxes" ? "success" : "inherit"}>
                            Taxes
                        </Button>
                        <Button
                            variant={state.phase === "politics" ? "contained" : "outlined"}
                            color={state.phase === "politics" ? "success" : "inherit"}>
                            Politics
                        </Button>
                        <Button
                            variant={state.phase === "scoring" ? "contained" : "outlined"}
                            color={state.phase === "scoring" ? "success" : "inherit"}>
                            Scoring
                        </Button>
                    </Toolbar>
                </AppBar>
            </DispatchContext>
        </GameContext>
    )
}

export default App
