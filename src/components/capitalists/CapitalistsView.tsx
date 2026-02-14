import {Box, FormLabel, Paper, Stack, TextField, Tooltip} from "@mui/material";
import CapitalistsSummary from "./CapitalistsSummary.tsx";
import {Laws} from "../Laws.tsx";
import Storages from "./Storages.tsx";
import Companies from "./CompaniesContainer.tsx";
import { calculateCapitalTax } from "../../utilities/calculateTaxes.ts";
import ProductionPhaseDialog from "./ProductionPhaseDialog.tsx";
import TaxPhaseDialog from "./TaxPhaseDialog.tsx";
import ScoringPhaseDialog from "./ScoringPhaseDialog.tsx";
import StartOfTurnDialog from "./StartOfTurnDialog.tsx";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import _ from "lodash";
import type {CompanyInstance} from "../../data/companies.ts";
import calculateCompanyOutput from "../../utilities/calculateCompanyOutput.ts";
import {revenueBreakpoints} from "../../data/taxes.ts";
import {Actions} from "../../state/Reducers";
import PoliticsPhaseDialog from "../PoliticsPhaseDialog.tsx";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import {ClassView} from "../ClassView.tsx";
import EmploymentTaxesCalculator from "../taxes/EmploymentTaxesCalculator.tsx";
import CapitalTaxesCalculator from "../taxes/CapitalTaxesCalculator.tsx";
import CapitalistExpenses from "./CapitalistExpenses.tsx";

