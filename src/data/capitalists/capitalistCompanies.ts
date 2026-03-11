import type {CompanyDefinition} from "../companies.ts";

const wageScale: Record<string, [number, number, number]> = {
    auto: [0, 0, 0],
    vLarge: [20, 30, 40],
    large: [25, 30, 35],
    medium: [10, 20, 30],
    small: [15, 20, 25],
    vSmall: [10, 15, 20]
}
export const capitalistCompanies: Record<string, CompanyDefinition> = {
    automatedGrainFarm: {
        name: "Automated Grain Farm",
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
        cost: 16,
        output: {
            base: 4,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.small,
        possibleWorkers: ["wc", "mc"]
    },
    pharmaceuticalCompany: {
        name: "Pharmaceutical Company",
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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
        class: "cc",
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

