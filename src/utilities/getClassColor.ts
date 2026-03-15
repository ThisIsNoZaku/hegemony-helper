import type {PlayerClass} from "../data/players.ts";

export function getClassColor(playerClass: PlayerClass, alpha?: number) {
    switch (playerClass) {
        case "wc":
            return  `rgba(220,20,60, ${alpha ?? 1})`;
        case "mc":
            return `rgba(218,165,32, ${alpha ?? 1})`;
        case "state":
            return `rgba(128,128,128, ${alpha ?? 1})`;
        case "cc":
            return `rgba(0,0,255, ${alpha ?? 1})`;
    }
}