import type {UpdateCapitalistPlayerAction} from "../../state/Reducers.ts";
import type {CompanyInstance} from "../companies.ts";
import type {FtzGoodStorage, GoodStorage} from "../goods.ts";
import type {CapitalistPlayer} from "./capitalists.ts";

export const Actions = {
    update: {
        revenue: function (cc: CapitalistPlayer, revenue: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, revenue}}
        },
        capital: function (cc: CapitalistPlayer, capital: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, capital}}
        },
        capitalTrackPosition: function (cc: CapitalistPlayer, capitalTrackPosition: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, capitalTrackPosition}}
        },
        companies: function (cc: CapitalistPlayer, companies: (CompanyInstance | null)[]): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {...cc, companies}}
        },
        storage: {
            food: function (cc: CapitalistPlayer, food: FtzGoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, storage: {...cc.storage, food}}}
            },
            luxuries: function (cc: CapitalistPlayer, luxuries: FtzGoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, storage: {...cc.storage, luxuries}}}
            },
            health: function (cc: CapitalistPlayer, health: GoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, storage: {...cc.storage, health}}}
            },
            education: function (cc: CapitalistPlayer, education: GoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {...cc, storage: {...cc.storage, education}}}
            }
        }
    }
}