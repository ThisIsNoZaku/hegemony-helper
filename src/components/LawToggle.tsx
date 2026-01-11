import {Fragment} from "react";
import {FormLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";

export default function Law({title, value, setValue}: { title: string, value: 0 | 1 | 2, setValue: (newValue: 0 | 1 | 2) => void }) {
    return <Fragment><FormLabel>{title}</FormLabel>
        <div>
            <ToggleButtonGroup sx={{flexAlign: "center"}} exclusive>
                <ToggleButton value={2} selected={value === 2}
                              style={{
                                  color: value === 2 ? "inherit" : "red",
                                  background: value === 2 ? "red" : "inherit"
                              }}
                              onClick={() => setValue(2)}>A</ToggleButton>
                <ToggleButton value={1} selected={value === 1}
                              style={{
                                  color: value === 1 ? "inherit" : "gold",
                                  background: value === 1 ? "gold" : "inherit"
                              }}
                              onClick={() => setValue(1)}>B</ToggleButton>
                <ToggleButton value={0} selected={value === 0}
                              style={{
                                  color: value === 0 ? "white" : "blue",
                                  background: value === 0 ? "blue" : "white"
                              }}
                              onClick={() => setValue(0)}>C</ToggleButton>
            </ToggleButtonGroup>
        </div>
    </Fragment>
}