import type {PlayerClass} from "../data/players.ts";

export function getClassColor(playerClass: PlayerClass) {
    switch (playerClass) {
        case "wc":
            return "crimson";
        case "mc":
            return "goldenrod";
        case "state":
            return "gray";
        case "cc":
            return "blue";
    }
}