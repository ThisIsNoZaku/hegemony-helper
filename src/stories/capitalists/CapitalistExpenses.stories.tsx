import CapitalistExpenses from "../../components/capitalists/CapitalistExpenses.tsx";
import type {CompanyInstance} from "../../data/companies.ts";

const meta = {
    component: CapitalistExpenses,
}

export default meta;

export const Generic = {
    args: {
        laws: {
            tax: 2,
            health: 1,
            education: 0
        },
        revenue: 100,
        wcWages: [],
        mcWages: []
    },
    render: (args:any) => {
        const companies:CompanyInstance[] = args.wcWages.map((wage:number) => ({
            workers: "wc",
            wageLevel: 0,
            wages: [wage]
        })).concat(args.mcWages.map((wage:number,) => ({
            workers: "mc",
            wageLevel: 0,
            wages: [wage]
        })));
        return <CapitalistExpenses companies={companies} laws={args.laws} revenue={args.revenue}/>
    }
}