import {useEffect, useReducer, useState} from 'react'
import './App.css'
import {initialGameState} from "./data/game.ts";
import reducer, {type ReducerAction, type SetGameData} from "./state/Reducers.ts";
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
import stateDigest from "./utilities/state/stateDigest.ts";

type mode = "simple" | "full";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        game: initialGameState,
        openDialog: null
    });

    const [changeLogOpen, setChangeLogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    const [shownPage, setShownPage] = useState<PlayerClass>("wc");
    const [gameCode, setGameCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const params = new URLSearchParams(window.location.search);

    function hostGame(mode: string, players: string) {
        connectWebsocket().then(() => {
            gameWebSocket.hostGame(mode, players);
            setLoading(null)
        });
        setLoading(`${mode}-${players}`);

        return () => {
            gameWebSocket.disconnect();
        }
    }

    function joinGame(code: string) {
        connectWebsocket().then(() => {
            gameWebSocket.joinGame(code.toUpperCase());
            setLoading(null);
        });
        setLoading("joining");
    }

    function enterGame(code: string) {
        connectWebsocket().then(() => {
            gameWebSocket.enterGame(code.toUpperCase());
            setLoading(null);
        });
    }

    useEffect(() => {
        setGameCode(params.get("gameCode"));

        if (params.get("mode") === "undefined" || params.get("players") === "undefined") {
            window.location.search = "";
            return;
            ;
        }

        if (params.has("mode", "simple")) {
            setMode("simple");
            return;
        }
        setChangeLogOpen(true);
    }, [window.location.search]);

    useEffect(() => {
        if (gameCode) {
            enterGame(gameCode);
        }
    }, [gameCode]);

    const [mode, setMode] = useState<mode | undefined>();

    async function connectWebsocket() {
        await gameWebSocket.connect({
            onOpen: () => {
                console.log("WebSocket opened");
                setIsConnected(true);
                if (gameCode) {
                    gameWebSocket.enterGame(gameCode);
                }
            },
            onEntered: () => {
                console.log("WebSocket entered game");
            },
            onJoined: (code, mode, players) => {
                console.log("WebSocket joining game");
                const params = new URLSearchParams(window.location.search);
                params.set("mode", mode);
                params.set("players", players);
                params.set("gameCode", code);
                window.location.search = params.toString();
            },
            onGuestJoined: async (guestId) => {
                console.log('Guest joined:', guestId);
                // Send current game state to new guest
                gameWebSocket.sendMessage({
                    stateDigest: await stateDigest(state.game),
                    data: {
                        type: "reset",
                        data: state.game
                    } as SetGameData
                });
            },
            onGameData: async (message: { stateDigest: string, data: ReducerAction }) => {
                // TODO: Validate that the previous game state hash matches ours.
                // TODO: We need to reconcile the states if not matching.

                console.log('Received game data:', message);
                // FIXME
                message.data.sentBy = (message as any).sentBy;
                dispatch(message.data);
            },
            onError: (message) => {
                setError(message);
                setLoading(null);
                if (message === "Room not found or expired") {
                    setTimeout(() => {
                        window.location.search = "";
                    }, 1000);
                }
            },
            onClose: () => {
                setIsConnected(false);
            },
        }).catch(() => {
            setError("Failed to connect to server");
            setLoading(null);
        });
        dispatch({
            type: "connect",
            data: gameWebSocket
        })
    }

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

    // Sync game state to connected clients when hosting
    // useEffect(() => {
    //     if (gameCode && isConnected) {
    //         gameWebSocket.sendGameData(state.game);
    //     }
    // }, [state.game, gameCode, isConnected]);

    return (
        <GameContext value={state.game}>
            <DispatchContext value={dispatch}>
                <Snackbar
                    open={!!error}
                    autoHideDuration={10 * 1000}
                    onClose={() => setError(null)}
                    message={error}
                />
                {gameCode &&
                    <AppBar sx={{position: "fixed", height: "60px", justifyContent: "center"}}>Share This Code To
                        Let
                        Others
                        Join: {gameCode}</AppBar>}
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
                                    hostGame("simple", "2");
                                }}>
                                    {loading === "simple-2" ? <CircularProgress color="secondary" size={20}
                                                                                style={{marginLeft: 10}}/> : "Host Game Simple Mode (2P)"}
                                </Button>
                            </Tooltip>
                            <Tooltip title="Allow others to connect to your game and share the game information.">
                                <Button variant="contained" onClick={() => {
                                    hostGame("simple", "3+")
                                }}>
                                    {loading === "simple-3+" ? <CircularProgress color="secondary" size={20}
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
                        <TextField value={gameCode} onChange={e => setGameCode(e.target.value)} label="Join Code"/>
                        <Button onClick={() => {
                            joinGame(gameCode!);
                        }} disabled={loading === "joining"}>
                            {loading === "joining" ? <CircularProgress size={20}/> : "Join"}
                        </Button>
                    </DialogContent>
                </Dialog>
            </DispatchContext>
        </GameContext>
    )
}

export default App
