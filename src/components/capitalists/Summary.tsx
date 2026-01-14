import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useContext, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, TextField} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CapitalTrack from "./CapitalTrack.tsx";
import SpecialCardDialog from "./SpecialCardDialog.tsx";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import type {
    PlayCardAction,
    UndoPlayCardAction,
    UpdateCapitalistPlayerAction
} from "../../state/Reducers.ts";

function Summary({
                     revenue,
                     capital,
                     loans,
                     points,
                     track,
                     estimatedFinalCapital,
                     lastCardPlayed
                 }: {
    revenue: number,
    capital: number,
    loans: number,
    estimatedFinalCapital: number,
    points: number,
    track: number,
    lastCardPlayed?: Record<string, any>
}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const {capitalists} = useContext(GameContext) as Game;
    const [capitalTrackOpen, setCapitalTrackOpen] = useState(false);

    const [specialCardDialogOpen, setSpecialCardDialogOpen] = useState(false);

    const dispatch = useContext(DispatchContext);

    return <><Paper style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "10px",
        marginBottom: "10px",
        marginTop: 15
    }}>
        <Grid container columns={4} spacing={2}>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Revenue" value={revenue}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => dispatch!(
                               {
                                   type: "update_player",
                                   player: "cc",
                                   playerData: {...capitalists, revenue: Math.max(0, Number(e.target.value))}
                               } as UpdateCapitalistPlayerAction)
                           }/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Capital" value={capital}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           sx={{backgroundColor: capital >= 0 ? 'inherit' : '#ffcccc'}}
                           onChange={(e) => dispatch!(
                               {
                                   type: "update_player",
                                   player: "cc",
                                   playerData: {...capitalists, capital: Number(e.target.value)}
                               } as UpdateCapitalistPlayerAction)
                           }/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Loans" value={loans}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => dispatch!(
                               {
                                   type: "update_player",
                                   player: "cc",
                                   playerData: {...capitalists, loans: Math.max(0, Number(e.target.value))}
                               } as UpdateCapitalistPlayerAction)
                           }/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Points" value={points}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => dispatch!(
                               {
                                   type: "update_player",
                                   player: "cc",
                                   playerData: {...capitalists, points: Math.max(0, Number(e.target.value))}
                               } as UpdateCapitalistPlayerAction)
                           }/>
            </Grid>
            {isSmall ? <Accordion sx={{width: "100%"}} expanded={capitalTrackOpen}
                                  onChange={(_e, isExpanded) => setCapitalTrackOpen(isExpanded)}>
                    <AccordionSummary expandIcon={<ArrowDownwardIcon/>}>
                        {!capitalTrackOpen &&
                            <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track}
                                          setTrack={v => dispatch!(
                                              {
                                                  type: "update_player",
                                                  player: "cc",
                                                  playerData: {...capitalists, capitalTrackPosition: v}
                                              } as UpdateCapitalistPlayerAction)
                                          }/>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track}
                                      fullTrack={true}
                                      setTrack={v => dispatch!(
                                          {
                                              type: "update_player",
                                              player: "cc",
                                              playerData: {...capitalists, capitalTrackPosition: v}
                                          } as UpdateCapitalistPlayerAction)
                                      }/>
                    </AccordionDetails>
                </Accordion> :
                <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track}
                              setTrack={v => dispatch!(
                                  {
                                      type: "update_player",
                                      player: "cc",
                                      playerData: {...capitalists, capitalTrackPosition: v}
                                  } as UpdateCapitalistPlayerAction)
                              }/>}
            <Grid container size={4} columns={{xs: 3, sm: 6}} spacing={1}>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => setSpecialCardDialogOpen(true)}
                            sx={{height: "100%"}}
                    >
                        Play a special card
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained"
                            onClick={() => dispatch!({type: "undo_play_card", player: "cc"} as UndoPlayCardAction)}
                            disabled={!lastCardPlayed}
                            sx={{height: "100%"}}
                    >
                        Undo last card ({lastCardPlayed?.name})
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button onClick={() => dispatch!(
                        {
                            type: "update_player",
                            player: "cc",
                            playerData: {...capitalists, loans: loans + 1, capital: capital + 50}
                        } as UpdateCapitalistPlayerAction)} variant="contained"
                            sx={{height: "100%"}}
                    >
                        Take Loan
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button onClick={() => dispatch!(
                        {
                            type: "update_player",
                            player: "cc",
                            playerData: {...capitalists, loans: loans - 1, capital: capital - 50}
                        } as UpdateCapitalistPlayerAction)} variant="contained"
                            sx={{height: "100%"}}
                    >
                        Repay Loan
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => dispatch!(
                        {
                            type: "update_player",
                            player: "cc",
                            playerData: {...capitalists, points: points + 3}
                        } as UpdateCapitalistPlayerAction)}
                            sx={{height: "100%"}}
                    >
                        Pass a Law (+3★)
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => dispatch!(
                        {
                            type: "update_player",
                            player: "cc",
                            playerData: {...capitalists, points: points + 1}
                        } as UpdateCapitalistPlayerAction)}
                            sx={{height: "100%"}}
                    >
                        Support a Law (+1★)
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
        <SpecialCardDialog open={specialCardDialogOpen} onClose={(playedCard) => {
            setSpecialCardDialogOpen(false)
            if (playedCard) {
                dispatch!(
                    {
                        type: "play_card",
                        player: "cc",
                        card: playedCard
                    } as PlayCardAction)
            }
        }}/>
    </>
}

export default Summary;