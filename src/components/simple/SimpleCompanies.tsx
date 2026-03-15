import type {CompanyInstance} from "../../data/companies.ts";
import {type Dispatch, useState} from "react";
import type {LawId, LawLevel} from "../../data/laws.ts";
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import GoodsIcon from "../GoodsIcon.tsx";
import {Actions as capitalists} from "../../data/capitalists/capitalistActions.ts";
import {Actions as middleClass} from "../../data/middle-class/middleClassActions.ts";
import {Actions as state} from "../../data/state/stateActions.ts";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import NewCompanyDialog from "../capitalists/NewCompanyDialog.tsx";
import {capitalistCompanies} from "../../data/capitalists/capitalistCompanies.ts";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import {middleClassCompanies} from "../../data/middle-class/middleClassCompanies.ts";
import {EducationIcon, FoodIcon, HealthIcon, InfluenceIcon, LuxuryIcon} from "../Icons.tsx";
import type {GoodsName} from "../../data/goods.ts";
import calculateCompanyOutput from "../../utilities/calculateCompanyOutput.ts";
import type {StatePlayer} from "../../data/state/state.ts";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

export default function SimpleCompanies({player, companies, dispatch, laws, update, fixed}: {
    player: CapitalistPlayer | MiddleClassPlayer | StatePlayer,
    companies: (CompanyInstance | null)[],
    dispatch: Dispatch<any>,
    update: typeof capitalists.update | typeof middleClass.update | typeof state.update,
    laws: Record<LawId, LawLevel>,
    fixed?: true
}) {
    const [newCompanyOpen, setNewCompanyOpen] = useState(false);
    const output = companies.filter(c => c).map(c => c as CompanyInstance).reduce((totals, company) => {
        totals[company.type] += calculateCompanyOutput(company);
        return totals;
    }, {
        food: 0,
        luxuries: 0,
        education: 0,
        health: 0,
        influence: 0
    } as Record<GoodsName, number>)

    return <Stack spacing={.5}>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    {player.playerClass === "cc" && <CapitalistHeader/>}
                    {player.playerClass === "mc" && <MiddleClassHeader/>}
                    {player.playerClass === "state" && <StateHeader/>}
                </TableHead>
                <TableBody>
                    {companies.map((company) => {
                        if (!company) return null;

                        const production = calculateCompanyOutput(company);

                        return <>
                            {player.playerClass === "cc" &&
                                <CapitalistCompanyRow company={company}
                                                      companies={companies}
                                                      dispatch={dispatch}
                                                      production={production}
                                                      laws={laws}
                                />}
                            {player.playerClass === "mc" &&
                                <MiddleClassCompanyRow company={company}
                                                       companies={companies}
                                                       dispatch={dispatch}
                                                       production={production}
                                                       laws={laws}
                                />}
                            {player.playerClass === "state" &&
                                <StateCompanyRow company={company}
                                                 companies={companies}
                                                 dispatch={dispatch}
                                                 production={production}
                                                 laws={laws}
                                />}
                        </>
                    })}

                    {!fixed && <TableRow>
                        <TableCell colSpan={7} sx={{p: 0}}>
                            <Button onClick={() => setNewCompanyOpen(true)} sx={{width: "100%", minHeight: 48}}>
                                Add Company
                            </Button>
                        </TableCell>
                    </TableRow>}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>
                            <div style={{fontSize: "inherit", display: "flex", justifyContent: "space-around"}}>
                                <div style={{fontSize: "1.25em", alignItems: "center", display: "flex"}}>
                                    <FoodIcon/><strong>{output["food"]}</strong>
                                </div>
                                <div style={{fontSize: "1.25em", alignItems: "center", display: "flex"}}>
                                    <LuxuryIcon/><strong>{output["luxuries"]}</strong>
                                </div>
                                <div style={{fontSize: "1.25em", alignItems: "center", display: "flex"}}>
                                    <HealthIcon/><strong>{output["health"]}</strong>
                                </div>
                                <div style={{fontSize: "1.25em", alignItems: "center", display: "flex"}}>
                                    <EducationIcon/><strong>{output["education"]}</strong>
                                </div>
                                <div style={{fontSize: "1.25em", alignItems: "center", display: "flex"}}>
                                    <InfluenceIcon/><strong>{output["influence"]}</strong>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

        <NewCompanyDialog companyDefinitions={player.playerClass == "cc" ? capitalistCompanies : middleClassCompanies}
                          open={newCompanyOpen}
                          onClose={() => setNewCompanyOpen(false)} companies={companies} setCompanies={companies => {
            dispatch(update.companies(companies));
        }} slot={companies.length} laborLaw={laws.labor}/>
    </Stack>
}

