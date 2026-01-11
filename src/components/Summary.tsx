import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Stack, TextField} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CapitalTrack from "./CapitalTrack.tsx";
import SpecialCardDialog from "./SpecialCardDialog.tsx";

function Summary({
                     revenue,
                     capital,
                     loans,
                     setLoans,
                     points,
                     track,
                     setRevenue,
                     setCapital,
                     setPoints,
                     setTrack,
                     estimatedFinalCapital,
                     lastCardPlayed,
                     setLastCardPlayed
                 }: {
    revenue: number,
    capital: number,
    loans: number,
    estimatedFinalCapital: number,
    points: number,
    track: number,
    setRevenue: (r: number) => void,
    setLoans: (l: number) => void,
    setCapital: (c: number) => void,
    setPoints: (p: number) => void,
    setTrack: (t: number) => void,
    lastCardPlayed: Record<string, any> | null,
    setLastCardPlayed: (card: Record<string, any> | null) => void
}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [capitalTrackOpen, setCapitalTrackOpen] = useState(false);

    const [specialCardDialogOpen, setSpecialCardDialogOpen] = useState(false);

    function playCard(card: Record<string, any>) {
        switch (card.name) {
            case "Offshore Companies":
                card.amountMoved = Math.floor(revenue / 2);
                setCapital(capital + card.amountMoved);
                setRevenue(revenue - card.amountMoved);
                break;
            case "Buy Private Island":
                setCapital(capital - 50);
                setPoints(points + 7);
                break;
        }
        setLastCardPlayed(card);
    }

    function undoLastCardPlay() {
        if (lastCardPlayed) {
            switch (lastCardPlayed?.name) {
                case "Offshore Companies":
                    setCapital(capital - lastCardPlayed.amountMoved);
                    setRevenue(revenue + lastCardPlayed.amountMoved);
                    break;
                case "Buy Private Island":
                    setCapital(capital + 50);
                    setPoints(points - 7);
                    break;
            }
        }
        setLastCardPlayed(null)
    }


    return <><Paper style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "10px",
        marginBottom: "10px",
        marginTop: 15
    }}>
        <Grid container columns={4} spacing={1}>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Revenue" value={revenue}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Capital" value={capital}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           sx={{backgroundColor: capital >= 0 ? 'inherit' : '#ffcccc'}}
                           onChange={(e) => setCapital(Number(e.target.value))}/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Loans" value={loans}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setLoans(Number(e.target.value))}/>
            </Grid>
            <Grid size={{xs: 4, sm: 1}}>
                <TextField label="Points" value={points}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setPoints(Number(e.target.value))}/>
            </Grid>
            {isSmall ? <Accordion sx={{width: "100%"}} expanded={capitalTrackOpen}
                                  onChange={(e, isExpanded) => setCapitalTrackOpen(isExpanded)}>
                    <AccordionSummary expandIcon={<ArrowDownwardIcon/>}>
                        {!capitalTrackOpen &&
                            <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track} setTrack={setTrack}/>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track} setTrack={setTrack}
                                      fullTrack={true}/>
                    </AccordionDetails>
                </Accordion> :
                <CapitalTrack estimatedFinalCapital={estimatedFinalCapital} track={track} setTrack={setTrack}/>}
            <Grid container size={4} columns={6}>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => setSpecialCardDialogOpen(true)}>
                        Play a special card
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={undoLastCardPlay}
                            sx={{visibility: lastCardPlayed ? "visible" : "hidden"}}>
                        Undo last card ({lastCardPlayed?.name})
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button onClick={() => {setLoans(loans + 1); setCapital(capital + 50)}} variant="contained">
                        Take Loan
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button onClick={() => {setLoans(loans - 1); setCapital(capital - 50)}} variant="contained">
                        Pay back Loan
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => setPoints(points + 3)}>
                        Pass a Law (+3★)
                    </Button>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={() => setPoints(points + 1)}>
                        Support a Law (+1★)
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
        <SpecialCardDialog open={specialCardDialogOpen} onClose={(playedCard) => {
            setSpecialCardDialogOpen(false)
            if (playedCard) {
                playCard(playedCard);
            }
        }}/>
    </>
}

export default Summary;