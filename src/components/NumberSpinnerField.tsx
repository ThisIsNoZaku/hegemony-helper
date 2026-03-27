import {Button, Stack, TextField} from "@mui/material";
import {type MouseEvent, type FocusEvent} from "react";

export default function NumberSpinnerField({label, value, onChange}: {
    label: string,
    value: number,
    onChange: (e:MouseEvent<HTMLButtonElement> | FocusEvent<HTMLInputElement|HTMLTextAreaElement>, v:number) => void
}) {
    return <Stack direction="row" sx={{flexGrow: 2}}>
        <Button variant="contained" onClick={e => {
            onChange(e, value - 1);
        }}>
            -
        </Button>
        <TextField type="number"
                   label={label} value={value}
                   onBlur={e => {
                       onChange(e, Number.parseFloat(e.target.value))
                   }} sx={{flexGrow: 1}}/>
        <Button variant="contained" onClick={e => {
            onChange(e, value + 1);
        }}>
            +
        </Button>
    </Stack>
}