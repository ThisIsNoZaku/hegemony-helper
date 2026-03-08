import type {GoodsName} from "./goods.ts";

export interface CompanyDefinition {
    name: string,
    cost: number,
    output: {
        base: number,
        automationBonus?: number,
    },
    fullyAutomated?: true,
    type: GoodsName,
    wages: [number, number, number],
    possibleWorkers: ("wc" | "mc")[]
}

export interface MiddleClassCompanyDefinition extends CompanyDefinition {
    output: {
        base: number,
        wcWorkerBonus: number
    },
    bonusWorkerAllowed?: true,
    possibleWorkers: ["mc"]
}

export interface PublicCompanyDefinition extends CompanyDefinition {
    type: Exclude<GoodsName, "luxuries" | "food">,
}

export interface CompanyInstance extends CompanyDefinition {
    wageLevel?: 0 | 1 | 2
    workers?: "wc" | "mc" | null
    automatedBonus?: boolean,
    hasBonusWorker?: boolean,
    /**
     * Only for state companies.
     */
    companyClosed?: boolean
}