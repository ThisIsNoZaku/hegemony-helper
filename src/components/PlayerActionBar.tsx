import {Button, Grid, Tooltip} from "@mui/material";
import type {ReactElement} from "react";

type ButtonConfig = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    content: ReactElement,
    tooltip?: string
}

export function PlayerActionBar({buttons}: {
    buttons: Record<string, React.MouseEventHandler<HTMLButtonElement> | ButtonConfig>
}) {
    return <Grid container size={4}
                 columns={{xs: Math.min(Object.keys(buttons).length, 3), sm: Math.min(Object.keys(buttons).length, 6)}}
                 spacing={1}>
        {Object.keys(buttons || {}).map(buttonId => {
            if (typeof buttons[buttonId] === "string") {
                return <Grid size={1} key={buttonId}>
                    <Button variant="contained" onClick={buttons[buttonId]}>
                        {buttonId}
                    </Button>
                </Grid>
            } else {
                const config = buttons[buttonId] as ButtonConfig;
                if (config.tooltip) {
                    return <Grid size={1} key={buttonId}>
                        <Tooltip title={config.tooltip}>
                            <Button variant="contained" onClick={config.onClick}>
                                {config.content}
                            </Button>
                        </Tooltip>
                    </Grid>
                } else {
                    return <Grid size={1} key={buttonId}>
                        <Button variant="contained" onClick={config.onClick}>
                            {config.content}
                        </Button>
                    </Grid>
                }
            }
        })}
    </Grid>
}