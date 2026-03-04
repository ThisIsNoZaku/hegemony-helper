import type {BusinessGoodsStorage, GoodsStorage} from "./game.ts";
import type {CompanyInstance, MiddleClassCompanyDefinition} from "./companies.ts";
import type {UpdateMiddleClassPlayerAction} from "../state/Reducers.ts";
import type {Player, PlayerWithStorages} from "./players.ts";
import type {GoodsName} from "./goods.ts";

export const middleClassProsperityTrack = [
    0,
    1,
    2,
    3,
    4,
    5,
    5,
    6,
    6,
    7,
    7
]

const lowerWages: [number, number, number] = [6, 8, 10];
const higherWages: [number, number, number] = [9, 12, 15];

export const middleClassCompanies = {
    convenienceStore: {
        name: "Convenience Store",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "food",
        wages: lowerWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    doctorsOffice: {
        name: "Doctor's Office",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "health",
        wages: lowerWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    localNewspaper: {
        name: "Local Newspaper",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "influence",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    prAgency: {
        name: "PR Agency",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "influence",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    gameStore: {
        name: "Game Store",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "luxuries",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    regionalRadioStation: {
        name: "Regional Radio Station",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "influence",
        wages: higherWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    tutoringCompany: {
        name: "Tutoring Company",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "education",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    pharmacy: {
        name: "Pharmacy",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "health",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    fastFoodRestaurant: {
        name: "Fast Food Restaurant",
        cost: 20,
        output: {
            base: 3,
            wcWorkerBonus: 0
        },
        type: "food",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    organicFarm: {
        name: "Organic Farm",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "food",
        wages: higherWages,
        possibleWorkers: ["mc"]
    },
    trainingCenter: {
        name: "Training Center",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "education",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    jewelryStore: {
        name: "Jewelry Store",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "luxuries",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    privateSchool: {
        name: "Private School",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "education",
        wages: higherWages,
        possibleWorkers: ["mc"]
    },
    medicalLaboratory: {
        name: "Medical Laboratory",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "health",
        wages: higherWages,
        possibleWorkers: ["mc"]
    },
    electronicsStore: {
        name: "Electronics Store",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "luxuries",
        wages: higherWages,
        possibleWorkers: ["mc"]
    }
} as const satisfies Record<string, MiddleClassCompanyDefinition>

export interface MiddleClassPlayer extends Player, PlayerWithStorages{
    /**
     * Purchased goods held by the player.
     */
    goods: Record<GoodsName, number>,
    income: number;
    storages: Record<GoodsName, BusinessGoodsStorage>
    companies: (CompanyInstance | null)[],
    prosperity: number,
    population: number
};

export const Actions = {
    update: {
        population: function (mc: MiddleClassPlayer, population: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, population}}
        },
        income: function (mc: MiddleClassPlayer, income: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, income}}
        },
        companies: function (mc: MiddleClassPlayer, companies: (CompanyInstance | null)[]): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, companies}}
        },
        goods: {
            food: function (mc: MiddleClassPlayer, food:number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, food}}}
            },
            luxuries: function (mc: MiddleClassPlayer, luxuries: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, luxuries}}}
            },
            health: function (mc: MiddleClassPlayer, health: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, health}}}
            },
            education: function (mc: MiddleClassPlayer, education: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, education}}}
            },
            influence: function (mc: MiddleClassPlayer, influence: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, influence}}}
            }
        }
    }
}