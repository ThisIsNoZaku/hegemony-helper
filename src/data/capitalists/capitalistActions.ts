import type {UpdateCapitalistPlayerAction} from "../../state/Reducers.ts";
import type {CompanyInstance} from "../companies.ts";
import type {FtzGoodStorage, GoodStorage} from "../goods.ts";

export const Actions = {
    update: {
        revenue: function (revenue: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {revenue}}
        },
        capital: function (capital: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {capital}}
        },
        capitalTrackPosition: function (capitalTrackPosition: number): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {capitalTrackPosition}}
        },
        companies: function (companies: (CompanyInstance | null)[]): UpdateCapitalistPlayerAction {
            return {type: "update_player", player: "cc", playerData: {companies}}
        },
        storage: {
            food: function (food: FtzGoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {storage: {food}}}
            },
            luxuries: function (luxuries: FtzGoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {storage: {luxuries}}}
            },
            health: function (health: GoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {storage: {health}}}
            },
            education: function (education: GoodStorage): UpdateCapitalistPlayerAction {
                return {type: "update_player", player: "cc", playerData: {storage: {education}}}
            }
        }
    }
}