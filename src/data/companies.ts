export type CompanyDefinition = {
    name: string,
    cost: number,
    fullyAutomated?: boolean,
    output: {
        base: number,
        automationBonus: number
    },
    type: "health" | "education" | "luxuries" | "food" | "influence",
    wages: [number, number, number]
}

const wageScale = {
    auto: [0, 0, 0],
    vLarge: [20, 30, 40],
    large: [25, 30, 35],
    medium: [10, 20, 30],
    small: [15, 20, 25],
    vSmall: [10, 15, 20]
}

export const companyDefinitions = {
    automatedGrainFarm: {
        name: "Automated Grain Farm",
        cost: 25,
        fullyAutomated: true,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto
    },
    medicalVillage: {
        name: "Medical Village",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.vLarge
    },
    stadium: {
        name: "Stadium",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "luxuries" as const,
        wages: wageScale.large
    },
    tvStation: {
        name: "TV Station",
        cost: 24,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vLarge
    },
    lobbyingFirm: {
        name: "Lobbying Firm",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 0,
        },
        type: "influence" as const,
        wages: wageScale.medium
    },
    fashionCompany: {
        name: "Fashion Company",
        cost: 8,
        output: {
            base: 4,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.vSmall
    },
    fishFarm: {
        name: "Fish Farm",
        cost: 20,
        output: {
            base: 6,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.large
    },
    radioStation: {
        name: "Radio Station",
        cost: 12,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vSmall
    },
    shoppingMall: {
        name: "Shopping Mall",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.small
    },
    clinic: {
        name: "Clinic",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.medium
    },
    hotel: {
        name: "Hotel",
        cost: 15,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: [20, 25, 30]
    },
    fastFoodChain: {
        name: "Fast Food Chain",
        cost: 8,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.vSmall
    },
    superMarket: {
        name: "Supermarket",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.small
    },
    pharmaceuticalCompany: {
        name: "Pharmaceutical Company",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "health" as const,
        wages: wageScale.vLarge
    },
    instituteOfTechnology: {
        name: "Institute of Technology",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 5
        },
        type: "education" as const,
        wages: wageScale.vLarge
    },
    academy: {
        name: "Academy",
        cost: 12,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "education" as const,
        wages: [10, 20, 30]
    },
    college: {
        name: "College",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "education" as const,
        wages: [10, 20, 30]
    },
    hospital: {
        name: "Hospital",
        cost: 20,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "health" as const,
        wages: [10, 20, 30]
    },
    university: {
        name: "University",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "education" as const,
        wages: wageScale.vLarge
    },
    carManufacturer: {
        name: "Car Manufacturer",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: wageScale.auto
    },
    publishingHouse: {
        name: "Publishing House",
        cost: 12,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: [20, 25, 30]
    },
    electronicsManufacturer: {
        name: "Electronics Manufacturer",
        cost: 25,
        output: {
            base: 3,
            automationBonus: 0
        },
        fullyAutomated: true,
        type: "luxuries" as const,
        wages: wageScale.auto
    },
    automatedDairyFarm: {
        name: "Automated Dairy Farm",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto
    },
    vegetableFarm: {
        name: "Vegetable Farm",
        cost: 15,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "food" as const,
        wages: [20, 25, 30]
    },
};

export type CompanyInstance = CompanyDefinition & {
    wageLevel: 0 | 1 | 2
    wagesLocked: boolean
    workers?: "wc" | "mc" | null
    automatedBonus?: boolean
}