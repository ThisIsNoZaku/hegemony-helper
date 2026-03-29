import type {AppState} from "../../state/Reducers.ts";
import {gameWebSocket} from "./websocket.ts";
import stateDigest from "../state/stateDigest.ts";
import _ from "lodash";

export default function dispatchEventToRemote(state: AppState) {
    latestState = state;

    // Start or reset the batch timer
    if (batchTimeout === null) {
        batchTimeout = setTimeout(flushPendingActions, 1000);
    }
}

let batchTimeout: ReturnType<typeof setTimeout> | null = null;
let latestState: AppState | null = null;

async function flushPendingActions() {
    if (!latestState) {
        return;
    }

    gameWebSocket.sendMessage({
        stateDigest: await stateDigest(latestState.game),
        payload: {
            type: "reset",
            data: latestState.game
        }
    });
    batchTimeout = null;
    latestState = null;
}