import {Grid, Tooltip} from "@mui/material";
import {type ReactElement} from "react";

export default function Track(props: { size: number, elementProducer: (props) => ReactElement }) {
    const {size, elementProducer} = props;
    return <Grid container direction="row" spacing={1} columns={size} sx={{justifyContent: "space-between", flexGrow: 1}}>
        {[...Array(size)].map((_, index) => (
            <Tooltip title="">
                <Grid sx={{flexGrow: 1}}>
                    {elementProducer({index, trackProps: props})}
                </Grid>
            </Tooltip>
        ))}
    </Grid>
}