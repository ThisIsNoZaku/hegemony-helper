import {ClassView} from "../ClassView.tsx";
import {StateSummary} from "./StateSummary.tsx";
import {Laws} from "../Laws.tsx";
import Companies from "../CompaniesContainer.tsx";
import {useContext} from "react";
import {GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import {PublicServices} from "./PublicServices.tsx";
import type {PublicService} from "../../data/goods.ts";
import type {LawId} from "../../data/laws.ts";
import {Paper, Stack} from "@mui/material";

export function StateView() {
    const game = useContext(GameContext) as Game;
    const {state, laws} = game;
    return <ClassView summaryContent={<StateSummary/>}>
        <Stack spacing={1}>
            <Laws/>
            <PublicServices publicServices={Object.entries(state.publicServices).reduce((acc, curr) => {
                acc[curr[0] as PublicService] = {
                    quantity: curr[1],
                    // TODO: Make utility function
                    capacity: state.companies.filter(c => c && c.type === curr[0] && !c.companyClosed).reduce((total, company) => {
                        return total + company.output.base;
                    }, 6),
                    cost: laws[curr[0] as LawId] === 0 ? 10 : (laws[curr[0] as LawId] === 1 ? 5 : 0)
                };
                return acc;
            }, {} as Record<PublicService, { quantity: number, capacity: number, cost: 10 | 5 | 0 }>)
            } state={state}/>
            <Paper elevation={3} sx={{padding: "10px"}}>
                <Companies player={state}/>
            </Paper>
        </Stack>
    </ClassView>
}