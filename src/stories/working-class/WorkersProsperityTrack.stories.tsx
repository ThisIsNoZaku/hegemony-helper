import ProsperityTrack from "../../components/workers/ProsperityTrack.tsx";
import {useEffect, useState} from "react";

const meta = {
    component: ProsperityTrack,
}

export default meta;

export const Generic = {
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
        return <ProsperityTrack value={value} setValue={changeValue}/>
    }
}