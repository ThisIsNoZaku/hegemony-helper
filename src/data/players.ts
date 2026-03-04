import type {PlayerClass} from "./game.ts";
import type {GoodsName, GoodStorage} from "./goods.ts";

export interface Player {
    playerClass: PlayerClass,
    points: number,
    loans: number,
    lastCardPlayed?: Record<string, unknown> & { name: string }
}

export interface PlayerWithStorages {
    playerClass: PlayerClass,
    storages: Record<GoodsName, GoodStorage>
}