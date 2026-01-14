import type {Game, GamePhase, LawId, LawLevel, PlayerClass} from "../data/game.ts";
import {
    type CapitalistPlayer,
    type CapitalistScoringPhaseResult, EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
    EMPTY_CAPITALIST_TAX_PHASE_RESULT
} from "../data/capitalists.ts";
import calculateProduction from "../utilities/calculateProduction.ts";
import {allCapitalistTaxes} from "../utilities/calculateTaxes.ts";
import findCapitalTrackPosition from "../utilities/findCapitalTrackPosition.ts";

function reducer(game: Game, action: ReducerAction): Game {
    switch (action.type) {
        case "update_player":
            const updatePlayerEvent = action as UpdatePlayerAction;
            switch (updatePlayerEvent.player) {
                case "cc":
                    return {
                        ...game,
                        capitalists: updatePlayerEvent.playerData as CapitalistPlayer
                    }
            }
            break;
        case "update_law":
            return {
                ...game,
                laws: {
                    ...game.laws,
                    [(action as UpdateLawAction).law]: (action as UpdateLawAction).level
                }
            }
        case "play_card":
            const playCard = action as PlayCardAction;
            switch (playCard.player) {
                case "cc":
                    return playCapitalistCard(playCard.card, game);
            }
            break;
        case "undo_play_card":
            const undoCard = action as UndoPlayCardAction;
            switch (undoCard.player) {
                case "cc":
                    return undoCapitalistCard(game);

            }
            break;
        case "goto_phase":
            return gotoPhase(game, action as GotoPhase);
        case "updatePolitics":
            const updatePolitics = action as UpdatePoliticsAction;
            switch (updatePolitics.player) {
                case "cc":
                    return {
                        ...game,
                        lastPoliticsPhase: {
                            ...game.lastPoliticsPhase,
                            cc: {
                                proposedLawsPassed: updatePolitics.proposedPassed !== undefined ? updatePolitics.proposedPassed : game.lastPoliticsPhase.cc.proposedLawsPassed,
                                supportedLawsPassed: updatePolitics.supportedPassed !== undefined ? updatePolitics.supportedPassed : game.lastPoliticsPhase.cc.supportedLawsPassed
                            }
                        }
                    }
            }
            break;
        case "undo_phase":

    }
    return game;
}

function gotoPhase(game: Game, action: GotoPhase): Game {
    game.phase = action.to;
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
                const lastProductionPhase = calculateProduction(game);
                return {
                    ...game,
                    capitalists: {
                        ...game.capitalists,
                        goods: {
                            food: {
                                ...game.capitalists.goods.food,
                                quantity: game.capitalists.goods.food.quantity + lastProductionPhase.capitalists.output.food
                            },
                            luxuries: {
                                ...game.capitalists.goods.luxuries,
                                quantity: game.capitalists.goods.luxuries.quantity + lastProductionPhase.capitalists.output.luxuries
                            },
                            health: {
                                ...game.capitalists.goods.health,
                                quantity: game.capitalists.goods.health.quantity + lastProductionPhase.capitalists.output.health
                            },
                            education: {
                                ...game.capitalists.goods.education,
                                quantity: game.capitalists.goods.education.quantity + lastProductionPhase.capitalists.output.education
                            },
                        },
                        revenue: lastProductionPhase.capitalists.endingRevenue,
                        capital: lastProductionPhase.capitalists.endingCapital
                    },
                    lastProductionPhase,
                    phase: action.to,
                }
            } else if (action.from === "taxes") {
                // Undo last tax phase
                const lastTaxPhase = game.lastTaxPhase!;
                return {
                    ...game,
                    capitalists: {
                        ...game.capitalists,
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
            break;
        case "taxes":
            if (action.from === "production") {
                const taxes = {
                    capitalists: allCapitalistTaxes(game),
                    middleClass: {},
                    workingClass: {},
                    state: {}
                }

                return {
                    ...game,
                    capitalists: {
                        ...game.capitalists,
                        revenue: taxes.capitalists.endingRevenue,
                        capital: taxes.capitalists.endingCapital
                    },
                    lastTaxPhase: taxes
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
                const lastScoring = game.lastScoringPhase!;
                return {
                    ...game,
                    capitalists: {
                        ...game.capitalists,
                        points: game.capitalists.points - lastScoring.capitalists.pointsEarned,
                        capitalTrackPosition: lastScoring.capitalists.startingTrackMarkerPosition,
                        revenue: lastScoring.capitalists.amountMovedToCapital,
                        capital: game.capitalists.capital - lastScoring.capitalists.amountMovedToCapital,
                    },
                    lastScoringPhase: {
                        capitalists: EMPTY_CAPITALIST_SCORING_PHASE_RESULT,
                        workingClass: {},
                        middleClass: {},
                        state: {}
                    }
                }

            }
            break;
        case "scoring":
            if (action.from === "politics") {
                const lastTaxPhase = game.lastTaxPhase!;
                // Calculate scoring phase
                const finalCapital = game.lastTaxPhase.capitalists.endingCapital + game.lastTaxPhase.capitalists.endingRevenue;
                const newTrackPosition = findCapitalTrackPosition(finalCapital)
                const pointsEarned = newTrackPosition + (Math.max(0, newTrackPosition - game.capitalists.capitalTrackPosition) * 3)
                const scoreResult: CapitalistScoringPhaseResult = {
                    finalCapital,
                    pointsEarned,
                    amountMovedToCapital: lastTaxPhase.capitalists.endingRevenue,
                    startingTrackMarkerPosition: game.capitalists.capitalTrackPosition,
                    finalTrackMarkerPosition: Math.max(game.capitalists.capitalTrackPosition, newTrackPosition)
                }
                return {
                    ...game,
                    capitalists: {
                        ...game.capitalists,
                        points: game.capitalists.points + pointsEarned,
                        capitalTrackPosition: Math.max(game.capitalists.capitalTrackPosition, newTrackPosition),
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
            break;

    }
    return {
        ...game,
        phase: action.to
    }
}

function playCapitalistCard(card: Record<string, unknown> & { name: string }, game: Game): Game {
    switch (card.name) {
        case "Offshore Companies":
            const amountMoved = Math.floor(game.capitalists.revenue / 2);
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    revenue: game.capitalists.revenue - amountMoved,
                    capital: game.capitalists.capital + amountMoved,
                    lastCardPlayed: {
                        ...card,
                        amountMoved
                    }
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    capital: game.capitalists.capital - 50,
                    points: game.capitalists.points + 7,
                    lastCardPlayed: card
                }
            }
    }
    return game;
}

function undoCapitalistCard(game: Game): Game {
    const lastCard = game.capitalists.lastCardPlayed;
    if (!lastCard) {
        return game;
    }
    switch (lastCard.name) {
        case "Offshore Companies":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    revenue: game.capitalists.revenue + (lastCard as any).amountMoved,
                    capital: game.capitalists.capital - (lastCard as any).amountMoved,
                    lastCardPlayed: undefined
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                capitalists: {
                    ...game.capitalists,
                    capital: game.capitalists.capital + 50,
                    points: game.capitalists.points - 7,
                    lastCardPlayed: undefined
                }
            }
    }
    return game;
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
    playerData: CapitalistPlayer
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