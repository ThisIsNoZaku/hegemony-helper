import type {CompanyInstance} from "../data/companies.ts";
import {
    Button,
    Card,
    CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CompanyCard from "./capitalists/CompanyCard.tsx";

export default function CompanySlot({company, updateCompany, laborLaw, openNewCompanyDialog, index}: {
    laborLaw: 0 | 1 | 2,
    company: CompanyInstance | null,
    index: number,
    updateCompany: (company: CompanyInstance | null) => void,
    openNewCompanyDialog: () => void
}) {
    const operational:boolean = !!(company && (company.workers || company.fullyAutomated));
    return <Card variant="outlined" sx={{}}
                 style={{background: operational ? "white" : "lightgray"}}
    >
        <CardContent>
            {company ?
                <CompanyCard laborLaw={laborLaw} company={company} index={index} updateCompany={updateCompany} readonly={company.companyClosed} unremovable={company.companyClosed !== undefined} />
                :
                <div style={{width: "100%", height: "100%"}}>
                    <Button sx={{height: "100%", width: "100%"}} onClick={openNewCompanyDialog}><AddIcon/></Button>
                </div>
            }
        </CardContent>
    </Card>
}