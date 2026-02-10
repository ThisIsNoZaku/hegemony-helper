import EmploymentTaxesCalculator from "../../components/taxes/EmploymentTaxesCalculator.tsx";

const meta = {
    component: EmploymentTaxesCalculator,
}

export default meta;

export const Generic = {
    args: {
        laws: {
            tax: 0,
            health: 0,
            education: 0
        },
        operationalCompanies: 1,
        pretaxRevenue: 100
    }
}