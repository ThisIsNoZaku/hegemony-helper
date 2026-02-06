import {AppBar, Button, Toolbar} from "@mui/material";
import type {PlayerClass} from "../data/game.ts";

export function PlayerBar({onChange}: { onChange: (playerClass: PlayerClass) => void }) {
    return <AppBar position="sticky" sx={{top: 0, bottom: 'auto', marginBottom: 2, maxHeight: 64}}>
        <Toolbar variant="regular" sx={{justifyContent: "space-between"}}>
            <Button variant="contained" sx={{backgroundColor: "crimson"}} onClick={() => onChange("wc")}>Working Class</Button>
            <Button variant="contained" sx={{backgroundColor: "goldenrod"}} onClick={() => onChange("mc")}>Middle Class</Button>
            <Button variant="contained" sx={{backgroundColor: "blue"}} onClick={() => onChange("cc")}>Capitalist Class</Button>
            <Button variant="contained" sx={{backgroundColor: "grey"}} onClick={() => onChange("state")}>The State</Button>
        </Toolbar>
    </AppBar>
}