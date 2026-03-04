import {Radio, Stack} from "@mui/material";
import Track from "../Track.tsx";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export default function ProsperityTrack({value, setValue, track, iconColor}: {
    value: number,
    track: number[],
    setValue: (value: number) => void,
    iconColor: "crimson" | "goldenrod"
}) {
    return <>
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}><EmojiEmotionsIcon
            sx={{color: iconColor}}/>Prosperity </div>
        <Track size={11} elementProducer={({index}) => {
            return <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                <Radio checked={index === value}
                       onChange={() => setValue(index)}
                />
                {track[index]}
            </Stack>
        }}/>
    </>
}