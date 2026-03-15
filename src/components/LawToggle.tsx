import {Fragment} from "react";
import {Box, FormLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import LawIcon from "./LawIcon.tsx";
import type {LawId} from "../data/laws.ts";

export default function Law({title, law, value, setValue}: {
    title: string,
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
                <ToggleButton value={2} selected={value === 2}
                              style={{
                                  color: value === 2 ? "inherit" : "red",
                                  background: value === 2 ? "red" : "darkgray"
                              }}
                              onClick={() => setValue(2)}>A</ToggleButton>
                <ToggleButton value={1} selected={value === 1}
                              style={{
                                  color: value === 1 ? "inherit" : "gold",
                                  background: value === 1 ? "gold" : "darkgray"
                              }}
                              onClick={() => setValue(1)}>B</ToggleButton>
                <ToggleButton value={0} selected={value === 0}
                              style={{
                                  color: value === 0 ? "white" : "blue",
                                  background: value === 0 ? "blue" : "darkgray"
                              }}
                              onClick={() => setValue(0)}>C</ToggleButton>
            </ToggleButtonGroup>
        </div>
    </Fragment>
}