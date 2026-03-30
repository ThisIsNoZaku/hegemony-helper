import {Fragment} from "react";
import {Box, FormLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import LawIcon from "./LawIcon.tsx";
import type {LawId} from "../data/laws.ts";
import type {NonStatePlayerClass} from "../data/players.ts";
import {getClassColor, getClassTextColor} from "../utilities/getClassColor.ts";

const letters = ["A", "B", "C"];

export default function Law({title, law, value, setValue, favoredClasses = ["cc", "mc", "wc"]}: {
    title: string,
    favoredClasses?: [NonStatePlayerClass, NonStatePlayerClass, NonStatePlayerClass],
    law: LawId,
    value: 0 | 1 | 2,
    setValue: (newValue: 0 | 1 | 2) => void
}) {
    return <Fragment>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: 1}}>
            <FormLabel sx={{color: "white"}}>{title}</FormLabel><LawIcon law={law} sx={{color: "white"}}/>
        </Box>
        <div>
            <ToggleButtonGroup sx={{flexAlign: "center"}} exclusive>
                {[2, 1, 0].map((v, i) => <ToggleButton value={i} selected={value === v}
                                                                 style={{
                                                                     color: value === v ? getClassTextColor(favoredClasses[v]) : getClassColor(favoredClasses[v]),
                                                                     background: value === v ? getClassColor(favoredClasses[v]) : "darkgray"
                                                                 }}
                                                                 onClick={() => setValue(v as 0 | 1 | 2)}>{letters[i]}</ToggleButton>)}
            </ToggleButtonGroup>
        </div>
    </Fragment>
}