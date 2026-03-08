import type {ReactNode} from "react";
import {Stack, TextField} from "@mui/material";
import type {TextFieldVariants} from "@mui/material/TextField";

export default function IconField({icon, value, label, variant}: {
    icon: ReactNode,
    value: number | string,
    label: string,
    variant?: TextFieldVariants
}) {
    return <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
        {icon}
        <TextField slotProps={{inputLabel: {shrink: true}}} label={label}
                   value={value}
                   variant={variant}/>
    </Stack>
}