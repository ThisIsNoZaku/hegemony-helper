import {useEffect, useReducer, useState} from 'react'
import './App.css'
import {initialGameState, initialGameState2Player} from "./data/game.ts";
import reducer, {type ReducerAction} from "./state/Reducers.ts";
import {DispatchContext, GameContext} from "./state/GameContext.ts";
import CapitalistsView from "./components/capitalists/CapitalistsView.tsx";
import {
    AppBar,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Slide,
    Snackbar,
    Stack, TextField,
    Tooltip
} from "@mui/material";
import {ChangeLog} from "./ChangeLog.tsx";
import {PhasesBar} from "./components/PhasesBar.tsx";
import {PlayerBar} from "./components/PlayerBar.tsx";
import {WorkingClassView} from "./components/workers/WorkingClassView.tsx";
import {MiddleClassView} from "./components/middle class/MiddleClassView.tsx";
import {StateView} from "./components/state/StateView.tsx";
import Dialogs from "./components/dialogs/Dialogs.tsx";
import type {PlayerClass} from "./data/players.ts";
import {ErrorBoundary} from "react-error-boundary";
import SimpleModeApp from "./components/simple/SimpleModeApp.tsx";
import {gameWebSocket} from "./utilities/networking/websocket.ts";

type mode = "simple" | "full";

function App() {
    const [state, dispatch] = useReducer(reducer, {game: initialGameState, openDialog: null});

    const [changeLogOpen, setChangeLogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    const [shownPage, setShownPage] = useState<PlayerClass>("wc");
    const [hostCode, setHostCode] = useState<string | null>(null);
    const [joinCode, setJoinCode] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<string | null>(null);
    const [networking, setNetworking] = useState<"hosting" | "joining" | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hostedCode = params.get("hostedCode");
        if (hostedCode) {
            setHostCode(hostedCode);
        }
        if (params.has("mode", "simple")) {
            setMode("simple");
            if (params.get("players") === "2") {
                dispatch({type: "reset", data: initialGameState2Player} as ReducerAction);
            } else {
                dispatch({type: "reset", data: initialGameState} as ReducerAction);
            }
            return;
        }
        setChangeLogOpen(true);
    }, []);

    const [mode, setMode] = useState<mode | undefined>();

    function create2PlayerGame() {
        const params = new URLSearchParams(window.location.search);
        params.set("mode", "simple");
        params.set("players", "2");
        window.location.search = params.toString();
    }

    function createFullGame() {
        const params = new URLSearchParams(window.location.search);
        params.set("mode", "simple");
        params.set("players", "3+");
        window.location.search = params.toString();
    }

    useEffect(() => {
        if (networking === "hosting") {
            gameWebSocket.connect({
                onOpen: () => {
                    setIsConnected(true);
                    gameWebSocket.hostGame();
                },
                onHosted: (code) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("mode", "simple");
                    params.set("players", loading === "simple-2p" ? "2" : "3+");
                    params.set("hostedCode", code);
                    window.location.search = params.toString();
                },
                onGuestJoined: (guestId) => {
                    console.log('Guest joined:', guestId);
                    // Send current game state to new guest
                    gameWebSocket.sendGameData(state.game);
                },
                onGameData: (data) => {
                    console.log('Received game data:', data);
                    // Handle incoming data from guests if needed
                },
                onError: (message) => {
                    setError(message);
                    setLoading(null);
                },
                onClose: () => {
                    setIsConnected(false);
                    setNetworking(null);
                },
            }).catch(() => {
                setError("Failed to connect to server");
                setLoading(null);
                setNetworking(null);
            });

            return () => {
                gameWebSocket.disconnect();
            };
        }
    }, [networking]);

    // Sync game state to connected clients when hosting
    useEffect(() => {
        if (hostCode && isConnected) {
            gameWebSocket.sendGameData(state.game);
        }
    }, [state.game, hostCode, isConnected]);

    function connectToHost() {
        setLoading("joining");
        gameWebSocket.connect({
            onOpen: () => {
                setIsConnected(true);
                gameWebSocket.joinGame(joinCode.toUpperCase());
            },
            onJoined: (code) => {
                console.log('Joined game:', code);
                setJoinDialogOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set("mode", "simple");
                params.set("joinedCode", code);
                window.location.search = params.toString();
            },
            onGameData: (data) => {
                console.log('Received game state:', data);
                dispatch({type: "reset", data: data} as ReducerAction);
            },
            onError: (message) => {
                setError(message);
                setLoading(null);
            },
            onClose: () => {
                setIsConnected(false);
            },
        }).catch(() => {
            setError("Failed to connect to server");
            setLoading(null);
        });
    }

    return (
        <GameContext value={state.game}>
            <DispatchContext value={dispatch}>
                <Snackbar
                    open={!!error}
                    autoHideDuration={10 * 1000}
                    onClose={() => setError(null)}
                    message={error}
                />
                {hostCode &&
                    <AppBar sx={{position: "fixed", height: "60px", justifyContent: "center"}}>Share This Code To Let
                        Others
                        Join: {hostCode}</AppBar>}
                {!mode && <Dialog open={!mode}>
                    <DialogTitle>Choose a mode</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            <Tooltip title="Basic calculators, little automation and state tracking.">
                                <Button onClick={create2PlayerGame} variant="contained" fullWidth>
                                    Simple Mode (2P)
                                </Button>
                            </Tooltip>
                            <Tooltip title="Basic calculators, little automation and state tracking.">
                                <Button variant="contained" onClick={createFullGame} fullWidth>
                                    Simple Mode (3P/4P)
                                </Button>
                            </Tooltip>
                            <Divider/>
                            <Tooltip title="Allow others to connect to your game and share the game information.">
                                <Button variant="contained" onClick={() => {
                                    setLoading("simple-2p");
                                    setNetworking("hosting");
                                }}>
                                    {loading === "simple-2p" ? <CircularProgress color="secondary" size={20}
                                                                                 style={{marginLeft: 10}}/> : "Host Game Simple Mode (2P)"}
                                </Button>
                            </Tooltip>
                            <Tooltip title="Allow others to connect to your game and share the game information.">
                                <Button variant="contained" onClick={() => {
                                    setLoading("simple-3p");
                                    setNetworking("hosting");
                                }}>
                                    {loading === "simple-3p" ? <CircularProgress color="secondary" size={20}
                                                                                 style={{marginLeft: 10}}/> : "Host Game Simple Mode (3+P)"}
                                </Button>
                            </Tooltip>
                            <Divider/>
                            <Tooltip title="Connect to someone elses' game.">
                                <Button variant="contained" onClick={() => {
                                    setJoinDialogOpen(true);
                                }}>
                                    Connect to Game
                                </Button>
                            </Tooltip>
                        </Stack>
                    </DialogContent>
                </Dialog>}
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
                    <Dialogs activePlayer={shownPage} game={state.game}/>
                </>}
                {changeLogOpen && <Dialog open={changeLogOpen}>
                    <DialogTitle>Change Log</DialogTitle>
                    <DialogContent>
                        <div style={{maxHeight: 600, overflowY: "auto"}}>
                            <ChangeLog/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setChangeLogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>}
                <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
                    <DialogTitle>Join Game</DialogTitle>
                    <DialogContent>
                        <TextField value={joinCode} onChange={e => setJoinCode(e.target.value)} label="Join Code"/>
                        <Button onClick={connectToHost} disabled={loading === "joining"}>
                            {loading === "joining" ? <CircularProgress size={20}/> : "Join"}
                        </Button>
                    </DialogContent>
                </Dialog>
            </DispatchContext>
        </GameContext>
    )
}

export default App
