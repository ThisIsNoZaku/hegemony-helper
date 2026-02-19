import type {GoodsName} from "./game.ts";

export type CompanyDefinition = {
    name: string,
    cost: number,
    fullyAutomated?: boolean,
    output: {
        base: number,
        automationBonus: number
    },
    type: GoodsName,
    wages: [number, number, number],
    possibleWorkers: ("wc" | "mc")[]
}


export type CompanyInstance = CompanyDefinition & {
    wageLevel?: 0 | 1 | 2
    workers?: "wc" | "mc" | null
    automatedBonus?: boolean
}