import findCapitalTrackPosition from "./findCapitalTrackPosition.ts";

/**
 *
 * @param endingCapital
 * @param startingCapitalTrack
 */
const calculatePoints = function (endingCapital: number, startingCapitalTrack: number) {
    const trackPosition = findCapitalTrackPosition(endingCapital)
    return (3 * Math.max(0, trackPosition - startingCapitalTrack)) + trackPosition;
}

export default calculatePoints;