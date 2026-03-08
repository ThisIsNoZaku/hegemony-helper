import {ReceivedTaxes} from "../../components/state/ReceivedTaxes.tsx";

const meta = {
    component: ReceivedTaxes,
}

export default meta;

export const Generic = {
    args: {
        laws: {
            tax: 2,
            health: 1,
            education: 0
        },
        operationalCompanies: 1,
    }
}