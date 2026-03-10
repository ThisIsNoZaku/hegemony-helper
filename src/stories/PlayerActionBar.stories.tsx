import {PlayerActionBar} from "../components/PlayerActionBar.tsx";
import {fn} from "storybook/test";
import type {Mock} from "vitest";

const meta = {
    component: PlayerActionBar,
    args: {
        buttons: "Hello,World"
    },
    argTypes: {
        buttons: {
            control: "text",
        }
    }
}

export default meta;

export const CapitalistActions = {
    args: {
        onClick: fn()
    },
    render: (args: { buttons: string, onClick: Mock<(args:any[]) => void> }) => {
        return <PlayerActionBar buttons={Object.fromEntries(args.buttons.split(",").map((bt: string) => [bt, args.onClick] as any))}/>
    }
}