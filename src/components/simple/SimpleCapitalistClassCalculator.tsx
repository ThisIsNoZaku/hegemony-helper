import type {LawId, LawLevel} from "../../data/laws.ts";
import {type Dispatch, useContext, useState} from "react";
import {
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    ToggleButton, ToggleButtonGroup,
} from "@mui/material";
import _ from "lodash";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import CapitalistTaxes from "../capitalists/CapitalistTaxes.tsx";
import type {CompanyInstance} from "../../data/companies.ts";
import {Actions as capitalists} from "../../data/capitalists/capitalistActions.ts";
import {DispatchContext} from "../../state/GameContext.ts";
import calculateTaxMultiplier from "../../utilities/phases/taxes/calculateTaxMultiplier.ts";
import {calculateCapitalTax} from "../../utilities/phases/taxes/calculateTaxes.ts";
import GoodsIcon from "../GoodsIcon.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import NewCompanyDialog from "../capitalists/NewCompanyDialog.tsx";
import {capitalistCompanies} from "../../data/capitalists/capitalistCompanies.ts";

export default function ({cc, laws}: { cc: CapitalistPlayer, laws: Record<LawId, LawLevel> }) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const [revenue, setRevenue] = useState(120);
    const [capital, setCapital] = useState(0);
    const operationalCompanies = cc.companies.filter(c => c && (c.workers || c.fullyAutomated)).length;
    const owedWages = (cc.companies.filter(c => c && c.workers) as CompanyInstance[]).reduce((total, company) => {
        total[company?.workers as "wc" | "mc"] += company.wages[company.wageLevel || 0];
        return total;
    }, {wc: 0, mc: 0})
    const totalWages = owedWages["wc"] + owedWages["mc"];
    const preCapitalTaxRevenue = Math.max(0, revenue - totalWages - (operationalCompanies * calculateTaxMultiplier(laws.tax, laws.education, laws.health)))
    const finalRevenue = preCapitalTaxRevenue - calculateCapitalTax(preCapitalTaxRevenue, laws.tax);
    const finalCapital = capital + finalRevenue;
    return <Paper sx={{width: "100%"}}>
        <Stack spacing={1}>
            <strong>Capitalist Class</strong>
            <Stack direction="row">
                <TextField type="number" label="Revenue" value={revenue}
                           onChange={e => {
                               setRevenue(_.clamp(Number.parseInt(e.target.value), 0, 1000))
                           }}/>
                <TextField type="number" label="Capital" value={capital}
                           onChange={e => {
                               setCapital(_.clamp(Number.parseInt(e.target.value), 0, 1000))
                           }}/>
            </Stack>
            <Stack spacing={.5}>
                <strong>Companies</strong>
                <Companies companies={cc.companies.filter(c => !!c)} dispatch={dispatch} laws={laws}/>
                <strong>Wages</strong>
                <Stack direction="row" spacing={.5}>
                    <TextField sx={{flexGrow: 1}} label="To Working Class" value={owedWages["wc"]}/>
                    <TextField sx={{flexGrow: 1}} label="To Middle Class" value={owedWages["mc"]}/>
                </Stack>
                <strong>Taxes</strong>
                <CapitalistTaxes laws={laws} operationalCompanies={operationalCompanies}
                                 pretaxRevenue={revenue - totalWages}/>
                <strong>Final</strong>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <TextField type="number" label="Final Revenue" value={Math.max(0, finalRevenue)}/>
                    <TextField type="number" label="Initial Capital" value={capital}/>
                    →
                    <TextField type="number" label="Final Capital" value={finalCapital}/>
                </Stack>
            </Stack>
        </Stack>
    </Paper>
}

