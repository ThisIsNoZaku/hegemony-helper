import CapitalistTaxes from "../../components/capitalists/CapitalistTaxes.tsx";

const meta = {
    component: CapitalistTaxes,
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
        pretaxRevenue: 100
    }
}