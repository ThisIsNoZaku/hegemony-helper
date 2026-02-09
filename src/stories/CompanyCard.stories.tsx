import CompanyCard from "../components/capitalists/CompanyCard.tsx";
import type {CompanyInstance} from "../data/companies.ts";
import {fn} from "storybook/test";

const meta = {
    component: CompanyCard,
    argTypes: {
        laborLaw: {
            control: {
                type: "number",
                min: 0,
                max: 2
            }
        },
        wageLevel: {
            control: {
                type: "number",
                min: 0,
                max: 2
            }
        },
        companyType: {
            control: {
                type: "select",
            },
            options: ["food", "luxuries", "health", "education", "influence"]
        },
        workers: {
            control: {
                type: "select",
                labels: {
                    null: "None",
                    "mc": "Middle Class",
                    "wc": "Working Class"
                }
            },
            options: [null, "mc", "wc"],
        }
    }
}

export default meta;

export const Generic = {
    args: {
        companyName : "Example",
        baseOutput: 0,
        workers: "mc",
        automationBonus: 0,
        laborLaw: 0,
        companyType: "food",
        updateCompany: fn(),
        wages: [10, 20, 30],
        wageLevel: 0,
        automation: false,
        fullyAutomated: false,
    },
    render: (args:any) => {
        const company:CompanyInstance = {
            name: args.companyName,
            cost: 0,
            automatedBonus: args.automation,
            fullyAutomated: args.fullyAutomated,
            output: {
                base: args.baseOutput,
                automationBonus: args.automationBonus
            },
            workers: args.workers,
            type: args.companyType,
            wages: args.wages,
            wageLevel: args.wageLevel
        }
        return <CompanyCard laborLaw={args.laborLaw} company={company} index={0} updateCompany={args.updateCompany} />
    }
}