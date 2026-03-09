import ProsperityTrack from "../components/workers/ProsperityTrack.tsx";
import {useEffect, useState} from "react";
import {workingClassProsperityTrack} from "../data/working-class/workingClass.ts";
import {middleClassProsperityTrack} from "../data/middle-class/middleClass.ts";

const meta = {
    component: ProsperityTrack,
}

export default meta;

export const WorkingClass = {
    args: {
        value: 0,
        setValue: (v: number) => console.log(v)
    },
    render: (args:any) => {
        const [value, setValue] = useState(args.value);
        const changeValue = (value:number) => {
            args.setValue(value);
            setValue(value);
        }
        useEffect(() => {
            setValue(Math.min(10, Math.max(args.value, 0)));
        }, [args.value])
        return <ProsperityTrack value={value} setValue={changeValue} track={workingClassProsperityTrack} iconColor="crimson"/>
    }
}

export const MiddleClass = {
    args: {
        value: 0,
        setValue: (v: number) => console.log(v)
    },
    render: (args:any) => {
        const [value, setValue] = useState(args.value);
        const changeValue = (value:number) => {
            args.setValue(value);
            setValue(value);
        }
        useEffect(() => {
            setValue(Math.min(10, Math.max(args.value, 0)));
        }, [args.value])
        return <ProsperityTrack value={value} setValue={changeValue} track={middleClassProsperityTrack} iconColor="goldenrod"/>
    }
}