import {fn} from "storybook/test";
import ScoringPhaseDialog from "../../../../components/dialogs/ScoringPhaseDialog.tsx";

const meta = {
    component: ScoringPhaseDialog,
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

export const CapitalistClassScoringPhase = {
    args: {
        player: "cc",
        scoring: {
            finalCapital: 100,
            finalTrackMarkerPosition: 5,
            startingTrackMarkerPosition: 4
        },
        onConfirm: fn(),
        onCancel: fn()
    }
}

export const WorkingClassScoringPhase = {
    args: {
        player: "wc",
        onConfirm: fn(),
        onCancel: fn()
    }
}