import type {CompanyInstance} from "./companies.ts";
import type {Player} from "./game.ts";
import type {UpdateCapitalistPlayerAction} from "../state/Reducers.ts";

export type CapitalistGoods = {
    food: {
        quantity: number,
        storageBought?: boolean,
        ftzQuantity: number,
        capacity: number
    },
    luxuries: {
        quantity: number,
        storageBought?: boolean,
        ftzQuantity: number,
        capacity: number
    },
    health: {
        quantity: number,
        storageBought?: boolean,
        ftzQuantity: number,
        capacity: number
    }
    education: {
        quantity: number,
        storageBought?: boolean,
        ftzQuantity: number,
        capacity: number
    },
}


export type CapitalistProductionPhaseResult = {
    wages: { mc: number, wc: number, total: number },
    output: { food: number, luxuries: number, health: number, education: number },
    startingRevenue: number,
    startingCapital: number,
    endingCapital: number,
    endingRevenue: number
}
export const EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT: CapitalistProductionPhaseResult = {
    wages: {mc: 0, wc: 0, total: 0},
    output: {food: 0, luxuries: 0, health: 0, education: 0},
    startingRevenue: 0,
    startingCapital: 0,
    endingCapital: 0,
    endingRevenue: 0
}

export type CapitalistTaxPhaseResult = {
    // How much employment tax was paid
    employmentTax: number,
    // How much capital tax was paid
    capitalTax: number
    // Revenue before taxes
    startingRevenue: number,
    // Capital before taxes
    startingCapital: number,
    // Revenue after taxes
    endingRevenue: number,
    // Capital after taxes
    endingCapital: number
}

export const EMPTY_CAPITALIST_TAX_PHASE_RESULT: CapitalistTaxPhaseResult = {
    employmentTax: 0,
    capitalTax: 0,
    startingRevenue: 0,
    startingCapital: 0,
    endingRevenue: 0,
    endingCapital: 0
}

export interface CapitalistScoringPhaseResult {
    // The amount of revenue that was moved into capital
    amountMovedToCapital: number,
    // The total amount of capital, after moving revenue to capital
    finalCapital: number,
    // Where on the capital track the player started
    startingTrackMarkerPosition: number,
    // Where on the capital track the player ended
    finalTrackMarkerPosition: number,
    pointsEarned: number
}

export const EMPTY_CAPITALIST_SCORING_PHASE_RESULT: CapitalistScoringPhaseResult = {
    amountMovedToCapital: 0,
    finalCapital: 0,
    startingTrackMarkerPosition: 0,
    finalTrackMarkerPosition: 0,
    pointsEarned: 0
}

export type CapitalistPlayer = {
    revenue: number,
    capital: number,
    capitalTrackPosition: number,
    goods: CapitalistGoods,
    companies: (CompanyInstance | null)[]
} & Player

export const Actions = {
    update: {
        revenue: function (cc: CapitalistPlayer, revenue: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, revenue}}
        },
        capital: function (cc: CapitalistPlayer, capital: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, capital}}
        },
        capitalTrackPosition: function (cc: CapitalistPlayer, capitalTrackPosition: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, capitalTrackPosition}}
        },
        companies: function (cc: CapitalistPlayer, companies: (CompanyInstance | null)[]): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, companies}}
        },
        goods: {
            food: function (cc: CapitalistPlayer, food: {
                quantity: number,
                capacity: number,
                storageBought?: boolean,
                ftzQuantity: number
            }): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, goods: {...cc.goods, food}}}
            },
            luxuries: function (cc: CapitalistPlayer, luxuries: {
                quantity: number,
                storageBought?: boolean,
                capacity: number,
                ftzQuantity: number
            }): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, goods: {...cc.goods, luxuries}}}
            },
            health: function (cc: CapitalistPlayer, health: {
                quantity: number,
                capacity: number,
                ftzQuantity: number,
                storageBought?: boolean
            }): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, goods: {...cc.goods, health}}}
            },
            education: function (cc: CapitalistPlayer, education: {
                quantity: number,
                capacity: number,
                storageBought?: boolean,
                ftzQuantity: number,
            }): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, goods: {...cc.goods, education}}}
            }
        }
    }
}