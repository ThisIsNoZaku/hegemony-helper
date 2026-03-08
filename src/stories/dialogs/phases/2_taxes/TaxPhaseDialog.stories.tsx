import {fn} from "storybook/test";
import TaxPhaseDialog from "../../../../components/dialogs/TaxPhaseDialog.tsx";

const meta = {
    component: TaxPhaseDialog,
    args: {
        open: true
    },
    argTypes: {
        onConfirm: {
            table: {
                disable: true
            }
        },
        onCancel: {
            table: {
                disable: true
            }
        },
        open: {
            table: {
                disable: true
            }
        },
        player: {
            table: {
                disable: true
            }
        }
    }
}

export default meta;

export const CapitalistClassTaxesPhase = {
    args: {
        player: "cc",
        employmentTax: 20,
        capitalTax: 10,
        endingRevenue: 10,
        endingCapital: 10,
        onConfirm: fn(),
        onCancel: fn()
    }
}

export const WorkingClassTaxesPhase = {
    args: {
        player: "wc",
        incomeTax: 20,
        endingIncome: 80,
        onConfirm: fn(),
        onCancel: fn()
    }
}