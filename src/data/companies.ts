import type {GoodsName} from "./goods.ts";
import type {EmployerPlayerClass} from "./players.ts";

export interface CompanyDefinition {
    name: string,
    cost: number,
    class: EmployerPlayerClass,
    output: {
        base: number,
        automationBonus?: number,
        wcWorkerBonus?: number
    },
    fullyAutomated?: true,
    type: GoodsName,
    wages: readonly [number, number, number],
    possibleWorkers: readonly ["wc", "mc"] | readonly ["mc"] | readonly  ["mc", "wc"],
    bonusWorkerAllowed?: boolean
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