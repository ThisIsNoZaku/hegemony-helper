import {companyDefinitions, type CompanyInstance} from "./companies.ts";

export type Game = {
    laws: {
        labor: 0 | 1 | 2,
        tax: 0 | 1 | 2,
        health: 0 | 1 | 2,
        education: 0 | 1 | 2
    },
    capitalists: {
        revenue: number,
        capital: number,
        capitalTrackPosition: number,
        goods: {
            food: {
                quantity: number,
                storageBought?: boolean
            },
            luxuries: {
                quantity: number,
                storageBought?: boolean
            },
            health: {
                quantity: number,
                storageBought?: boolean
            }
            education: {
                quantity: number,
                storageBought?: boolean
            },
        },
        companies: (CompanyInstance | null)[]
    },
    workingClass: Record<string, unknown>,
    middleClass: Record<string, unknown>,
    state: Record<string, unknown>
}

export const initialGameState: Game = {
    laws: {
        labor: 1,
        tax: 2,
        health: 1,
        education: 0
    },
    capitalists: {
        revenue: 120,
        capital: 0,
        capitalTrackPosition: 0,
        goods: {
            food: {
                quantity: 1
            },
            education: {
                quantity: 2
            },
            health: {
                quantity: 0
            },
            luxuries: {
                quantity: 2
            },
        },
        companies:
            [
                {...companyDefinitions.clinic, wageLevel: 1} as CompanyInstance,
                {
                    ...companyDefinitions.superMarket,
                    wageLevel: 1,
                    workers: "wc",
                } as CompanyInstance,
                {
                    ...companyDefinitions.shoppingMall,
                    wageLevel: 1,
                    workers: "mc",
                } as CompanyInstance,
                {...companyDefinitions.college, wageLevel: 1, workers: "wc"} as CompanyInstance,
                null, null, null, null,
                null, null, null, null]
    },
    workingClass: {},
    middleClass: {},
    state: {}
}