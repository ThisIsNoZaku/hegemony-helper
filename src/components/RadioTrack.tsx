import {Grid, Tooltip} from "@mui/material";
import type {ReactElement} from "react";
import type {SxProps} from "@mui/system";

export function RadioTrack({sx, columns, tooltips, entries, itemVisible, itemProducer, value}: {
    sx?: SxProps,
    columns: number,
    tooltips?: string[] | ((index: number) => string),
    entries: [string, any][],
    value: number,
    itemVisible?: ((item: [string, any], index: number, value: number) => boolean),
    itemProducer: (item: [string, any], index: number, value: number) => ReactElement
}) {
    return <Grid container size="grow" columns={columns} sx={sx}>
        {entries
            .filter((item: [string, any], i: number) => !itemVisible || itemVisible(item, i, value))
            .map((item: [string, any], i: number) => {
                const tooltip = tooltips ? (typeof tooltips === "function" ? tooltips(i) : tooltips[i]) : null;
                if (tooltip) {
                    return <Grid size={{xs: 16, sm: 2, md: 1}}>
                        <Tooltip title={tooltip}>
                            {itemProducer(item, i, value)}
                        </Tooltip>
                    </Grid>
                } else {
                    return <Grid size={{xs: 16, sm: 2, md: 1}}>
                        {itemProducer(item, i, value)}
                    </Grid>
                }

            })}
    </Grid>
}