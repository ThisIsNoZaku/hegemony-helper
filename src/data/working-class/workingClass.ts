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
        population: function (population: number): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {population}}
        },
        income: function (income: number): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {income}}
        },
        companies: function (companies: CompanyInstance[]): UpdateWorkingClassPlayerAction {
            return {type: "update_player", player: "wc", playerData: {companies}}
        },
        unions: function (unions: Record<GoodsName, boolean>) {
            return {type: "update_player", player: "wc", playerData: {unions}}
        },
        goods: {
            food: function (food: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {goods: {food}}}
            },
            luxuries: function (luxuries: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {goods: {luxuries}}}
            },
            health: function (health: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {goods: {health}}}
            },
            education: function (education: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {goods: {education}}}
            },
            influence: function (influence: number): UpdateWorkingClassPlayerAction {
                return {type: "update_player", player: "wc", playerData: {goods: {influence}}}
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