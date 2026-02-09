import {PopulationTrack} from "../components/PopulationTrack.tsx";

const meta = {
    component: PopulationTrack,
    argTypes: {
        highlightColor: {
            value: "red",
            options: ["red", "goldenrod"],
            control: {
                type: "select",
            }
        }
    }
}

export default meta;

export const Generic = {
    args: {
        workers: 10,
        highlightColor: "red"
    }
}