import type {CompanyDefinition, CompanyInstance} from "./companies.ts";
import type {BusinessGoodsStorage, Game, GoodsName, GoodsStorage, Player} from "./game.ts";
import type {UpdateCapitalistPlayerAction} from "../state/Reducers.ts";

export type CapitalistGoods = Record<GoodsName, BusinessGoodsStorage> & Record<"influence", GoodsStorage>


export type CapitalistProductionPhaseResult = {
    wages: { mc: number, wc: number, total: number },
    output: Record<GoodsName, number>,
    startingRevenue: number,
    startingCapital: number,
    endingCapital: number,
    endingRevenue: number
}
export const EMPTY_CAPITALIST_PRODUCTION_PHASE_RESULT: CapitalistProductionPhaseResult = {
    wages: {mc: 0, wc: 0, total: 0},
    output: {food: 0, luxuries: 0, health: 0, education: 0, influence: 0},
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

export const Cards = ["Offshore Companies", "Buy Private Island"]

export function playCapitalistCard(card: Record<string, unknown> & { name: string }, game: Game): Game {
    switch (card.name) {
        case "Offshore Companies":
            const amountMoved = Math.floor(game.capitalists.revenue / 2);
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    revenue: game.capitalists.revenue - amountMoved,
                    capital: game.capitalists.capital + amountMoved,
                    lastCardPlayed: {
                        ...card,
                        amountMoved
                    }
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    capital: game.capitalists.capital - 50,
                    points: game.capitalists.points + 7,
                    lastCardPlayed: card
                }
            }
    }
    return game;
}

export function undoCapitalistCard(game: Game): Game {
    const lastCard = game.capitalists.lastCardPlayed;
    if (!lastCard) {
        return game;
    }
    switch (lastCard.name) {
        case "Offshore Companies":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    revenue: game.capitalists.revenue + (lastCard as any).amountMoved,
                    capital: game.capitalists.capital - (lastCard as any).amountMoved,
                    lastCardPlayed: undefined
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    capital: game.capitalists.capital + 50,
                    points: game.capitalists.points - 7,
                    lastCardPlayed: undefined
                }
            }
    }
    return game;
}

const wageScale:Record<string, [number, number, number]> = {
    auto: [0, 0, 0],
    vLarge: [20, 30, 40],
    large: [25, 30, 35],
    medium: [10, 20, 30],
    small: [15, 20, 25],
    vSmall: [10, 15, 20]
}

export const companyDefinitions:Record<string, CompanyDefinition> = {
    automatedGrainFarm: {
        name: "Automated Grain Farm",
        cost: 25,
        fullyAutomated: true,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto,
        possibleWorkers: ["wc", "mc"]
    },
    medicalVillage: {
        name: "Medical Village",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.vLarge,
        possibleWorkers: ["wc", "mc"]
    },
    stadium: {
        name: "Stadium",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "luxuries" as const,
        wages: wageScale.large,
        possibleWorkers: ["wc", "mc"]
    },
    tvStation: {
        name: "TV Station",
        cost: 24,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vLarge,
        possibleWorkers: ["wc", "mc"]
    },
    lobbyingFirm: {
        name: "Lobbying Firm",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 0,
        },
        type: "influence" as const,
        wages: wageScale.medium,
        possibleWorkers: ["wc", "mc"]
    },
    fashionCompany: {
        name: "Fashion Company",
        cost: 8,
        output: {
            base: 4,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.vSmall,
        possibleWorkers: ["wc", "mc"]
    },
    fishFarm: {
        name: "Fish Farm",
        cost: 20,
        output: {
            base: 6,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.large,
        possibleWorkers: ["wc", "mc"]
    },
    radioStation: {
        name: "Radio Station",
        cost: 12,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vSmall,
        possibleWorkers: ["wc", "mc"]
    },
    shoppingMall: {
        name: "Shopping Mall",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.small,
        possibleWorkers: ["wc", "mc"]
    },
    clinic: {
        name: "Clinic",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.medium,
        possibleWorkers: ["wc", "mc"]
    },
    hotel: {
        name: "Hotel",
        cost: 15,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: [20, 25, 30],
        possibleWorkers: ["wc", "mc"]
    },
    fastFoodChain: {
        name: "Fast Food Chain",
        cost: 8,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.vSmall,
        possibleWorkers: ["wc", "mc"]
    },
    superMarket: {
        name: "Supermarket",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.small,
        possibleWorkers: ["wc", "mc"]
    },
    pharmaceuticalCompany: {
        name: "Pharmaceutical Company",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "health" as const,
        wages: wageScale.vLarge,
        possibleWorkers: ["wc", "mc"]
    },
    instituteOfTechnology: {
        name: "Institute of Technology",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 5
        },
        type: "education" as const,
        wages: wageScale.vLarge,
        possibleWorkers: ["wc", "mc"]
    },
    academy: {
        name: "Academy",
        cost: 12,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "education" as const,
        wages: [10, 20, 30],
        possibleWorkers: ["wc", "mc"]
    },
    college: {
        name: "College",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "education" as const,
        wages: [10, 20, 30],
        possibleWorkers: ["wc", "mc"]
    },
    hospital: {
        name: "Hospital",
        cost: 20,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "health" as const,
        wages: [10, 20, 30],
        possibleWorkers: ["wc", "mc"]
    },
    university: {
        name: "University",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "education" as const,
        wages: wageScale.vLarge,
        possibleWorkers: ["wc", "mc"]
    },
    carManufacturer: {
        name: "Car Manufacturer",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: wageScale.auto,
        possibleWorkers: ["wc", "mc"]
    },
    publishingHouse: {
        name: "Publishing House",
        cost: 12,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: [20, 25, 30],
        possibleWorkers: ["wc", "mc"]
    },
    electronicsManufacturer: {
        name: "Electronics Manufacturer",
        cost: 25,
        output: {
            base: 3,
            automationBonus: 0
        },
        fullyAutomated: true,
        type: "luxuries" as const,
        wages: wageScale.auto,
        possibleWorkers: ["wc", "mc"]
    },
    automatedDairyFarm: {
        name: "Automated Dairy Farm",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto,
        possibleWorkers: ["wc", "mc"]
    },
    vegetableFarm: {
        name: "Vegetable Farm",
        cost: 15,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "food" as const,
        wages: [20, 25, 30],
        possibleWorkers: ["wc", "mc"]
    },
};

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