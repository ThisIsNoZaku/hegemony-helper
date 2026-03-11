import type {CompanyDefinition} from "../companies.ts";

const lowerWages: [number, number, number] = [6, 8, 10];
const higherWages: [number, number, number] = [9, 12, 15];
export const middleClassCompanies: Record<string, CompanyDefinition> = {
    convenienceStore: {
        name: "Convenience Store",
        "class": "mc",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "food",
        wages: lowerWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    doctorsOffice: {
        name: "Doctor's Office",
        "class": "mc",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "health",
        wages: lowerWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    localNewspaper: {
        name: "Local Newspaper",
        "class": "mc",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "influence",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    prAgency: {
        name: "PR Agency",
        "class": "mc",
        cost: 14,
        output: {
            base: 2,
            wcWorkerBonus: 1
        },
        type: "influence",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    gameStore: {
        name: "Game Store",
        "class": "mc",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "luxuries",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    regionalRadioStation: {
        name: "Regional Radio Station",
        "class": "mc",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "influence",
        wages: higherWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    tutoringCompany: {
        name: "Tutoring Company",
        "class": "mc",
        cost: 12,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "education",
        wages: lowerWages,
        bonusWorkerAllowed: true,
        possibleWorkers: ["mc"]
    },
    pharmacy: {
        name: "Pharmacy",
        "class": "mc",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "health",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    fastFoodRestaurant: {
        name: "Fast Food Restaurant",
        "class": "mc",
        cost: 20,
        output: {
            base: 3,
            wcWorkerBonus: 0
        },
        type: "food",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    organicFarm: {
        name: "Organic Farm",
        "class": "mc",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 2
        },
        type: "food",
        wages: higherWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    trainingCenter: {
        name: "Training Center",
        "class": "mc",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "education",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    jewelryStore: {
        name: "Jewelry Store",
        "class": "mc",
        cost: 16,
        output: {
            base: 4,
            wcWorkerBonus: 0
        },
        type: "luxuries",
        wages: [0, 0, 0],
        possibleWorkers: ["mc"]
    },
    privateSchool: {
        name: "Private School",
        "class": "mc",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "education",
        wages: higherWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    medicalLaboratory: {
        name: "Medical Laboratory",
        "class": "mc",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "health",
        wages: higherWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    },
    electronicsStore: {
        name: "Electronics Store",
        "class": "mc",
        cost: 20,
        output: {
            base: 2,
            wcWorkerBonus: 4
        },
        type: "luxuries",
        wages: higherWages,
        possibleWorkers: ["mc"],
        bonusWorkerAllowed: true
    }
}
