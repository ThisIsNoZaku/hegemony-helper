import {Radio, Stack} from "@mui/material";
import Track from "../Track.tsx";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import StarIcon from '@mui/icons-material/Star';
import {PlayerActionBar} from "../PlayerActionBar.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {getClassColor} from "../../utilities/getClassColor.ts";
import {type WorkingClassPlayer} from "../../data/working-class/workingClass.ts";
import type {UpdatePlayerAction} from "../../state/Reducers.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import {EducationIcon, HealthIcon, LuxuryIcon} from "../Icons.tsx";
import PersonIcon from "@mui/icons-material/Person";

export default function ProsperityTrack({value, setValue, track, player}: {
    value: number,
    track: number[],
    setValue: (value: number) => void,
    player: WorkingClassPlayer | MiddleClassPlayer
}) {
    const dispatch = useContext(DispatchContext);
    // TODO: Consume resources when bumping.
    const buttons = {
        "prosperity-up": {
            content: <>
                <EducationIcon/>/<LuxuryIcon/>→ +<EmojiEmotionsIcon sx={{color: getClassColor(player.playerClass)}}/>
            </>,
            onClick: () => {
                dispatch!({
                    type: "update_player",
                    player: "wc",
                    playerData: {
                        prosperity: Math.min(10, value + 1),
                        points: player.points + track[Math.min(10, value + 1)]
                    }
                } as UpdatePlayerAction)
            },
            tooltip: "Increase Prosperity by 1."
        },
        "prosperity-up-healthcare": {
            content: <>
                <HealthIcon/> → → +<EmojiEmotionsIcon sx={{color: getClassColor(player.playerClass)}}/> + 2<StarIcon
                sx={{color: getClassColor(player.playerClass)}}/> + <PersonIcon
                sx={{color: getClassColor(player.playerClass)}}/>
            </>,
            onClick: () => {
                dispatch!({
                    type: "update_player",
                    player: "wc",
                    playerData: {
                        population: player.population + 1,
                        prosperity: Math.min(10, value + 1),
                        points: player.points + track[Math.min(10, value + 1)] + 2
                    }
                } as UpdatePlayerAction)
            },
            tooltip: "Increase Prosperity by 1 and gain 2 bonus points. Add an unskilled worker to Unemployed workers box."
        }
    }
    return <>
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <EmojiEmotionsIcon sx={{color: getClassColor(player.playerClass)}}/>
            <strong>Prosperity</strong>
        </div>
        <Track size={11} elementProducer={({index}) => {
            return <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                <Radio checked={index === value}
                       onChange={() => setValue(index)}
                />
                {track[index]}
            </Stack>
        }}/>
        <PlayerActionBar buttons={buttons}/>
    </>
}