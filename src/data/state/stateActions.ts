import type {CompanyInstance} from "../companies.ts";
import type {UpdateStatePlayerAction} from "../../state/Reducers.ts";

export const Actions = {
    update: {
        treasury: function (treasury: number): UpdateStatePlayerAction {
            return {type: "update_player", player: "state", playerData: {treasury}}
        },
        companies: function (companies: (CompanyInstance | null)[]): UpdateStatePlayerAction {
            return {
                type: "update_player",
                player: "state",
                playerData: {companies: companies as CompanyInstance[]}
            }
        },
        publicServices: {
            health: function (health: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {publicServices: {health: {quantity: health}}}
                }
            },
            education: function (education: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {publicServices: {education: {quantity: education}}}
                }
            },
            influence: function (influence: number): UpdateStatePlayerAction {
                return {
                    type: "update_player",
                    player: "state",
                    playerData: {publicServices: {influence: {quantity: influence}}}
                }
            }
        }
    }
}
