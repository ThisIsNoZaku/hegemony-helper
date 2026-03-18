import type {Game} from "../../data/game.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
export default async function (state: Game) {
    return decoder.decode(await window.crypto.subtle.digest("SHA-1", encoder.encode(JSON.stringify(state))));
}