export interface CapitalistScoringPhaseResult {
    // The amount of revenue that was moved into capital
    amountMovedToCapital: number,
    // The total amount of capital, after moving revenue to capital
    finalCapital: number,
    // Where on the capital track the player started
    startingTrackMarkerPosition: number,
    // Where on the capital track the player ended
    finalTrackMarkerPosition: number,
    pointsEarned: number
}

export const EMPTY_CAPITALIST_SCORING_PHASE_RESULT: CapitalistScoringPhaseResult = {
    amountMovedToCapital: 0,
    finalCapital: 0,
    startingTrackMarkerPosition: 0,
    finalTrackMarkerPosition: 0,
    pointsEarned: 0
}