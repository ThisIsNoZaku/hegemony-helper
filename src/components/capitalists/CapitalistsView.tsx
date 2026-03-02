import {Box, FormLabel, Paper, Stack, TextField, Tooltip} from "@mui/material";
import CapitalistsSummary from "./CapitalistsSummary.tsx";
import {Laws} from "../Laws.tsx";
import Storages from "./Storages.tsx";
import Companies from "./CompaniesContainer.tsx";
import {calculateCapitalTax} from "../../utilities/calculateTaxes.ts";
import {useContext} from "react";
import {GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import _ from "lodash";
import type {CompanyInstance} from "../../data/companies.ts";
import calculateCompanyOutput from "../../utilities/calculateCompanyOutput.ts";
import calculateTaxMultiplier from "../../utilities/calculateTaxMultiplier.ts";
import {ClassView} from "../ClassView.tsx";
import CapitalistExpenses from "./CapitalistExpenses.tsx";

function CapitalistsView() {
    const {
        cc,
        laws
    }: Game = useContext(GameContext) as Game;
    const {revenue, capital, points, loans, capitalTrackPosition, lastCardPlayed, companies} = cc

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

    return <><ClassView summaryContent={<CapitalistsSummary revenue={revenue}
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

        <Box>
            <Companies player={cc}/>
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
    </>
}

export default CapitalistsView;