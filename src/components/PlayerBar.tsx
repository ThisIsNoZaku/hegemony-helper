import {AppBar, Button, Toolbar} from "@mui/material";
import {Link} from "react-router";
import {useContext} from "react";
import {GameContext} from "../state/GameContext.ts";
import type {PlayerClass} from "../data/players.ts";

export function PlayerBar({onChange}: { onChange: (playerClass: PlayerClass) => void }) {
    const game = useContext(GameContext);
    return <AppBar sx={{zIndex: 10000}}>
        <Toolbar variant="regular" sx={{justifyContent: "space-around"}}>
            <Button component={Link} to={`/wc/${game?.phase}`} variant="contained" sx={{backgroundColor: "crimson"}} onClick={() => onChange("wc")}>Working
                Class</Button>
            <Button component={Link} to={`/mc/${game?.phase}`} variant="contained" sx={{backgroundColor: "goldenrod"}} onClick={() => onChange("mc")}>Middle
                Class</Button>
            <Button component={Link} to={`/cc/${game?.phase}`} variant="contained" sx={{backgroundColor: "blue"}} onClick={() => onChange("cc")}>Capitalist
                Class</Button>
            <Button component={Link} to={`/state/${game?.phase}`} variant="contained" sx={{backgroundColor: "grey"}} onClick={() => onChange("state")}>The
                State</Button>
        </Toolbar>
    </AppBar>
}