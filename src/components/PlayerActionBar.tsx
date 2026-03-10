import {Button, Grid} from "@mui/material";

export type AllowedButtons = "play_special_card" | "loans";

export function PlayerActionBar({buttons}: {
    buttons: Record<string, React.MouseEventHandler<HTMLButtonElement>>
}) {
    return <Grid container size={4} columns={{xs: 3, sm: 6}} spacing={1}>
        {Object.keys(buttons || {}).map(buttonText => {
            return <Grid size={1} key={buttonText}>
                <Button variant="contained" onClick={buttons[buttonText]}>
                    {buttonText}
                </Button>
            </Grid>
        })}
    </Grid>
}