import {PopulationTrack} from "../components/PopulationTrack.tsx";
import {fn} from "storybook/test"
import {useState} from "react";

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

export const WorkingClass = {
    args: {
        workers: 10,
        highlightColor: "crimson",
        updatePopulation: fn()
    },
    render: (args: any) => {
        const [population, setPopulation] = useState(args.workers);
        return <PopulationTrack workers={population} highlightColor={args.highlightColor} updatePopulation={value => {
            args.updatePopulation(value);
            setPopulation(value);
        }}/>
    }
}

export const MiddleClass = {
    args: {
        workers: 10,
        highlightColor: "goldenrod",
        updatePopulation: fn()
    },
    render: (args:any) => {
        const [population, setPopulation] = useState(args.workers);
        return <PopulationTrack workers={population} highlightColor={args.highlightColor} updatePopulation={value => {
            args.updatePopulation(value);
            setPopulation(value);
        }}/>
    }
}