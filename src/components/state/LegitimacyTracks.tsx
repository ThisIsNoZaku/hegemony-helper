import {Box, Radio, Stack, TextField} from "@mui/material";
import {RadioTrack} from "../RadioTrack.tsx";
import PersonIcon from "@mui/icons-material/Person";
import {getClassColor} from "../../utilities/getClassColor.ts";
import type {PlayerClass} from "../../data/players.ts";
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ShieldIcon from "@mui/icons-material/Shield";

export default function LegitimacyTracks({legitimacy, onChange, onShieldsChange}: {
    legitimacy: {
        values: {
            wc: number,
            mc: number,
            cc: number,
        },
        shields: {
            wc: number,
            mc: number,
            cc: number,
        }
    }
    onChange: (changes: { wc?: number, mc?: number, cc?: number }) => void,
    onShieldsChange: (changes: { wc?: number, mc?: number, cc?: number }) => void
}) {
    const itemProducer = (playerLegitimacy: number, player: PlayerClass) => (item: [string, any], _i: number, _value: unknown) =>
        <Stack sx={{
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Radio checked={playerLegitimacy === item[1]} sx={{
                color: "white",
                '&.Mui-checked': {color: "white"}
            }}
                   onChange={_e => onChange({[player]: Number.parseInt(item[0])})}
            />
            {item[0]}★
        </Stack>
    return <Stack spacing={1}>
        {row("wc", itemProducer(legitimacy.values.wc, "wc"), legitimacy.values.wc, legitimacy.shields.wc, onShieldsChange)}
        {row("mc", itemProducer(legitimacy.values.mc, "mc"), legitimacy.values.mc, legitimacy.shields.mc, onShieldsChange)}
        {row("cc", itemProducer(legitimacy.values.cc, "cc"), legitimacy.values.cc, legitimacy.shields.cc, onShieldsChange)}
    </Stack>
}

function row(player: PlayerClass, itemProducer: (item: [string, any], legitimacy: number, legitimacyShields: number) => React.JSX.Element, legitimacy: number, shields: number, onShieldsChange: (changes: {
    wc?: number;
    mc?: number;
    cc?: number
}) => void) {
    return <Stack sx={{justifyContent: "center", alignItems: "center"}} direction="row">
        <RadioTrack
            sx={{backgroundColor: getClassColor(player), color: "white"}}
            columns={10}
            entries={[["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6], ["7", 7], ["8", 8], ["9", 9], ["10", 10]]}
            value={legitimacy}
            itemProducer={itemProducer}/>
        <Stack sx={{minHeight: "66px", backgroundColor: getClassColor(player), color: "white", height: "100%"}}>
            <PersonIcon/>
            <Box sx={{minWidth: "24px", position: "relative"}}>
                <ShieldIcon sx={{position: "absolute", top: "0", left: 0}}/>
                <PlusOneIcon sx={{color: getClassColor(player), position: "absolute", top: 0, left: 0}}/>
            </Box>
        </Stack>
        <Box sx={{
            backgroundColor: getClassColor(player),
            color: "white",
            height: "66px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            x
        </Box>
        <Box sx={{
            backgroundColor: getClassColor(player),
            color: "white",
            height: "66px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TextField type="number" value={shields}
                       sx={{input: {color: "white"}}}
                       onChange={e => onShieldsChange({[player]: Math.max(0, Number.parseInt(e.target.value))})}/>
        </Box>
    </Stack>
}