import {RadioTrack} from "../components/RadioTrack.tsx";
import {Radio, Stack} from "@mui/material";
import {capitalTrack} from "../data/capitalTrack.ts";

const meta = {
    component: RadioTrack
}

export default meta;

export const CapitalTrack = {
    args: {
        columns: 16,
        entries: capitalTrack,
        tooltips: capitalTrack.map((ct, i) => ct[0]),
        value: 4,
        itemProducer: (item: [string, any], i:number, value: unknown) => <Stack
            direction={"column"}
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}
            style={{
                background: i === 1 ? "lightblue" : "inherit"
            }}>
            ${item[0]}
            <Radio checked={value as number === item[1]}/>
            {item[1]}★
        </Stack>,
    }
}

export const LegitimacyTrack = {
    args: {
        columns: 10,
        entries: new Array(10).fill(0).map((_, i) => [i+1, i+1]),
        itemProducer: (item: [string, any], i:number) => <Stack
            direction={"column"}
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            {item[0]}★
            <Radio/>
        </Stack>,
    }
}