function Companies({companies, dispatch, laws}: {
    companies: CompanyInstance[],
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    const [newCompanyOpen, setNewCompanyOpen] = useState(false);
    return <Stack spacing={.5}>
        {companies.filter(c => !!c).map((company, i) => {
            company = company as CompanyInstance;
            // @ts-ignore
            const production = company.output.base + (company.automatedBonus ? company.output.automationBonus : 0);
            return <Paper sx={{width: "100%"}}>
                <Grid container columns={8} sx={{width: "100%"}} alignItems="center">
                    <Grid flexGrow={1} size={1}>
                        {company.name}
                    </Grid>
                    <Grid flexGrow={1} size={1}>
                        {production} <GoodsIcon type={company.type}/>
                    </Grid>
                    <Grid flexGrow={1} size={company.fullyAutomated ? 5 : 1}>
                        <Button disabled={company.fullyAutomated} onClick={() => {
                            company.automatedBonus = !company.automatedBonus;

                            dispatch(capitalists.update.companies([...companies]));
                        }}>
                            <SettingsIcon
                                sx={{color: company.automatedBonus || company.fullyAutomated ? "green" : "gray"}}/>
                        </Button>
                    </Grid>
                    {!company.fullyAutomated && <>
                        <Grid flexGrow={1} size={2}>

                            <ToggleButtonGroup value={company.workers || ""}
                                               exclusive={true}
                                               onChange={(_, value) => {
                                                   if (value === "undefined") {
                                                       value = undefined;
                                                   }
                                                   company.workers = value;

                                                   dispatch(capitalists.update.companies([...companies]));
                                               }}
                            >
                                <ToggleButton value="wc" sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: "crimson",
                                        color: "white"
                                    },
                                    '&:not(.Mui-selected)': {
                                        color: "crimson"
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: "red"
                                    }
                                }}>
                                    WC
                                </ToggleButton>
                                <ToggleButton value="mc" sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: "goldenrod",
                                        color: "white"
                                    },
                                    '&:not(.Mui-selected)': {
                                        color: "goldenrod"
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: "gold"
                                    }
                                }}>
                                    MC
                                </ToggleButton>
                                <ToggleButton value="">
                                    N/A
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid flexGrow={1} size={2}>
                            <ToggleButtonGroup value={company.wageLevel}
                                               exclusive={true}
                                               onChange={(_, value) => {
                                                   if (value !== null) {
                                                       company.wageLevel = value;

                                                       dispatch(capitalists.update.companies([...companies]));
                                                   }
                                               }}
                            >
                                <ToggleButton value={2} sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: "crimson",
                                        color: "white"
                                    },
                                    '&:not(.Mui-selected)': {
                                        color: "crimson"
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: "red"
                                    }
                                }}>
                                    {company.wages[2]}
                                </ToggleButton>
                                <ToggleButton value={1} sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: "goldenrod",
                                        color: "white"
                                    },
                                    '&:not(.Mui-selected)': {
                                        color: "goldenrod"
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: "gold"
                                    }
                                }}>
                                    {company.wages[1]}
                                </ToggleButton>
                                <ToggleButton value={0} sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: "blue",
                                        color: "white"
                                    },
                                    '&:not(.Mui-selected)': {
                                        color: "blue"
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: "lightblue"
                                    }
                                }}>
                                    {company.wages[0]}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid></>}
                    <Grid flexGrow={1} size={1}>
                        <Button onClick={() => {
                            companies[i] = null as any;

                            dispatch(capitalists.update.companies([...companies]));
                        }}>
                            <DeleteIcon sx={{color: "red"}}/>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        })}
        <Paper sx={{minHeight: "48px", alignContent: "center"}}>
            <Button onClick={() => setNewCompanyOpen(true)} sx={{width: "100%"}}>
                Add Company
            </Button>
        </Paper>
        <NewCompanyDialog companyDefinitions={capitalistCompanies} open={newCompanyOpen}
                          onClose={() => setNewCompanyOpen(false)} companies={companies} setCompanies={companies => {
            dispatch(capitalists.update.companies(companies));
        }} slot={companies.length} laborLaw={laws.labor}/>
    </Stack>
}