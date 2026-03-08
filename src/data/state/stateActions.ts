import type {UpdateStatePlayerAction} from "../../state/Reducers.ts";
import type {CompanyInstance} from "../companies.ts";
import type {StatePlayer} from "./state.ts";

export const Actions = {
    update: {
        treasury: function (state: StatePlayer, treasury: number): UpdateStatePlayerAction {
            return {type: "update_player", player: "state", playerData: {...state, treasury}}
        },
        companies: function (state: StatePlayer, companies: (CompanyInstance | null)[]): UpdateStatePlayerAction {
            return {
                type: "update_player",
                player: "state",
                playerData: {...state, companies: companies as CompanyInstance[]}
            }
        },
        publicServices: {
            health: function (state: StatePlayer, health: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {...state, publicServices: {...state.publicServices, health}}
                }
            },
            education: function (state: StatePlayer, education: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {...state, publicServices: {...state.publicServices, education}}
                }
            },
            influence: function (state: StatePlayer, influence: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {...state, publicServices: {...state.publicServices, influence}}
                }
            }
        }
    }
}