import type {CompanyInstance} from "../companies";
import type {Game, PlayerWithCompanies} from "../game";
import type {Player, PlayerWithStorages} from "../players";
import type {FtzGoodStorage, GoodStorage} from "../goods";
import {capitalistCompanies} from "./capitalistCompanies";

export type CapitalistGoods = Record<"food" | "luxuries", FtzGoodStorage> & Record<"health" | "education", GoodStorage>

export interface CapitalistPlayer extends Player, PlayerWithStorages, PlayerWithCompanies {
    playerClass: "cc",
    revenue: number,
    capital: number,
    capitalTrackPosition: number,
    /**
     * Goods in storage.
     */
    storage: CapitalistGoods,
}

export function playCapitalistCard(card: Record<string, unknown> & { name: string }, game: Game): Game {
    switch (card.name) {
        case "Offshore Companies":
            const amountMoved = Math.floor(game.cc.revenue / 2);
            return {
                ...game,
                cc: {
                    ...game.cc,
                    revenue: game.cc.revenue - amountMoved,
                    capital: game.cc.capital + amountMoved,
                    lastCardPlayed: {
                        ...card,
                        amountMoved
                    }
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                cc: {
                    ...game.cc,
                    capital: game.cc.capital - 50,
                    points: game.cc.points + 7,
                    lastCardPlayed: card
                }
            }
    }
    return game;
}

export function undoCapitalistCard(game: Game): Game {
    const lastCard = game.cc.lastCardPlayed;
    if (!lastCard) {
        return game;
    }
    switch (lastCard.name) {
        case "Offshore Companies":
            return {
                ...game,
                cc: {
                    ...game.cc,
                    revenue: game.cc.revenue + (lastCard as any).amountMoved,
                    capital: game.cc.capital - (lastCard as any).amountMoved,
                    lastCardPlayed: undefined
                }
            }
        case "Buy Private Island":
            return {
                ...game,
                cc: {
                    ...game.cc,
                    capital: game.cc.capital + 50,
                    points: game.cc.points - 7,
                    lastCardPlayed: undefined
                }
            }
    }
    return game;
}

export const STARTING_CAPITALIST_DATA:CapitalistPlayer = {
    playerClass: "cc",
    points: 0,
    personalInfluence: 1,
    loans: 0,
    revenue: 120,
    capital: 0,
    capitalTrackPosition: 0,
    storage: {
        food: {
            quantity: 1,
            capacity: 8,
            ftzQuantity: 0,
            ftzCapacity: 8,
        },
        education: {
            quantity: 2,
            capacity: 12,
        },
        health: {
            quantity: 0,
            capacity: 12
        },
        luxuries: {
            quantity: 2,
            capacity: 12,
            ftzQuantity: 0,
            ftzCapacity: 12
        }
    },
    companies: [
        {...capitalistCompanies.clinic, wageLevel: 1} as CompanyInstance,
        {
            ...capitalistCompanies.superMarket,
            wageLevel: 1,
            workers: "wc",
        } as CompanyInstance,
        {
            ...capitalistCompanies.shoppingMall,
            wageLevel: 1,
            workers: "mc",
        } as CompanyInstance,
        {...capitalistCompanies.college, wageLevel: 1, workers: "wc"} as CompanyInstance,
        null, null, null, null,
        null, null, null, null],
}
