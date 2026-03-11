import type {PublicCompanyDefinition} from "../companies.ts";

const largeWages: [number, number, number] = [35, 30, 25];
const smallWages: [number, number, number] = [20, 15, 10];

export const publicCompanies: Record<string, PublicCompanyDefinition> = {
    universityHospital: {
        name: "University Hospital",
        class: "state",
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
        class: "state",
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
        class: "state",
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
        class: "state",
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
        class: "state",
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
        class: "state",
        cost: 20,
        output: {
            base: 3,
        },
        type: "influence",
        wages: smallWages,
        possibleWorkers: ["mc", "wc"]
    }
}


