import type {Game, GamePhase, LastTaxPhase} from "../data/game.ts";
import {
    type CapitalistPlayer,
    playCapitalistCard, undoCapitalistCard
} from "../data/capitalists/capitalists.ts";
import calculateProduction from "../utilities/calculateProduction.ts";
import calculateTaxes, {allCapitalistTaxes} from "../utilities/phases/taxes/calculateTaxes.ts";
import findCapitalTrackPosition from "../utilities/findCapitalTrackPosition.ts";
import type {WorkingClassPlayer} from "../data/working-class/workingClass.ts";
import type {MiddleClassPlayer} from "../data/middle-class/middleClass.ts";
import type {PlayerClass} from "../data/players.ts";
import type {LawId, LawLevel} from "../data/laws.ts";
import {
    type CapitalistScoringPhaseResult,
    EMPTY_CAPITALIST_SCORING_PHASE_RESULT
} from "../data/capitalists/capitalistScoringPhaseResult.ts";
import calculateScoring from "../utilities/phases/scoring/calculateScoring.ts";
import _ from "lodash";

export type AppState = {
    game: Game,
    openDialog: string | null
}

function executeAction(state: AppState, action: ReducerAction): AppState {
    switch (action.type) {
        case "update_player":
            const updatePlayerEvent = action as UpdatePlayerAction;
            state = _.merge(state, {
                game: {
                    [updatePlayerEvent.player]: updatePlayerEvent.playerData
                }
            });
            return {
                ...state,
            }
        case "update_law":
            return {
                ...state,
                game: {
                    ...state.game,
                    laws: {
                        ...state.game.laws,
                        [(action as UpdateLawAction).law]: (action as UpdateLawAction).level
                    }
                }
            }
        case "play_card":
            const playCard = action as PlayCardAction;
            switch (playCard.player) {
                case "cc":
                    return {
                        ...state,
                        game: playCapitalistCard(playCard.card, state.game)
                    }

            }
            break;
        case "undo_play_card":
            const undoCard = action as UndoPlayCardAction;
            switch (undoCard.player) {
                case "cc":
                    return {
                        ...state,
                        game: undoCapitalistCard(state.game)
                    };

            }
            break;
        case "goto_phase":
            return gotoPhase(state, action as GotoPhase);
        case "updatePolitics":
            const updatePolitics = action as UpdatePoliticsAction;
            switch (updatePolitics.player) {
                case "cc":
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            lastPoliticsPhase: {
                                ...state.game.lastPoliticsPhase,
                                cc: {
                                    proposedLawsPassed: updatePolitics.proposedPassed !== undefined ? updatePolitics.proposedPassed : state.game.lastPoliticsPhase.cc.proposedLawsPassed,
                                    supportedLawsPassed: updatePolitics.supportedPassed !== undefined ? updatePolitics.supportedPassed : state.game.lastPoliticsPhase.cc.supportedLawsPassed
                                }
                            }
                        }
                    }
            }
            break;
        case "undo_phase":
            break;
    }
    return state;
}

