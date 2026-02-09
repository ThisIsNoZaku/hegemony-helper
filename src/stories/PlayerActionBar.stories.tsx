import {PlayerActionBar} from "../components/PlayerActionBar.tsx";
import {DispatchContext, GameContext} from "../state/GameContext.ts";
import {initialGameState} from "../data/game.ts";
import reducer from "../state/Reducers.ts";
import {useReducer} from "react";
import { fn } from "storybook/test";

const meta = {
    component: PlayerActionBar,
}

export default meta;

export const CapitalistActions = {
    args: {
        setSpecialCardDialogOpen: fn(),
        dispatch: fn()
    },
    render: (args:any) => {
        const [state] = useReducer(reducer, initialGameState);
        return <GameContext value={state}>
            <DispatchContext value={args.dispatch}>
                <PlayerActionBar enabledButtons={{"play_special_card": true, "loans" : true}} player={"cc"} setSpecialCardDialogOpen={value => args.setSpecialCardDialogOpen(value)} />
            </DispatchContext>
        </GameContext>
    }
}