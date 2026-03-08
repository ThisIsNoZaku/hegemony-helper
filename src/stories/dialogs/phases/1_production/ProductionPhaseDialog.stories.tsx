import ProductionPhaseDialog from "../../../../components/dialogs/ProductionPhaseDialog.tsx";
import {fn} from "storybook/test";

const meta = {
    component: ProductionPhaseDialog,
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

export const CapitalistClassProduction = {
    args: {
        production: {
            paidWages: {mc: 0, wc: 0},
            output: {food: 0, luxuries: 0, education: 0, health: 0, influence: 0},
            startingCapital: 100,
            startingRevenue: 50,
        },
        onConfirm: fn(),
        onCancel: fn()
    },
    render: (args:any) => {
        args.production.endingRevenue = args.production.startingRevenue - args.production.paidWages.mc - args.production.paidWages.wc;
        args.production.endingCapital = args.production.endingRevenue > 0 ? args.production.startingCapital : args.production.startingCapital + args.production.endingRevenue;
        args.production.endingRevenue = Math.max(0, args.production.endingRevenue);
        return <ProductionPhaseDialog open={true}
                                      player={"cc"}
                                      onConfirm={args.onConfirm}
                                      onCancel={args.onCancel}
                                      production={args.production}/>
    }
}

export const WorkingClassProduction = {
    args: {
        production: {
            earnedWages: {mc: 0, cc: 0, state: 0},
            output: {food: 0, influence: 0},
            startingIncome: 50,
            endingIncome: 0
        },
        onConfirm: fn(),
        onCancel: fn()
    },
    render: (args:any) => {
        return <ProductionPhaseDialog open={true}
                                      player={"wc"}
                                      onConfirm={args.onConfirm}
                                      onCancel={args.onCancel}
                                      production={args.production}/>
    }
}