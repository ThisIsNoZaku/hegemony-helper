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
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import NewCompanyDialog from "../capitalists/NewCompanyDialog.tsx";
import {capitalistCompanies} from "../../data/capitalists/capitalistCompanies.ts";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import {middleClassCompanies} from "../../data/middle-class/middleClassCompanies.ts";
import {EducationIcon, FoodIcon, HealthIcon, InfluenceIcon, LuxuryIcon} from "../Icons.tsx";
import type {GoodsName} from "../../data/goods.ts";

export default function SimpleCompanies({player, companies, dispatch, laws}: {
    player: CapitalistPlayer | MiddleClassPlayer,
    companies: (CompanyInstance | null)[],
    dispatch: Dispatch<any>,
    laws: Record<LawId, LawLevel>
}) {
    const [newCompanyOpen, setNewCompanyOpen] = useState(false);
    const output = companies.filter(c => c).map(c => c as CompanyInstance).reduce((totals, company) => {
        totals[company.type] += company?.output.base + (company.automatedBonus ? company.output.automationBonus || 0 : 0) + (company.hasBonusWorker ? company.output.wcWorkerBonus || 0 : 0) || 0;
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
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>Automation</TableCell>
                        {player.playerClass === "mc" && <>
                            <TableCell>Primary Worker(s)</TableCell>
                            <TableCell>Additional Worker</TableCell>
                        </>
                        }
                        {player.playerClass === "cc" && <TableCell colSpan={2} align="center">Workers</TableCell>}
                        <TableCell>Wages</TableCell>
                        <TableCell align="right">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company, i) => {
                        if (!company) return null;

                        const production = company.output.base
                            + (company.automatedBonus ? company.output.automationBonus : 0)
                            + (company.hasBonusWorker ? company.output.wcWorkerBonus : 0);

                        return (
                            <TableRow key={i}>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>
                                    {production} <GoodsIcon type={company.type}/>
                                </TableCell>

                                <TableCell>
                                    {company.class === "cc" ? (
                                        <Button disabled={company.fullyAutomated} onClick={() => {
                                            company.automatedBonus = !company.automatedBonus;
                                            dispatch(capitalists.update.companies([...companies]));
                                        }}>
                                            <SettingsIcon
                                                sx={{color: company.automatedBonus || company.fullyAutomated ? "green" : "gray"}}/>
                                        </Button>
                                    ) : "—"}
                                </TableCell>

                                <TableCell>
                                    {!company.fullyAutomated && (
                                        <ToggleButtonGroup value={company.workers || ""}
                                                           exclusive={true}
                                                           onChange={(_, value) => {
                                                               if (value === "undefined") value = undefined;
                                                               company.workers = value;
                                                               if (player.playerClass === "cc") {
                                                                   dispatch(capitalists.update.companies([...companies]));
                                                               } else {
                                                                   if (!value) company.hasBonusWorker = false;
                                                                   dispatch(middleClass.update.companies([...companies]));
                                                               }
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
                                    )}
                                </TableCell>

                                <TableCell>
                                    {!company.fullyAutomated && company.bonusWorkerAllowed && (
                                        <ToggleButtonGroup value={company.hasBonusWorker}
                                                           exclusive={true}
                                                           onChange={(_, value) => {
                                                               company.hasBonusWorker = value;
                                                               dispatch(middleClass.update.companies([...companies]));
                                                           }}>
                                            <ToggleButton value={true} sx={{
                                                '&.Mui-selected': {backgroundColor: "crimson", color: "white"},
                                                '&:not(.Mui-selected)': {color: "crimson"},
                                                '&.Mui-selected:hover': {backgroundColor: "red"}
                                            }}>WC</ToggleButton>
                                            <ToggleButton value={false}>N/A</ToggleButton>
                                        </ToggleButtonGroup>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {!company.fullyAutomated && company.wages.every(v => v != 0) && (
                                        <ToggleButtonGroup value={company.wageLevel}
                                                           exclusive={true}
                                                           onChange={(_, value) => {
                                                               if (value !== null) {
                                                                   company.wageLevel = value;
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
                                    )}
                                </TableCell>

                                <TableCell align="right">
                                    <Button onClick={() => {
                                        companies[i] = null as any;
                                        dispatch(capitalists.update.companies([...companies]));
                                    }}>
                                        <DeleteIcon sx={{color: "red"}}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    <TableRow>
                        <TableCell colSpan={7} sx={{p: 0}}>
                            <Button onClick={() => setNewCompanyOpen(true)} sx={{width: "100%", minHeight: 48}}>
                                Add Company
                            </Button>
                        </TableCell>
                    </TableRow>
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
            dispatch(player.playerClass === "cc" ? capitalists.update.companies(companies) : middleClass.update.companies(companies));
        }} slot={companies.length} laborLaw={laws.labor}/>
    </Stack>
}