import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField} from "@mui/material";
import {companyDefinitions, type CompanyInstance} from "../data/companies.ts";

export default function NewCompanyDialog({open, onClose, companies, setCompanies, slot, laborLaw}: {
    open: boolean,
    onClose: () => void,
    companies: (CompanyInstance | null)[],
    setCompanies: (companies: (CompanyInstance | null)[]) => void,
    slot: number,
    laborLaw: number
}) {
    const sortedCompanies = Object.entries(companyDefinitions).sort((a, b) => a[1].name.localeCompare(b[1].name));
    const [filter, setFilter] = useState("");
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent sx={{height: "60vh"}}>
            <Paper style={{position: "sticky", top: 0, zIndex: 100}}>
                <TextField sx={{width: "100%"}} label="Filter" value={filter}
                           onChange={e => setFilter(e.target.value)}></TextField>
            </Paper>
            <div style={{height: "100%", overflowY: "auto"}}>
                <Stack spacing={2} sx={{minWidth: "400px", marginTop: 1}}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                    {sortedCompanies.filter(([k, c]) => c.name.toLowerCase().includes(filter)).map(([key, company]) => (
                        <Button key={key} variant="outlined" fullWidth onClick={() => {
                            companies[slot] = {...company, wageLevel: laborLaw} as CompanyInstance;
                            setCompanies([...companies]);
                            onClose();
                        }}>
                            {company.name}
                        </Button>
                    ))}
                </Stack>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
}