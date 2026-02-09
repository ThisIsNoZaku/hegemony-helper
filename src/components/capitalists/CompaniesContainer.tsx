import {useContext, useState} from "react";
import {Button, Grid, Stack, Tooltip} from "@mui/material";
import CompanyCard from "./CompanyCard.tsx";
import NewCompanyDialog from "./NewCompanyDialog.tsx";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type { Game } from "../../data/game.ts";
import {Actions as cc} from "../../data/capitalists.ts";
import CompanySlot from "../CompanySlot.tsx";

export default function Companies() {
    const {capitalists, laws} = useContext(GameContext) as Game;
    const dispatch = useContext(DispatchContext);
    const {labor} = laws;
    const { companies } = capitalists;

    const [selectedNewCompanySlot, setSelectedNewCompanySlot] = useState<number | null>(null);
    const [newCompanyDialogOpen, setnewCompanyDialogOpen] = useState(false);

    return <Stack spacing={2}>
        <Stack direction="row" sx={{width: "100%", justifyContent: "space-around"}} spacing={2}>
            <Tooltip title="ALL companies have their wages set to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = labor;
                        }
                    });
                    dispatch!(cc.update.companies(capitalists, [...companies]));
                }}>Set All Wages to Minimum ({String.fromCharCode(67 - labor)})</Button>
            </Tooltip>
            <Tooltip title="Any companies with wages BELOW the minimum are raised to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = Math.max(labor, company.wageLevel) as 0 | 1 | 2;
                        }
                    });
                    dispatch!(cc.update.companies(capitalists, [...companies]));
                }}>Required Wages to Minimum ({String.fromCharCode(67 - labor)})</Button>
            </Tooltip>
        </Stack>

        <Grid sx={{layout: "flex", justifyContent: "center"}} container columns={{xs: 1, sm: 1, md: 3, lg: 4}}
              spacing={2}>
            {companies.map((company, index) => (
                <Grid key={index} size={1}>
                    <CompanySlot laborLaw={labor} company={company}
                                 updateCompany={(updated) => {
                                     companies[index] = updated;
                                     dispatch!(cc.update.companies(capitalists, [...companies]));
                                 }}
                                 index={index}
                                 openNewCompanyDialog={() => {
                                     setnewCompanyDialogOpen(true);
                                     setSelectedNewCompanySlot(index)
                                 }}
                    />
                </Grid>
            ))}
        </Grid>
        <NewCompanyDialog open={newCompanyDialogOpen} onClose={() => setnewCompanyDialogOpen(false)}
                          companies={companies} setCompanies={companies => dispatch!(cc.update.companies(capitalists, [...companies]))}
                          slot={selectedNewCompanySlot as number} laborLaw={labor}/>
    </Stack>
}