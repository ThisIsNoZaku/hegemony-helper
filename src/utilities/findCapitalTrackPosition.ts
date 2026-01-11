import {capitalTrack} from "../data/capitalTrack.ts";

const findCapitalTrackPosition = function (capital:number) {
    return capitalTrack.reduce((acc, ct, i) => {
        return Number.parseInt(ct[0]) <= capital && i > acc ? i : acc;
    }, 0)
}

export default findCapitalTrackPosition;