function CapitalistHeader() {
    return <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Production</TableCell>
        <TableCell>Automation</TableCell>
        <TableCell align="center">Workers</TableCell>
        <TableCell align="center">Wages</TableCell>
        <TableCell align="right">Remove</TableCell>
    </TableRow>
}

function MiddleClassHeader() {
    return <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Production</TableCell>
        <TableCell>Middle Class Worker(s)</TableCell>
        <TableCell>Additional WC Worker</TableCell>
        <TableCell align="center">WC Wages</TableCell>
        <TableCell align="center">Remove</TableCell>
    </TableRow>
}

function StateHeader() {
    return <TableRow>
        <TableCell align="center">Name</TableCell>
        <TableCell align="center">Production</TableCell>
        <TableCell align="center">Workers</TableCell>
        <TableCell align="center">Wages</TableCell>
        <TableCell align="center">Open/Closed</TableCell>
    </TableRow>
}

function CapitalistCompanyRow({company, companies, production, dispatch, laws}: {
    company: CompanyInstance,
    companies: (CompanyInstance | null)[],
    production: number,
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    return <TableRow key={company.name}>
        <TableCell>{company.name}</TableCell>
        <TableCell>
            {production} <GoodsIcon type={company.type}/>
        </TableCell>

        <TableCell colSpan={1} align="center">
            {(company.fullyAutomated || company.output.automationBonus !== 0) ? (
                <Button disabled={company.fullyAutomated} onClick={() => {
                    company.automatedBonus = !company.automatedBonus;
                    dispatch(capitalists.update.companies([...companies]));
                }}>
                    <SettingsIcon
                        sx={{color: company.automatedBonus || company.fullyAutomated ? "green" : "gray"}}/>
                </Button>
            ) : "—"}
        </TableCell>

        <TableCell align="center">
            <ToggleButtonGroup value={company.workers || ""}
                               exclusive={true}
                               onChange={(_, value) => {
                                   if (value === "undefined") value = undefined;
                                   company.workers = value;
                                   dispatch(capitalists.update.companies([...companies]));
                               }}>
                {company.possibleWorkers.includes("wc") && <ToggleButton value="wc" sx={{
                    '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                    '&:not(.Mui-selected)': {color: "crimson"},
                    '&.Mui-selected:hover': {backgroundColor: "red"}
                }}>WC</ToggleButton>}
                {company.possibleWorkers.includes("mc") && <ToggleButton value="mc" sx={{
                    '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                    '&:not(.Mui-selected)': {color: "goldenrod"},
                    '&.Mui-selected:hover': {backgroundColor: "gold"}
                }}>MC</ToggleButton>}
                <ToggleButton value="">N/A</ToggleButton>
            </ToggleButtonGroup>
        </TableCell>

        <TableCell align='center'>
            {!company.fullyAutomated ? company.wages.every(v => v != 0) && (
                <ToggleButtonGroup value={Math.max(laws.labor as number, company.wageLevel as number)}
                                   exclusive={true}
                                   onChange={(_, value) => {
                                       if (value !== null) {
                                           company.wageLevel = Math.max(value, laws.labor as number) as LawLevel;
                                           dispatch(capitalists.update.companies([...companies]));
                                       }
                                   }}>
                    <ToggleButton value={2} sx={{
                        '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                        '&:not(.Mui-selected)': {color: "crimson"},
                        '&.Mui-selected:hover': {backgroundColor: "red"}
                    }}>{company.wages[2]}</ToggleButton>
                    <ToggleButton value={1} sx={{
                        '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                        '&:not(.Mui-selected)': {color: "goldenrod"},
                        '&.Mui-selected:hover': {backgroundColor: "gold"}
                    }}>{company.wages[1]}</ToggleButton>
                    <ToggleButton value={0} sx={{
                        '&.Mui-selected': {backgroundColor: "blue", color: "white"},
                        '&:not(.Mui-selected)': {color: "blue"},
                        '&.Mui-selected:hover': {backgroundColor: "lightblue"}
                    }}>{company.wages[0]}</ToggleButton>
                </ToggleButtonGroup>
            ) : "-"}
        </TableCell>

        <TableCell align="right">
            <Button onClick={() => {
                const i = companies.indexOf(company);
                companies[i] = null as any;
                dispatch(capitalists.update.companies([...companies]));
            }}>
                <DeleteIcon sx={{color: "red"}}/>
            </Button>
        </TableCell>
    </TableRow>
}

function MiddleClassCompanyRow({company, companies, production, dispatch, laws}: {
    company: CompanyInstance,
    companies: (CompanyInstance | null)[],
    production: number,
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    return <TableRow key={company.name}>
        <TableCell>{company.name}</TableCell>
        <TableCell align="center">
            {production} <GoodsIcon type={company.type}/>
        </TableCell>

        <TableCell align="center">
            <ToggleButtonGroup value={company.workers}
                               exclusive={true}
                               onChange={(_, value) => {
                                   if (value === "undefined") value = undefined;
                                   company.workers = value;
                                   if (!value) {
                                       company.hasBonusWorker = false;
                                   }
                                   dispatch(middleClass.update.companies([...companies]));
                               }}>
                <ToggleButton value="mc" sx={{
                    '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                    '&:not(.Mui-selected)': {color: "goldenrod"},
                    '&.Mui-selected:hover': {backgroundColor: "gold"}
                }}>MC</ToggleButton>
                <ToggleButton value="">N/A</ToggleButton>
            </ToggleButtonGroup>
        </TableCell>
        <TableCell align="center">
            {company.bonusWorkerAllowed ? <ToggleButtonGroup value={company.hasBonusWorker}
                                                             exclusive={true}
                                                             onChange={(_, value) => {
                                                                 if (value === "undefined") value = undefined;
                                                                 company.hasBonusWorker = value;
                                                                 dispatch(middleClass.update.companies([...companies]));
                                                             }}>
                <ToggleButton value={true} sx={{
                    '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                    '&:not(.Mui-selected)': {color: "crimson"},
                    '&.Mui-selected:hover': {backgroundColor: "red"}
                }}>WC</ToggleButton>
                <ToggleButton value={false}>N/A</ToggleButton>
            </ToggleButtonGroup> : "-"}

        </TableCell>

        <TableCell align="center">
            {company.bonusWorkerAllowed ? company.wages.every(v => v != 0) && (
                <ToggleButtonGroup value={Math.max(laws.labor as number, company.wageLevel as number)}
                                   exclusive={true}
                                   onChange={(_, value) => {
                                       if (value !== null) {
                                           company.wageLevel = Math.max(value, laws.labor as number) as LawLevel;
                                           dispatch(middleClass.update.companies([...companies]));
                                       }
                                   }}>
                    <ToggleButton value={2} sx={{
                        '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                        '&:not(.Mui-selected)': {color: "crimson"},
                        '&.Mui-selected:hover': {backgroundColor: "red"}
                    }}>{company.wages[2]}</ToggleButton>
                    <ToggleButton value={1} sx={{
                        '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                        '&:not(.Mui-selected)': {color: "goldenrod"},
                        '&.Mui-selected:hover': {backgroundColor: "gold"}
                    }}>{company.wages[1]}</ToggleButton>
                    <ToggleButton value={0} sx={{
                        '&.Mui-selected': {backgroundColor: "blue", color: "white"},
                        '&:not(.Mui-selected)': {color: "blue"},
                        '&.Mui-selected:hover': {backgroundColor: "lightblue"}
                    }}>{company.wages[0]}</ToggleButton>
                </ToggleButtonGroup>
            ) : "-"}
        </TableCell>

        <TableCell align="right">
            <Button onClick={() => {
                const i = companies.indexOf(company);
                companies[i] = null as any;
                dispatch(middleClass.update.companies([...companies]));
            }}>
                <DeleteIcon sx={{color: "red"}}/>
            </Button>
        </TableCell>
    </TableRow>
}

function StateCompanyRow({company, companies, production, dispatch, laws}: {
    company: CompanyInstance,
    companies: (CompanyInstance | null)[],
    production: number,
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    return <TableRow key={company.name} sx={{backgroundColor: company.companyClosed ? "lightgray" : "inherit"}}>
        <TableCell align="left">{company.name}</TableCell>
        <TableCell align="center">
            {production} <GoodsIcon type={company.type}/>
        </TableCell>

        <TableCell align="center">
            <ToggleButtonGroup value={company.workers || ""}
                               disabled={company.companyClosed}
                               exclusive={true}
                               onChange={(_, value) => {
                                   if (value === "undefined") value = undefined;
                                   company.workers = value;
                                   dispatch(state.update.companies([...companies]));
                               }}>
                <ToggleButton value="wc" sx={{
                    '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                    '&:not(.Mui-selected)': {color: "crimson"},
                    '&.Mui-selected:hover': {backgroundColor: "red"}
                }}>WC</ToggleButton>
                <ToggleButton value="mc" sx={{
                    '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                    '&:not(.Mui-selected)': {color: "goldenrod"},
                    '&.Mui-selected:hover': {backgroundColor: "gold"}
                }}>MC</ToggleButton>
                <ToggleButton value="">N/A</ToggleButton>
            </ToggleButtonGroup>
        </TableCell>

        <TableCell align="center">
            {company.wages.every(v => v != 0) && (
                <ToggleButtonGroup value={company.workers ? Math.max(laws.labor as number, company.wageLevel as number) : null}
                                   disabled={!company.workers || company.companyClosed}
                                   exclusive={true}
                                   onChange={(_, value) => {
                                       if (value !== null) {
                                           company.wageLevel = Math.max(laws.labor as number, value) as LawLevel;
                                           dispatch(state.update.companies([...companies]));
                                       }
                                   }}>
                    <ToggleButton value={2} sx={{
                        '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                        '&:not(.Mui-selected)': {color: "crimson"},
                        '&.Mui-selected:hover': {backgroundColor: "red"}
                    }}>{company.wages[2]}</ToggleButton>
                    <ToggleButton value={1} sx={{
                        '&.Mui-selected': {backgroundColor: "goldenrod", color: "white"},
                        '&:not(.Mui-selected)': {color: "goldenrod"},
                        '&.Mui-selected:hover': {backgroundColor: "gold"}
                    }}>{company.wages[1]}</ToggleButton>
                    <ToggleButton value={0} sx={{
                        '&.Mui-selected': {backgroundColor: "blue", color: "white"},
                        '&:not(.Mui-selected)': {color: "blue"},
                        '&.Mui-selected:hover': {backgroundColor: "lightblue"}
                    }}>{company.wages[0]}</ToggleButton>
                </ToggleButtonGroup>
            )}
        </TableCell>

        <TableCell align="center">
            <Button onClick={() => {
                company.companyClosed = !company.companyClosed;
                company.workers = null;
                dispatch(state.update.companies([...companies]));
            }}>
                {company.companyClosed ? <LockOutlineIcon sx={{color: "red"}}/> : <LockOpenIcon sx={{color: "green"}}/>}
            </Button>
        </TableCell>
    </TableRow>
}