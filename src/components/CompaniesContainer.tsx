import {useState} from "react";
import {Button, Grid, Stack, Tooltip} from "@mui/material";
import type { CompanyInstance } from "../data/companies";
import CompanyCard from "./CompanyCard.tsx";
import NewCompanyDialog from "./NewCompanyDialog.tsx";

export default function Companies({companies, setCompanies, laborLaw}: {
    companies: (CompanyInstance | null)[],
    setCompanies: (companies: (CompanyInstance | null)[]) => void,
    laborLaw: 0 | 1 | 2
}) {
    const [selectedNewCompanySlot, setSelectedNewCompanySlot] = useState<number | null>(null);
    const [newCompanyDialogOpen, setnewCompanyDialogOpen] = useState(false);

    return <Stack spacing={2}>
        <Stack direction="row" sx={{width: "100%", justifyContent: "space-around"}} spacing={2}>
            <Tooltip title="All companies have their wages set to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = laborLaw;
                        }
                    });
                    setCompanies([...companies]);
                }}>Set All Wages to Minimum ({String.fromCharCode(67 - laborLaw)})</Button>
            </Tooltip>
            <Tooltip title="Any companies with wages below the minimum are raised to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = Math.max(laborLaw, company.wageLevel) as 0 | 1 | 2;
                        }
                    });
                    setCompanies([...companies]);
                }}>Required Wages to Minimum ({String.fromCharCode(67 - laborLaw)})</Button>
            </Tooltip>
        </Stack>

        <Grid sx={{layout: "flex", justifyContent: "center"}} container columns={{xs: 1, sm: 1, md: 3, lg: 4}}
              spacing={2}>
            {companies.map((company, index) => (
                <Grid key={index} size={1}>
                    <CompanyCard laborLaw={laborLaw} company={company}
                                 updateCompany={(updated) => {
                                     companies[index] = updated;
                                     setCompanies([...companies]);
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
                          companies={companies} setCompanies={companies => setCompanies([...companies])}
                          slot={selectedNewCompanySlot as number} laborLaw={laborLaw}/>
    </Stack>
}