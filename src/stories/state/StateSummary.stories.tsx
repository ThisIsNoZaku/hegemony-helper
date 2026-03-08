import {StateSummary} from "../../components/state/StateSummary.tsx";

const meta = {
    component: StateSummary,
}

export default meta;

export const Generic = {
    args: {
        treasury: 120,
        storages: {
            foods: {
                quantity: 0,
                capacity: 8
            },
            luxuries: {
                quantity: 0,
                capacity: 12
            },
            health: {
                quantity: 6,
            },
            education: {
                quantity: 6
            },
            influence: {
                quantity: 4
            }
        }
    }
}