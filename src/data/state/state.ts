import type {CompanyInstance} from "../companies.ts";
import type {Player} from "../players.ts";
import type {LawLevel, PrimaryLawId} from "../laws.ts";
import type {GoodStorage} from "../goods.ts";
import {publicCompanies} from "./publicCompanies.ts";

export interface StatePlayer extends Player {
    treasury: number,
    legitimacy: {
        values: {
            mc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
            wc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
            cc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        },
        shields: {
            mc: number,
            wc: number,
            cc: number
        }
    },
    publicServices: {
        health: number,
        education: number,
        influence: number
    },
    companies: CompanyInstance[],
    storages: Record<"food" | "luxuries", GoodStorage>
}

const politicalAgenda: Record<PrimaryLawId, LawLevel>[] = [
    {
        fiscal: 1,
        labor: 2,
        tax: 0,
        health: 2,
        education: 0
    },
    {
        fiscal: 0,
        labor: 1,
        tax: 1,
        health: 1,
        education: 2
    },
    {
        fiscal: 1,
        labor: 0,
        tax: 2,
        health: 1,
        education: 2
    },
    {
        fiscal: 0,
        labor: 1,
        tax: 2,
        health: 1,
        education: 0
    },
    {
        fiscal: 1,
        labor: 0,
        tax: 1,
        health: 2,
        education: 1
    },
    {
        fiscal: 0,
        labor: 1,
        tax: 1,
        health: 2,
        education: 1
    },
    {
        fiscal: 2,
        labor: 0,
        tax: 1,
        health: 0,
        education: 2
    },
    {
        fiscal: 2,
        labor: 1,
        tax: 0,
        health: 1,
        education: 0
    },
    {
        fiscal:0,
        labor: 2,
        tax: 2,
        health: 0,
        education: 1
    },
    {
        fiscal: 1,
        labor: 2,
        tax: 0,
        health: 0,
        education: 2
    }
]

export const STARTING_STATE_PLAYER_DATA: StatePlayer = {
    playerClass: "state",
    points: 0,
    personalInfluence: 1,
    loans: 0,
    treasury: 120,
    legitimacy: {
        values: {
            mc: 2,
            wc: 2,
            cc: 2
        },
        shields: {
            mc: 0,
            wc: 0,
            cc: 0
        }
    },
    storages: {
        food: {
            quantity: 0,
            capacity: 8
        },
        luxuries: {
            quantity: 0,
            capacity: 12
        }
    },
    publicServices: {
        health: 6,
        education: 6,
        influence: 4
    },
    companies: [
        {...publicCompanies.universityHospital, wageLevel: 1, workers: "wc", companyClosed: false},
        {...publicCompanies.technicalUniversity, wageLevel: 1, workers: "mc", companyClosed: false},
        {...publicCompanies.nationalPublicBroadcasting, wageLevel: 1, companyClosed: false},
        {...publicCompanies.publicHospital, companyClosed: true},
        {...publicCompanies.publicUniversity, companyClosed: true},
        {...publicCompanies.regionalTvStation, companyClosed: true},
        {...publicCompanies.publicHospital, companyClosed: true},
        {...publicCompanies.publicUniversity, companyClosed: true},
        {...publicCompanies.regionalTvStation, companyClosed: true},
    ]
}

