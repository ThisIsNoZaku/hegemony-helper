import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Grid, Radio, Stack, Tooltip} from "@mui/material";
import calculatePoints from "../utilities/calculateCapitalTrackPoints.ts";
import {capitalTrackPointsForCapital} from "../data/capitalTrack.ts";
import findCapitalTrackPosition from "../utilities/findCapitalTrackPosition.ts";

export default function CapitalTrack({estimatedFinalCapital, track, setTrack, fullTrack}: {
    estimatedFinalCapital: number,
    track: number,
    setTrack: (t: number) => void,
    fullTrack?: boolean
}) {
    const estimatedPoints = calculatePoints(estimatedFinalCapital, track);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return <Grid container columns={16} size="grow">
        {Object.entries(capitalTrackPointsForCapital)
            .map((ct, i) => {
                const visible = !isSmall || track === ct[1] || findCapitalTrackPosition(estimatedFinalCapital) === i || fullTrack;
                if (!visible) {
                    return <></>
                }
                return <Grid size={{xs: 16, sm: 2, md: 1}}>
                    <Tooltip
                        title={findCapitalTrackPosition(estimatedFinalCapital) === i ? `Your estimated final capital will score ${estimatedPoints} points` : ""}>
                        <Stack
                            direction={isSmall ? "row" : "column"}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            style={{
                                background: findCapitalTrackPosition(estimatedFinalCapital) === i ? "lightblue" : "inherit"
                            }}>
                            ${ct[0]}
                            <Radio checked={track === ct[1]}
                                   onChange={() => setTrack(ct[1])}/>
                            {ct[1]}
                        </Stack>
                    </Tooltip>
                </Grid>
            })}
    </Grid>
}