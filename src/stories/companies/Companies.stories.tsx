import Companies from "../../components/CompaniesContainer.tsx";
import {GameContext} from "../../state/GameContext.ts";
import {initialGameState} from "../../data/game.ts";

const meta = {
    component: Companies,
    decorators: [
        (Story) => {
            const game = initialGameState;
            return <GameContext value={game}>
                <Story/>
            </GameContext>
        }
    ]
}

export default meta;

export const Capitalists = {
    args: {
        player: initialGameState.cc
    }
}

export const MiddleClass = {
    args: {
        player: initialGameState.mc
    }
}

export const State = {
    args: {
        player: initialGameState.state
    }
}