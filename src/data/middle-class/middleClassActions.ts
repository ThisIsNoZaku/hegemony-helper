import type {UpdateMiddleClassPlayerAction} from "../../state/Reducers.ts";
import type {CompanyInstance} from "../companies.ts";
import type {GoodStorage} from "../goods.ts";
import type {MiddleClassPlayer} from "./middleClass.ts";

export const Actions = {
    update: {
        population: function (mc: MiddleClassPlayer, population: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, population}}
        },
        income: function (mc: MiddleClassPlayer, income: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, income}}
        },
        companies: function (mc: MiddleClassPlayer, companies: (CompanyInstance | null)[]): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {...mc, companies}}
        },
        storage: {
            food: function (mc: MiddleClassPlayer, food: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, storage: {...mc.storage, food}}}
            },
            luxuries: function (mc: MiddleClassPlayer, luxuries: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, storage: {...mc.storage, luxuries}}}
            },
            health: function (mc: MiddleClassPlayer, health: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, storage: {...mc.storage, health}}}
            },
            education: function (mc: MiddleClassPlayer, education: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, storage: {...mc.storage, education}}}
            }
        },
        goods: {
            food: function (mc: MiddleClassPlayer, food: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, food}}}
            },
            luxuries: function (mc: MiddleClassPlayer, luxuries: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, luxuries}}}
            },
            health: function (mc: MiddleClassPlayer, health: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, health}}}
            },
            education: function (mc: MiddleClassPlayer, education: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, education}}}
            },
            influence: function (mc: MiddleClassPlayer, influence: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {...mc, goods: {...mc.goods, influence}}}
            }
        }
    }
}