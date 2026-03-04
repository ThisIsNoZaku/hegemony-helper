import CompanySlot from "../../components/CompanySlot.tsx";

const meta = {
    component: CompanySlot,
    argTypes: {
        company: {
            value: null,
            options: [null, {
                type: "food",
                output: {
                    base: 1
                },
                wages: [10, 20, 30],
            }],
            control: {
                type: "select",
                labels: {
                    null: "Empty",
                    "[object Object]": "Example Company"
                }
            },
        }
    }
}

export default meta;

export const Generic = {
    args: {},
}