function CapitalistsView() {
    const dispatch = useContext(DispatchContext);
    const {
        capitalists,
        laws,
        phase,
        lastProductionPhase,
        lastTaxPhase,
        lastScoringPhase
    }: Game = useContext(GameContext) as Game;
    const {revenue, capital, points, loans, capitalTrackPosition, lastCardPlayed, companies} = capitalists

    const operationalCompanies: CompanyInstance[] = companies.filter(c => c !== null && (c.workers || c.fullyAutomated))
        .map(c => c!);
    const estimatedWages = {
        mc: _.sum(operationalCompanies.filter(c => c.workers === "mc").map(c => c.wages[c.wageLevel])),
        wc: _.sum(operationalCompanies.filter(c => c.workers === "wc").map(c => c.wages[c.wageLevel]))
    }

    const pretaxRevenue = revenue - estimatedWages.wc - estimatedWages.mc;

    const estimatedEmploymentTax = calculateTaxMultiplier(laws.tax, laws.health, laws.education) * operationalCompanies.length;
    const estimatedCapitalTax = calculateCapitalTax(revenue - estimatedWages.mc - estimatedWages.wc - estimatedEmploymentTax, laws.tax);

    const estimatedFinalRevenue = revenue - estimatedWages.mc - estimatedWages.wc - estimatedEmploymentTax - estimatedCapitalTax;

    const foodOutput = _.sum(operationalCompanies.filter(c => c.type === "food").map(calculateCompanyOutput));
    const luxuriesOutput = _.sum(operationalCompanies.filter(c => c.type === "luxuries").map(calculateCompanyOutput));
    const healthOutput = _.sum(operationalCompanies.filter(c => c.type === "health").map(calculateCompanyOutput));
    const educationOutput = _.sum(operationalCompanies.filter(c => c.type === "education").map(calculateCompanyOutput));

    const nextCorporateTaxBreakpoint = _.max(revenueBreakpoints.filter(bp => bp < estimatedCapitalTax)) || revenueBreakpoints[revenueBreakpoints.length - 1];
    // Calculated output

    return <Stack spacing={2} sx={{padding: 2}}>
        <ClassView summaryContent={<CapitalistsSummary revenue={revenue}
                                                       capital={capital}
                                                       estimatedFinalCapital={estimatedFinalRevenue + capital}
                                                       points={points}
                                                       loans={loans}
                                                       track={capitalTrackPosition}
                                                       lastCardPlayed={lastCardPlayed}
        />}>
            <Laws/>

            <Storages
                foodOutput={foodOutput}
                luxuriesOutput={luxuriesOutput}
                healthOutput={healthOutput}
                educationOutput={educationOutput}
            />

            <Box sx={{layout: "flex"}}>
                <strong>Companies</strong>
                <Companies/>
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}
            </Box>

            <Paper sx={{padding: 1}}>
                <Stack spacing={2} sx={{width: "100%"}}>
                    <CapitalistExpenses revenue={revenue} companies={operationalCompanies} laws={laws}/>

                    <FormLabel><strong>Post-Tax Profit/Loss</strong></FormLabel>

                    <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{justifyContent: "space-between"}}>
                        <TextField label="Starting Revenue" value={revenue} disabled={true}
                                   sx={{
                                       '& *.Mui-disabled': {
                                           color: "inherit",
                                           WebkitTextFillColor: 'inherit'
                                       }
                                   }}/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <strong>-</strong>
                        </div>
                        <TextField label="Total Wages" value={estimatedWages.wc + estimatedWages.mc} disabled={true}
                                   sx={{
                                       '& *.Mui-disabled': {
                                           color: "inherit",
                                           WebkitTextFillColor: 'inherit'
                                       }
                                   }}/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <strong>-</strong>
                        </div>
                        <TextField label="Total Taxes" value={estimatedCapitalTax + estimatedEmploymentTax}
                                   disabled={true}
                                   sx={{
                                       '& *.Mui-disabled': {
                                           color: "inherit",
                                           WebkitTextFillColor: 'inherit'
                                       }
                                   }}/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <strong>=</strong>
                        </div>
                        <Tooltip
                            title={(pretaxRevenue - estimatedEmploymentTax - estimatedCapitalTax) > 0 ? "" : "You aren't gaining any capital this turn!"}>
                            <TextField label="Estimated After-tax Capital Profit/loss" disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {
                                               color: (pretaxRevenue - estimatedEmploymentTax - estimatedCapitalTax) > 0 ? "inherit" : "red",
                                               WebkitTextFillColor: 'inherit'
                                           }
                                       }}
                                       value={pretaxRevenue - estimatedEmploymentTax - estimatedCapitalTax + capital}/>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Paper>
        </ClassView>
        <ProductionPhaseDialog open={phase === "production"}
                               onConfirm={() => dispatch!(Actions.gotoPhase({from: "production", to: "taxes"}))}
                               onCancel={() => dispatch!(Actions.gotoPhase({to: "actions", from: "production"}))}
                               production={lastProductionPhase.capitalists}/>
        <TaxPhaseDialog
            open={phase === "taxes"}
            onConfirm={() => dispatch!(Actions.gotoPhase({to: "politics", from: "taxes"}))}
            onCancel={() => dispatch!(Actions.gotoPhase({to: "production", from: "taxes"}))}
            employmentTax={lastTaxPhase.capitalists.employmentTax}
            capitalTax={lastTaxPhase.capitalists.capitalTax}
            endingRevenue={lastTaxPhase.capitalists.endingRevenue}
            endingCapital={lastTaxPhase.capitalists.endingCapital}
        />
        <PoliticsPhaseDialog
            open={phase === "politics"}
            player={"cc"}
            onConfirm={() => dispatch!(Actions.gotoPhase({to: "scoring", from:"politics"}))}
            onCancel={() => dispatch!(Actions.gotoPhase({to: "taxes", from: "politics"}))}
        />
        <ScoringPhaseDialog open={phase === "scoring"}
                            onConfirm={() => dispatch!(Actions.gotoPhase({to: "politics", from: "scoring"}))}
                            onCancel={() => dispatch!(Actions.gotoPhase({to: "scoring", from: "politics"}))}
                            scoring={lastScoringPhase.capitalists}/>
        <StartOfTurnDialog
            loans={loans}
            open={phase === "start"}
            onClose={() => dispatch!(Actions.gotoPhase({to: "production", from: "start"}))}
        />

    </Stack>

}

export default CapitalistsView;