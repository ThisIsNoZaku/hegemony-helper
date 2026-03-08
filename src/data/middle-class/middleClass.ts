import type {CompanyInstance} from "../companies.ts";
import type {Player, PlayerWithStorages} from "../players.ts";
import type {GoodStorage, StoredGoods} from "../goods.ts";
import {middleClassCompanies} from "./middleClassCompanies.ts";

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

export interface MiddleClassPlayer extends Player, PlayerWithStorages{
    /**
     * Purchased goods held by the player.
     */
    goods: Record<StoredGoods, number>,
    income: number;
    storage: Record<StoredGoods, GoodStorage>
    companies: (CompanyInstance | null)[],
    prosperity: number,
    population: number
};

export const STARTING_MIDDLE_CLASS_DATA: MiddleClassPlayer = {
    playerClass: "mc",
    points: 0,
    loans: 0,
    prosperity: 0,
    population: 10,
    personalInfluence: 1,
    companies: [
        {...middleClassCompanies.convenienceStore, wageLevel: 1, workers: "mc", hasBonusWorker: false},
        {...middleClassCompanies.doctorsOffice, wageLevel: 1, workers: "mc", hasBonusWorker: false},
        null, null, null, null, null, null
    ],
    goods: {
        food: 0,
        education: 0,
        health: 0,
        luxuries: 0
    },
    storage: {
        food: {
            quantity: 1,
            capacity: 8
        },
        education: {
            quantity: 0,
            capacity: 8
        },
        health: {
            quantity: 1,
            capacity: 8
        },
        luxuries: {
            quantity: 0,
            capacity: 8
        }
    },
    income: 40
}