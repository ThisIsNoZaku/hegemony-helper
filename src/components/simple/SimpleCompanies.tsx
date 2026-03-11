import type {CompanyInstance} from "../../data/companies.ts";
import {type Dispatch, useState} from "react";
import type {LawId, LawLevel} from "../../data/laws.ts";
import {Button, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import GoodsIcon from "../GoodsIcon.tsx";
import {Actions as capitalists} from "../../data/capitalists/capitalistActions.ts";
import {Actions as middleClass} from "../../data/middle-class/middleClassActions.ts";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import NewCompanyDialog from "../capitalists/NewCompanyDialog.tsx";
import {capitalistCompanies} from "../../data/capitalists/capitalistCompanies.ts";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import {middleClassCompanies} from "../../data/middle-class/middleClassCompanies.ts";

export default function SimpleCompanies({player, companies, dispatch, laws}: {
    player: CapitalistPlayer | MiddleClassPlayer,
    companies: (CompanyInstance | null)[],
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    const [newCompanyOpen, setNewCompanyOpen] = useState(false);
    return <Stack spacing={.5}>
        {companies.filter(c => !!c).map((company, i) => {
            company = company as CompanyInstance;
            // @ts-ignore
            const production = company.output.base + (company.automatedBonus ? company.output.automationBonus : 0) + (company.hasBonusWorker ? company.output.wcWorkerBonus : 0);
            return <Paper sx={{width: "100%"}}>
                <Grid container columns={8} sx={{width: "100%"}} alignItems="center">
                    <Grid flexGrow={1} size={1}>
                        {company.name}
                    </Grid>
                    <Grid flexGrow={1} size={1}>
                        {production} <GoodsIcon type={company.type}/>
                    </Grid>
                    {company.class === "cc" && <Grid flexGrow={1} size={company.fullyAutomated ? 5 : 1}>
                        <Button disabled={company.fullyAutomated} onClick={() => {
                            company.automatedBonus = !company.automatedBonus;

                            dispatch(capitalists.update.companies([...companies]));
                        }}>
                            <SettingsIcon
                                sx={{color: company.automatedBonus || company.fullyAutomated ? "green" : "gray"}}/>
                        </Button>
                    </Grid>}
                    {!company.fullyAutomated && <>
                        <Grid flexGrow={1} size={2}>

                            <ToggleButtonGroup value={company.workers || ""}
                                               exclusive={true}
                                               onChange={(_, value) => {
                                                   if (value === "undefined") {
                                                       value = undefined;
                                                   }
                                                   company.workers = value;
                                                   if (player.playerClass === "cc") {
                                                       dispatch(capitalists.update.companies([...companies]));
                                                   } else {
                                                       if (!value) {
                                                           company.hasBonusWorker = false;
                                                       }
                                                       dispatch(middleClass.update.companies([...companies]));
                                                   }
                                               }}>
                                {/* @ts-ignore */}
                                {company.possibleWorkers.includes("wc") && <ToggleButton value="wc" sx={{
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
                                </ToggleButton>}
                                {company.possibleWorkers.includes("mc") && <ToggleButton value="mc" sx={{
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
                                </ToggleButton>}
                                <ToggleButton value="">
                                    N/A
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        {company.bonusWorkerAllowed && <Grid flexGrow={1} size={1}>
                            <ToggleButtonGroup value={company.hasBonusWorker}
                                               exclusive={true}
                                               onChange={(_, value) => {
                                                   company.hasBonusWorker = value;

                                                   dispatch(middleClass.update.companies([...companies]));
                                               }}
                            >
                                <ToggleButton value={true} sx={{
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
                                }}>WC</ToggleButton>
                                <ToggleButton value={false}>N/A</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>}
                        <Grid flexGrow={1} size={2}>
                            {company.wages.every(v => v != 0) && <ToggleButtonGroup value={company.wageLevel}
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
                            </ToggleButtonGroup>}
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
        <NewCompanyDialog companyDefinitions={player.playerClass == "cc" ? capitalistCompanies : middleClassCompanies}
                          open={newCompanyOpen}
                          onClose={() => setNewCompanyOpen(false)} companies={companies} setCompanies={companies => {
            dispatch(player.playerClass === "cc" ? capitalists.update.companies(companies) : middleClass.update.companies(companies));
        }} slot={companies.length} laborLaw={laws.labor}/>
    </Stack>
}