function gotoPhase(state: AppState, action: GotoPhase): AppState {
    state.game.phase = action.to;
    switch (action.to) {
        case "actions":
            if (action.from === "scoring") {
                // Start of new turn
            } else if (action.from === "production") {
                // Undo last production phase
            }
            break;
        case "production":
            if (action.from === "actions") {
                const lastProductionPhase = calculateProduction(state.game);
                return {
                    ...state,
                    game: {
                        ...state.game,
                        cc: {
                            ...state.game.cc,
                            storage: {
                                food: {
                                    ...state.game.cc.storage.food,
                                    quantity: state.game.cc.storage.food.quantity + lastProductionPhase.capitalists.output.food
                                },
                                luxuries: {
                                    ...state.game.cc.storage.luxuries,
                                    quantity: state.game.cc.storage.luxuries.quantity + lastProductionPhase.capitalists.output.luxuries
                                },
                                health: {
                                    ...state.game.cc.storage.health,
                                    quantity: state.game.cc.storage.health.quantity + lastProductionPhase.capitalists.output.health
                                },
                                education: {
                                    ...state.game.cc.storage.education,
                                    quantity: state.game.cc.storage.education.quantity + lastProductionPhase.capitalists.output.education
                                }
                            },
                            revenue: lastProductionPhase.capitalists.endingRevenue,
                            capital: lastProductionPhase.capitalists.endingCapital
                        },
                        lastProductionPhase,
                        phase: action.to,
                    }
                }
            } else {
                if (action.from === "taxes") {
                    // Undo last tax phase
                    const lastTaxPhase = state.game.lastTaxPhase!;
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            cc: {
                                ...state.game.cc,
                                revenue: lastTaxPhase.capitalists.startingRevenue,
                                capital: lastTaxPhase.capitalists.startingCapital,
                            },
                            lastTaxPhase: {
                                capitalists: EMPTY_CAPITALIST_TAX_PHASE_RESULT,
                                middleClass: {},
                                workingClass: {},
                                state: {}
                            }
                        }
                    }
                }
                break;
            }
        case"taxes":
            if (action.from === "production") {
                const taxes = {
                    capitalists: allCapitalistTaxes(state.game),
                    middleClass: {},
                    workingClass: {},
                    state: {}
                }

                return {
                    ...state,
                    game: {
                        ...state.game,
                        cc: {
                            ...state.game.cc,
                            revenue: taxes.capitalists.endingRevenue,
                            capital: taxes.capitalists.endingCapital
                        },
                        lastTaxPhase: taxes
                    }
                }
                // Calculate tax phase
            } else if (action.from === "politics") {
                // Undo last politics phase
            }
            break;
        case "politics":
            if (action.from === "taxes") {

            } else {
                // Undo last scoring phase
                const lastScoring = state.game.lastScoringPhase!;
                return {
                    ...state,
                    game: {
                        ...state.game,
                        cc: {
                            ...state.game.cc,
                            points: state.game.cc.points - lastScoring.capitalists.pointsEarned,
                            capitalTrackPosition: lastScoring.capitalists.startingTrackMarkerPosition,
                            revenue: lastScoring.capitalists.amountMovedToCapital,
                            capital: state.game.cc.capital - lastScoring.capitalists.amountMovedToCapital,
                        },
                        lastScoringPhase: {
                            capitalists: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
                            workingClass: {},
                            middleClass: {},
                            state: {}
                        }
                    }
                }
            }
            break;
        case "scoring":
            if (action.from === "politics") {
                const lastTaxPhase = state.game.lastTaxPhase!;
                // Calculate scoring phase
                const finalCapital = state.game.lastTaxPhase.capitalists.endingCapital + state.game.lastTaxPhase.capitalists.endingRevenue;
                const newTrackPosition = findCapitalTrackPosition(finalCapital)
                const pointsEarned = newTrackPosition + (Math.max(0, newTrackPosition - state.game.cc.capitalTrackPosition) * 3)
                const scoreResult: CapitalistScoringPhaseResult = {
                    finalCapital,
                    pointsEarned,
                    amountMovedToCapital: lastTaxPhase.capitalists.endingRevenue,
                    startingTrackMarkerPosition: state.game.cc.capitalTrackPosition,
                    finalTrackMarkerPosition: Math.max(state.game.cc.capitalTrackPosition, newTrackPosition)
                }
                return {
                    ...state,
                    game: {
                        ...state.game,
                        cc: {
                            ...state.game.cc,
                            points: state.game.cc.points + pointsEarned,
                            capitalTrackPosition: Math.max(state.game.cc.capitalTrackPosition, newTrackPosition),
                            revenue: 0,
                            capital: finalCapital,
                        },
                        lastScoringPhase: {
                            capitalists: scoreResult,
                            workingClass: {},
                            middleClass: {},
                            state: {}
                        }
                    }
                }
            }
            break;

    }
    return {
        ...state,
        game: {
            ...state.game,
            phase: action.to
        }
    }
}

export interface ReducerAction {
    type: string
}

export interface PlayerAction extends ReducerAction {
    player: PlayerClass
}

export interface UpdatePlayerAction extends PlayerAction {
    type: "update_player",
    playerData: unknown
}

export interface UpdateCapitalistPlayerAction extends UpdatePlayerAction {
    type: "update_player",
    player: "cc",
    playerData: any
}

export interface UpdateWorkingClassPlayerAction extends UpdatePlayerAction {
    type: "update_player",
    player: "wc",
    playerData: any
}

export interface UpdateMiddleClassPlayerAction extends UpdatePlayerAction {
    type: "update_player",
    player: "mc",
    playerData: any
}

export interface UpdateStatePlayerAction extends ReducerAction {
    type: "update_player",
    player: "state",
    playerData: any
}

export interface UpdateLawAction extends ReducerAction {
    type: "update_law",
    law: LawId,
    level: LawLevel
}

export interface PlayCardAction extends PlayerAction {
    type: "play_card",
    card: Record<string, unknown> & { name: string }
}

export interface UndoPlayCardAction extends PlayerAction {
    type: "undo_play_card",
}

interface GotoPhase extends ReducerAction {
    type: "goto_phase",
    to: GamePhase
    from: GamePhase
}

export interface UpdatePoliticsAction extends ReducerAction {
    type: "updatePolitics",
    player: PlayerClass,
    proposedPassed?: number
    supportedPassed?: number
}

export const Actions = {
    gotoPhase: function ({to, from}: { to: GamePhase, from: GamePhase }): GotoPhase {
        return {type: "goto_phase", to, from};
    }
}

export default reducer;