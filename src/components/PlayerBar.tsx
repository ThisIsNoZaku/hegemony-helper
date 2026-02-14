import {AppBar, Button, Toolbar} from "@mui/material";
import type {PlayerClass} from "../data/game.ts";

export function PlayerBar({onChange}: { onChange: (playerClass: PlayerClass) => void }) {
    // return <AppBar sx={{top: "1rem", height: "4rem", zIndex: 1000, maxWidth: 1280, margin: "0 auto", textAlign: "center"}}>
        return <AppBar sx={{zIndex: 10000}}>
        <Toolbar variant="regular" sx={{justifyContent: "space-around"}}>
            <Button variant="contained" sx={{backgroundColor: "crimson"}} onClick={() => onChange("wc")}>Working Class</Button>
            <Button variant="contained" sx={{backgroundColor: "goldenrod"}} onClick={() => onChange("mc")}>Middle Class</Button>
            <Button variant="contained" sx={{backgroundColor: "blue"}} onClick={() => onChange("cc")}>Capitalist Class</Button>
            <Button variant="contained" sx={{backgroundColor: "grey"}} onClick={() => onChange("state")}>The State</Button>
        </Toolbar>
    </AppBar>
}