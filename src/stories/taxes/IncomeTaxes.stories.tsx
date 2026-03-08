import {IncomeTaxCalculator} from "../../components/taxes/IncomeTaxCalculator.tsx";

const meta = {
    component: IncomeTaxCalculator,
}

export default meta;

export const Generic = {
    args: {
        laws: {
            tax: 0,
            health: 0,
            education: 0
        },
        taxableWorkers: 3
    }
}