import {Radio, Stack} from "@mui/material";
import Track from "../Track.tsx";
import {MiddleClassProsperityTrack} from "../../data/middleClass.ts";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function WorkersProsperityTrack({value, setValue}: {
    value: number,
    setValue: (value: number) => void
}) {
    return <>
        <Stack>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>Prosperity <EmojiEmotionsIcon sx={{color: "goldenrod"}}/></div>
            <Track size={11} elementProducer={({index}) => {
                return <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                    <Radio checked={index === value}
                           onChange={() => setValue(index)}
                    />
                    {MiddleClassProsperityTrack[index]}
                </Stack>

            }}/>
        </Stack>
    </>
}