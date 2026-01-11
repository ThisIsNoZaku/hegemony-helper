import {
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    ToggleButton,
    Tooltip
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import {Fragment} from "react";
import WarningIcon from "@mui/icons-material/Warning";
import AddIcon from "@mui/icons-material/Add";
import type {CompanyInstance} from "../data/companies.ts";
import GoodsIcon from "./GoodsIcon.tsx";

export default function CompanyCard({company, updateCompany, laborLaw, openNewCompanyDialog}: {
    laborLaw: 0 | 1 | 2,
    company: CompanyInstance | null,
    index: number,
    updateCompany: (company: CompanyInstance | null) => void,
    openNewCompanyDialog: () => void
}) {
    const operational = company && (company.workers || company.fullyAutomated);
    return <Card variant="outlined" sx={{}}
    style={{background: operational ? "white" : "lightgray"}}
>
    <CardContent>
        {company ?
                (<Stack>
                    <Stack direction="row" sx={{alignItems: "center", width: "100%"}}
    spacing={1}>
    <div>
        <Tooltip
            title={operational ? "Company is operational" : "Company is non-operational"}>
    <ToggleButton value={company.name}
    selected={!!company.workers}
    sx={{padding: 0}}>
    {!operational && <PersonIcon
        sx={{visibility: "hidden"}}/>}
        {operational && !company.fullyAutomated && <PersonIcon
            sx={{visibility: "visible"}}/>}
            {operational && company.fullyAutomated && <SettingsIcon
                sx={{visibility: "visible"}}/>}
            </ToggleButton>
            </Tooltip>
            </div>
            <div style={{flexGrow: 1, textAlign: "center"}}>
                {company.name}
                </div>
                <Tooltip title="Remove company">
            <Button color="error" onClick={() => updateCompany(null)}>
                <DeleteIcon/>
                </Button>
                </Tooltip>
                </Stack>
                <div style={{display: "inline-flex", justifyContent: "center"}}>
                <Stack direction="row">
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                Output: {company.output.base + (company.automatedBonus ? company.output.automationBonus : 0)} {<GoodsIcon type={company.type}/>}
                </div>
                {company.output.automationBonus > 0 &&
                <Tooltip title={company.automatedBonus ? "Remove Automation" : "Add Automation"}>
                <Button sx={{color: company.automatedBonus ? "green" : "gray"}} onClick={() => {
                    updateCompany({
                        ...company,
                        automatedBonus: !company.automatedBonus
                    })
                }}>
                    <SettingsIcon/>
                    </Button>
                    </Tooltip>}
                    </Stack>
                    </div>
                    {company.fullyAutomated ?
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <Tooltip title="Fully Automated">
                        <SettingsIcon style={{color: "green"}}/>
                    </Tooltip>
                    </div> : <Fragment>
                    <RadioGroup row style={{justifyContent: "space-around"}}>
                        <Tooltip title="Remove Workers from this company">
                        <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio size="small"
                        checked={!company.workers}
                        onClick={() => {
                        updateCompany({...company, workers: null})
                    }}/>} label="N/A"/>
                    </Tooltip>
                    <Tooltip title="Set Middle Class Workers">
                    <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio size="small"
                        checked={company.workers === "mc"}
                        onClick={() => {
                        updateCompany({...company, workers: "mc"})
                    }}/>} label="MC"/>
                    </Tooltip>
                    <Tooltip title="Set Working Class Workers">
                    <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio size="small"
                        checked={company.workers === "wc"}
                        onClick={() => {
                        updateCompany({...company, workers: "wc"})
                    }}/>} label="WC"/>
                    </Tooltip>
                    </RadioGroup>

                    <div>
                    Wages
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <RadioGroup row>
                        <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio
                        checked={company.wageLevel == 2}
                        style={{color: "red"}}
                        onClick={() => {
                        updateCompany({...company, wageLevel: 2})
                    }} size="small"/>}
                        label={company.wages[2].toString()}/>
                    <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio
                        checked={company.wageLevel == 1}
                        style={{color: "gold"}}
                        onClick={() => {
                        updateCompany({...company, wageLevel: 1})
                    }} size="small"/>}
                        label={company.wages[1].toString()}/>
                    <FormControlLabel sx={{marginLeft: 0}}
                        control={<Radio
                        checked={company.wageLevel == 0}
                        style={{color: "blue"}}
                        onClick={() => {
                        updateCompany({...company, wageLevel: 0})
                    }} size="small"/>}
                        label={company.wages[0].toString()}/>
                    </RadioGroup>
                        {company.wageLevel < laborLaw &&
                        <Tooltip
                            title="Wages too below the minimum set by labor law!">
                            <WarningIcon></WarningIcon>
                            </Tooltip>}
                            </div>
                            </Fragment>}
                            </Stack>
                        ) :
                            <div style={{width: "100%", height: "100%"}}>
                            <Button sx={{height: "100%", width: "100%"}} onClick={openNewCompanyDialog}><AddIcon/></Button>
                            </div>
                        }
                        </CardContent>
                        </Card>
                    }