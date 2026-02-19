import {fn} from "storybook/test";
import PoliticsPhaseDialog from "../../../../components/PoliticsPhaseDialog.tsx";
import {useState} from "react";

const meta = {
    component: PoliticsPhaseDialog,
    args: {
        open: true,
        proposedLawsPassed: 0,
        supportedLawsPassed: 0,
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
    },
    render: args => {
        const [supportedLawsPassed, setSupportedLawsPassed] = useState(args.supportedLawsPassed);
        const [proposedLawsPassed, setProposedLawsPassed] = useState(args.proposedLawsPassed)

        return <PoliticsPhaseDialog open={args.open}
                                    player={args.player}
                                    onConfirm={args.onConfirm}
                                    onCancel={args.onCancel}
                                    proposedLawsPassed={proposedLawsPassed}
                                    setProposedLawsPassed={setProposedLawsPassed}
                                    supportedLawsPassed={supportedLawsPassed}
                                    setSupportedLawsPassed={setSupportedLawsPassed}/>
    }
}

export default meta;

export const CapitalistClassPoliticsPhase = {
    args: {
        player: "cc",
        lastPoliticsPhase: {
            proposedLawsPassed: 0,
            supportedLawsPassed: 0,
            totalPoints: 0
        },
        onConfirm: fn(),
        onCancel: fn()
    }
}

export const WorkingClassPoliticsPhase = {
    args: {
        player: "wc",
        incomeTax: 20,
        endingIncome: 80,
        onConfirm: fn(),
        onCancel: fn()
    }
}