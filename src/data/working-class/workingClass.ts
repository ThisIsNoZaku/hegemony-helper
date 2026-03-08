import type {EarnedWages, Game} from "../game.ts";
import type {CompanyDefinition, CompanyInstance} from "../companies.ts";
import type {UpdateWorkingClassPlayerAction} from "../../state/Reducers.ts";
import type {Player} from "../players.ts";
import type {GoodsName} from "../goods.ts";
import type {ProductionPhaseResult} from "../phases.ts";

export interface WorkingClassPlayer extends Player {
    income: number,
    goods: Record<GoodsName, number>,
    prosperity: number;
    population: number,
    companies: CompanyInstance[],
    unions: Record<GoodsName, boolean>
}

export const workingClassProsperityTrack = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]

export interface WorkingClassProductionPhaseResult extends ProductionPhaseResult {
    output: { food: number, health: 0, education: 0, luxuries: 0, influence: 0 },
    earnedWages: EarnedWages,
    endingIncome: number
}

export const workingClassCompanies: Record<string, CompanyDefinition> = {
    farm: {
        name: "Cooperative Farm",
        cost: 0,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "food",
        possibleWorkers: ["wc"],
        wages: [0, 0, 0]
    }
}

export const WorkingClassCards = []

export function playWorkingClassCard(card: Record<string, unknown> & { name: string }, game: Game): Game {
    switch (card.name) {

    }
    return game;
}

export function undoWorkingClassCard(game: Game): Game {
    const lastCard = game.cc.lastCardPlayed;
    if (!lastCard) {
        return game;
    }
    switch (lastCard.name) {

    }
    return game;
}

export const Actions = {
    update: {
        population: function (wc: WorkingClassPlayer, population: number): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {...wc, population}}
        },
        income: function (wc: WorkingClassPlayer, income: number): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {...wc, income}}
        },
        companies: function (wc: WorkingClassPlayer, companies: CompanyInstance[]): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {...wc, companies}}
        },
        unions: function (wc: WorkingClassPlayer, unions: Record<GoodsName, boolean>) {
            return {type: "update_player", player: "wc", playerData: {...wc, unions}}
        },
        goods: {
            food: function (wc: WorkingClassPlayer, food: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {...wc, goods: {...wc.goods, food}}}
            },
            luxuries: function (wc: WorkingClassPlayer, luxuries: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {...wc, goods: {...wc.goods, luxuries}}}
            },
            health: function (wc: WorkingClassPlayer, health: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {...wc, goods: {...wc.goods, health}}}
            },
            education: function (wc: WorkingClassPlayer, education: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {...wc, goods: {...wc.goods, education}}}
            },
            influence: function (wc: WorkingClassPlayer, influence: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {...wc, goods: {...wc.goods, influence}}}
            }
        }
    }
}

export const STARTING_WORKING_CLASS_DATA: WorkingClassPlayer = {
    playerClass: "wc",
    points: 0,
    loans: 0,
    prosperity: 0,
    population: 10,
    personalInfluence: 1,
    companies: [
        {...workingClassCompanies.farm},
        {...workingClassCompanies.farm}
    ],
    goods: {
        food: 0,
        education: 0,
        health: 0,
        luxuries: 0,
        influence: 1
    },
    unions: {
        food: false,
        education: false,
        health: false,
        luxuries: false,
        influence: false
    },
    income: 30
}