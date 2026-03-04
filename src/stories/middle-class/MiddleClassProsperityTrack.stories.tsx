import {useEffect, useState} from "react";
import MiddleClassProsperityTrack from "../../components/middle class/MiddleClassProsperityTrack.tsx";

const meta = {
    component: MiddleClassProsperityTrack,
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
        return <MiddleClassProsperityTrack value={value} setValue={changeValue}/>
    }
}