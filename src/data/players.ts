import type {GoodsName, GoodStorage, StoredGoods} from "./goods.ts";

/**
 * All players.
 */
export type PlayerClass = "cc" | "wc" | "mc" | "state";
/**
 * All players which own companies and hire people.
 */
export type EmployerPlayerClass = "cc" | "mc" | "state";
/**
 * All players with workers that receive wages.
 */
export type EmployeePlayerClass = "wc" | "mc";

export interface Player {
    playerClass: PlayerClass,
    personalInfluence: number,
    points: number,
    loans: number,
    lastCardPlayed?: Record<string, unknown> & { name: string }
}

export interface PlayerWithStorages {
    playerClass: PlayerClass,
    storage: Record<StoredGoods, GoodStorage>
}