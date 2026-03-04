import type {CompanyInstance, PublicCompanyDefinition} from "./companies.ts";
import type {Player} from "./players.ts";

export interface StatePlayer extends Player {
    treasury: number,
    publicServices: {
        health: number,
        education: number,
        influence: number
    },
    companies: CompanyInstance[]
}

const largeWages:[number, number, number] = [35, 30, 25];
const smallWages:[number, number, number] = [20, 15, 10];

export const publicCompanies: Record<string, PublicCompanyDefinition> = {
    universityHospital: {
        name: "University Hospital",
        cost: 30,
        output: {
            base: 6,
        },
        type: "health",
        wages: largeWages,
        possibleWorkers: ["mc", "wc"]
    },
    technicalUniversity: {
        name: "Technical University",
        cost: 30,
        output: {
            base: 6,
        },
        type: "education",
        wages: largeWages,
        possibleWorkers: ["mc", "wc"]
    },
    nationalPublicBroadcasting: {
        name: "National Public Broadcasting",
        cost: 30,
        output: {
            base: 4,
        },
        type: "influence",
        wages: largeWages,
        possibleWorkers: ["mc", "wc"]
    },
    publicHospital: {
        name: "Public Hospital",
        cost: 20,
        output: {
            base: 6,
        },
        type: "health",
        wages: smallWages,
        possibleWorkers: ["mc", "wc"]
    },
    publicUniversity: {
        name: "Public University",
        cost: 20,
        output: {
            base: 6,
        },
        type: "education",
        wages: smallWages,
        possibleWorkers: ["mc", "wc"]
    },
    regionalTvStation: {
        name: "Regional TV Station",
        cost: 20,
        output: {
            base: 3,
        },
        type: "influence",
        wages: smallWages,
        possibleWorkers: ["mc", "wc"]
    }
}

export interface StatePlayerClass extends Player {
    treasury: number,
    publicServices: {
        health: number,
        education: number,
        influence: number
    },
    companies: CompanyInstance[]
}