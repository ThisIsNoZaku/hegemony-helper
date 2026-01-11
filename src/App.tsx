import {useState} from 'react'
import './App.css'
import {
    AppBar,
    Box,
    Button,
    FormLabel,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Tooltip,
} from "@mui/material";
import {type CompanyInstance} from './data/companies';
import calculateTaxMultiplier from "./utilities/calculateTaxMultiplier.ts";
import {initialGameState} from "./data/game.ts";
import calculateCapitalTax from './utilities/calculateCapitalTax.ts';
import { revenueBreakpoints } from './data/taxes.ts';
import findCapitalTrackPosition from './utilities/findCapitalTrackPosition.ts';
import Summary from './components/Summary.tsx';
import {Laws} from "./components/Laws.tsx";
import Companies from "./components/CompaniesContainer.tsx";
import ProductionPhaseDialog from "./components/ProductionPhaseDialog.tsx";
import TaxPhaseDialog from "./components/TaxPhaseDialog.tsx";
import ScoringPhaseDialog from "./components/ScoringPhaseDialog.tsx";
import Storages from './components/Storages.tsx';
import StartOfTurnDialog from "./components/StartOfTurnDialog.tsx";

function App() {
    const [phase, setPhase] = useState<"playing" | "production" | "taxes" | "scoring">("playing")
    // Laws
    const [laborLaw, setLaborLaw] = useState<0 | 1 | 2>(initialGameState.laws.labor);
    const [taxLevel, setTaxLevel] = useState<0 | 1 | 2>(initialGameState.laws.tax);
    const [healthLevel, setHealthLevel] = useState<0 | 1 | 2>(initialGameState.laws.health);
    const [educationLevel, setEducationLevel] = useState<0 | 1 | 2>(initialGameState.laws.education);
    // Companies
    const [companies, setCompanies] = useState<(CompanyInstance | null)[]>(initialGameState.capitalists.companies);

    // Goods and storage
    const [food, setFood] = useState(initialGameState.capitalists.goods.food);
    const [luxuries, setLuxuries] = useState(initialGameState.capitalists.goods.luxuries);
    const [health, setHealth] = useState(initialGameState.capitalists.goods.health);
    const [education, setEducation] = useState(initialGameState.capitalists.goods.education);

    const [track, setTrack] = useState(0);
    const [points, setPoints] = useState(0);
    const [revenue, setRevenue] = useState(initialGameState.capitalists.revenue)
    const [capital, setCapital] = useState(0)
    const [loans, setLoans] = useState(0)

    const [lastCardPlayed, setLastCardPlayed] = useState<null | Record<string, any>>(null);

    // Calculated output
    const foodOutput = companies.filter(c => c && c.workers && c.type === "food").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const luxuriesOutput = companies.filter(c => c && c.workers && c.type === "luxuries").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const healthOutput = companies.filter(c => c && c.workers && c.type === "health").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const educationOutput = companies.filter(c => c && c.workers && c.type === "education").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0);

    const taxMultiplier = calculateTaxMultiplier(taxLevel, educationLevel, healthLevel);
    const employmentTax = companies.filter(c => c !== null && c?.workers).length * taxMultiplier;

    const wcWages = companies.reduce((total, company) => {
        if (company && company.workers === "wc") {
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const mcWages = companies.reduce((total, company) => {
        if (company && company.workers === "mc") {
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const totalWages = wcWages + mcWages;

    const pretaxRevenue = revenue - totalWages;

    const preCapitalTaxRevenue = pretaxRevenue - employmentTax;

    const capitalTax = calculateCapitalTax(preCapitalTaxRevenue, taxLevel);
    const nextCorporateTaxBreakpoint = revenueBreakpoints.reduce((bp, lowest) => bp > preCapitalTaxRevenue ? Math.min(bp, lowest) : lowest, 300);

    const estimatedFinalRevenue = preCapitalTaxRevenue - capitalTax;
    const [startOfTurnDialogOpen, setStartOfTurnDialogOpen] = useState(false);

    const gotoPlayingPhase = () => {
        switch (phase) {
            case "production":
                undoProductionPhase();
                // Unto the production phase
                break;
            case "scoring":
                setStartOfTurnDialogOpen(true);
                setCapital(capital - (5 * loans)); // Pay interest on loans
            // Started a new turn
        }
        setLastProductionPhase({
            wages: {mc: 0, wc: 0, total: 0},
            output: {food: 0, luxuries: 0, health: 0, education: 0},
            startingRevenue: 0,
            startingCapital: 0,
            endingCapital: 0,
            endingRevenue: 0
        })
        setLastTaxPhase({
            employmentTax: 0,
            capitalTax: 0,
            startingRevenue: 0,
            startingCapital: 0,
            endingRevenue: 0,
            endingCapital: 0
        })
        setLastScoring({
            amountMovedToCapital: 0,
            finalCapital: 0,
            startingTrackMarkerPosition: 0,
            finalTrackMarkerPosition: 0
        })
        setLastCardPlayed(null)
        setPhase("playing")
    }

    // Effects of the last production phase
    const [lastProductionPhase, setLastProductionPhase] = useState<{
        wages: { mc: number, wc: number, total: number },
        output: { food: number, luxuries: number, health: number, education: number },
        startingRevenue: number,
        startingCapital: number,
        endingCapital: number,
        endingRevenue: number
    }>({
        wages: {mc: 0, wc: 0, total: 0},
        output: {food: 0, luxuries: 0, health: 0, education: 0},
        startingRevenue: 0,
        startingCapital: 0,
        endingCapital: 0,
        endingRevenue: 0
    })

    const gotoProductionPhase = () => {
        const productionResult = {
            wages: {
                mc: mcWages,
                wc: wcWages,
                total: totalWages
            },
            output: {
                food: foodOutput,
                luxuries: luxuriesOutput,
                health: healthOutput,
                education: educationOutput
            },
            startingRevenue: revenue,
            startingCapital: capital,
            endingRevenue: revenue - Math.min(totalWages, revenue),
            endingCapital: capital - Math.max(totalWages - revenue, 0)
        };
        setLastProductionPhase(productionResult);
        // Subtract wages from revenue
        setRevenue(productionResult.endingRevenue);
        setCapital(productionResult.endingCapital)

        setFood({...food, quantity: food.quantity + foodOutput})
        setLuxuries({...luxuries, quantity: luxuries.quantity + luxuriesOutput})
        setHealth({...health, quantity: health.quantity + healthOutput})
        setEducation({...education, quantity: education.quantity + educationOutput})
        // Add output to goods
        setPhase("production");
    }

    const undoProductionPhase = () => {
        // Take wages back
        setRevenue(lastProductionPhase.startingRevenue)
        setCapital(lastProductionPhase.startingCapital);
        // Subtract output from goods
        setFood({...food, quantity: food.quantity - lastProductionPhase.output.food})
        setLuxuries({...luxuries, quantity: luxuries.quantity - lastProductionPhase.output.luxuries})
        setHealth({...health, quantity: health.quantity - lastProductionPhase.output.health})
        setEducation({...education, quantity: education.quantity - lastProductionPhase.output.education})
    }

    // Effects of the last tax phase
    const [lastTaxPhase, setLastTaxPhase] = useState<{
        employmentTax: number,
        capitalTax: number
        startingRevenue: number,
        startingCapital: number,
        endingRevenue: number,
        endingCapital: number
    }>({
        employmentTax: 0,
        capitalTax: 0,
        startingRevenue: 0,
        startingCapital: 0,
        endingRevenue: 0,
        endingCapital: 0
    })

    const gotoTaxPhase = () => {
        setPhase("taxes");
        const actualCapitalTax = calculateCapitalTax(lastProductionPhase!.endingRevenue - employmentTax, taxLevel);
        const taxResult = {
            employmentTax,
            capitalTax: actualCapitalTax,
            startingRevenue: lastProductionPhase!.endingRevenue,
            startingCapital: lastProductionPhase!.endingCapital,
            endingRevenue: Math.max(0, lastProductionPhase!.endingRevenue - employmentTax - actualCapitalTax),
            endingCapital: lastProductionPhase!.endingCapital - Math.max(0, employmentTax + actualCapitalTax - lastProductionPhase!.endingRevenue)
        }
        setLastTaxPhase(taxResult);
        setRevenue(taxResult.endingRevenue);
        setCapital(taxResult.endingCapital);
    }

    const undoTaxPhase = () => {
        setPhase("production");
        setRevenue(lastTaxPhase.startingRevenue);
        setCapital(lastTaxPhase.startingCapital);
        setLastTaxPhase({
            employmentTax: 0,
            capitalTax: 0,
            startingRevenue: 0,
            startingCapital: 0,
            endingRevenue: 0,
            endingCapital: 0
        })
    }

    const [lastScoring, setLastScoring] = useState<{
        amountMovedToCapital: number,
        finalCapital: number,
        startingTrackMarkerPosition: number,
        finalTrackMarkerPosition: number
    }>({
        amountMovedToCapital: 0,
        finalCapital: 0,
        startingTrackMarkerPosition: 0,
        finalTrackMarkerPosition: 0
    })
    const gotoScoringPhase = () => {
        // Move all revenue to capital
        const finalCapital = lastTaxPhase.endingCapital + lastTaxPhase.endingRevenue
        // Calculate the number of moves on the capital track
        const newTrackPosition = findCapitalTrackPosition(finalCapital)
        const scoreResult = {
            finalCapital,
            amountMovedToCapital: lastTaxPhase.endingRevenue,
            startingTrackMarkerPosition: track,
            finalTrackMarkerPosition: Math.max(track, newTrackPosition)
        }
        setLastScoring(scoreResult);
        setPoints(points + newTrackPosition + (Math.max(0, newTrackPosition - track) * 3));
        setRevenue(0);
        setTrack(Math.max(track, newTrackPosition));
        setCapital(finalCapital);
        setPhase("scoring")
    }

    const undoScoringPhase = () => {
        setPhase("taxes");
        setRevenue(lastScoring.amountMovedToCapital);
        setCapital(lastScoring.finalCapital - lastScoring.amountMovedToCapital);
        setPoints(points - lastScoring.finalTrackMarkerPosition - (Math.max(0, lastScoring.finalTrackMarkerPosition - lastScoring.startingTrackMarkerPosition) * 3));
        setTrack(lastScoring.startingTrackMarkerPosition);
        setLastScoring({
            amountMovedToCapital: 0,
            finalCapital: 0,
            startingTrackMarkerPosition: 0,
            finalTrackMarkerPosition: 0
        });
    }

    return (
        <Stack spacing={2} sx={{padding: 2}}>
            <Summary revenue={revenue}
                     capital={capital}
                     estimatedFinalCapital={estimatedFinalRevenue + capital}
                     points={points}
                     loans={loans}
                     setLoans={setLoans}
                     track={track}
                     setRevenue={setRevenue}
                     setCapital={setCapital}
                     setPoints={setPoints}
                     setTrack={setTrack}
                     lastCardPlayed={lastCardPlayed}
                     setLastCardPlayed={setLastCardPlayed}
            />
            <Stack spacing={2}>
                <Laws laborLaw={laborLaw}
                      setLaborLaw={setLaborLaw}
                      taxLevel={taxLevel}
                      setTaxLevel={setTaxLevel}
                      healthLevel={healthLevel}
                      setHealthLevel={setHealthLevel}
                      educationLevel={educationLevel}
                      setEducationLevel={setEducationLevel}
                />

                <Storages
                    food={food}
                    setFood={setFood}
                    foodOutput={foodOutput}
                    luxuries={luxuries}
                    setLuxuries={setLuxuries}
                    luxuriesOutput={luxuriesOutput}
                    health={health}
                    setHealth={setHealth}
                    healthOutput={healthOutput}
                    education={education}
                    setEducation={setEducation}
                    educationOutput={educationOutput}
                />

                <Box sx={{layout: "flex"}}>
                    {/*<Accordion*/}
                    {/*    defaultExpanded>*/}
                    {/*    <AccordionSummary*/}
                    {/*        expandIcon={<ArrowDownwardIcon/>}*/}
                    {/*    >*/}
                    <strong>Companies</strong>
                    {/*</AccordionSummary>*/}
                    {/*<AccordionDetails>*/}
                    <Companies companies={companies}
                               setCompanies={updatedCompanies => setCompanies([...updatedCompanies])}
                               laborLaw={laborLaw}
                    />
                    {/*    </AccordionDetails>*/}
                    {/*</Accordion>*/}
                </Box>

                <Paper sx={{padding: 1}}>
                    <Stack spacing={2} sx={{width: "100%"}}>
                        <FormLabel><strong>Estimated Wages</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="WC Wages" value={wcWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>+</strong>
                            </div>
                            <TextField label="MC Wages" value={mcWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>
                            <TextField label="Estimated pre-tax profix/loss" value={pretaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                        </Stack>

                        <FormLabel><strong>Estimated Employment Tax</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Estimated pre-tax profix/loss" value={pretaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Est. Employment Tax" value={employmentTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>

                            <TextField label="Estimated profix/loss" value={preCapitalTaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                        </Stack>

                        <FormLabel><strong>Estimated Capital Tax</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Estimated pre-tax profix/loss" value={preCapitalTaxRevenue}
                                       disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Est. Capital Tax" value={capitalTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>

                            <TextField label="Estimated profix/loss" value={preCapitalTaxRevenue - capitalTax}
                                       disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <TextField
                                label="Next Capital Tax Amount"
                                value={`Pay $${calculateCapitalTax(nextCorporateTaxBreakpoint, taxLevel)} @ $${nextCorporateTaxBreakpoint}+ Revenue`}
                                disabled={true}/>
                        </Stack>

                        <FormLabel><strong>Post-Tax Profit/Loss</strong></FormLabel>

                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Starting Revenue" value={revenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Total Wages" value={totalWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Total Taxes" value={capitalTax + employmentTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>=</strong>
                            </div>
                            <Tooltip
                                title={(pretaxRevenue - employmentTax - capitalTax) > 0 ? "" : "You aren't gaining any capital this turn!"}>
                                <TextField label="Estimated After-tax Capital Profit/loss" disabled={true}
                                           sx={{
                                               '& *.Mui-disabled': {
                                                   color: (pretaxRevenue - employmentTax - capitalTax) > 0 ? "inherit" : "red",
                                                   WebkitTextFillColor: 'inherit'
                                               }
                                           }}
                                           value={pretaxRevenue - employmentTax - capitalTax + capital}/>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
            {lastProductionPhase &&
                <ProductionPhaseDialog open={phase === "production"} onConfirm={gotoTaxPhase}
                                       onCancel={gotoPlayingPhase} production={lastProductionPhase}/>}
            {lastTaxPhase && <TaxPhaseDialog
                open={phase === "taxes"}
                onConfirm={gotoScoringPhase}
                onCancel={undoTaxPhase}
                employmentTax={lastTaxPhase.employmentTax}
                capitalTax={lastTaxPhase.capitalTax}
                endingRevenue={lastTaxPhase?.endingRevenue as number}
                endingCapital={lastTaxPhase?.endingCapital as number}
            />}
            <ScoringPhaseDialog open={phase === "scoring"} onConfirm={() => gotoPlayingPhase()}
                                onCancel={undoScoringPhase} scoring={lastScoring}/>
            <StartOfTurnDialog
                loans={loans}
                open={startOfTurnDialogOpen}
                onClose={() => {
                    setStartOfTurnDialogOpen(false)
                }}
            />
            <AppBar position="sticky" sx={{marginTop: 10, top: 'auto', bottom: 0}}>
                <Toolbar variant="regular" sx={{justifyContent: "space-between"}}>
                    <Button onClick={() => gotoPlayingPhase}
                            variant={phase === "playing" ? "contained" : "outlined"}
                            color={phase === "playing" ? "success" : "inherit"}>
                        Playing
                    </Button>
                    <Button onClick={gotoProductionPhase}
                            variant={phase === "production" ? "contained" : "outlined"}
                            color={phase === "production" ? "success" : "inherit"}>
                        Production
                    </Button>
                    <Button onClick={() => {
                        if (phase === "taxes") {
                            gotoTaxPhase()
                        }
                    }}
                            variant={phase === "taxes" ? "contained" : "outlined"}
                            color={phase === "taxes" ? "success" : "inherit"}>
                        Taxes
                    </Button>
                    <Button onClick={gotoScoringPhase}
                            variant={phase === "scoring" ? "contained" : "outlined"}
                            color={phase === "scoring" ? "success" : "inherit"}>
                        Scoring
                    </Button>
                </Toolbar>
            </AppBar>
        </Stack>
    )
}
export default App
