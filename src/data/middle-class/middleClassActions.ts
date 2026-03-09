import type { UpdateMiddleClassPlayerAction } from "../../state/Reducers.ts";
import type {CompanyInstance} from "../companies.ts";
import type {GoodStorage} from "../goods.ts";

export const Actions = {
    update: {
        population: function (population: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {population}}
        },
        income: function (income: number): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {income}}
        },
        companies: function (companies: (CompanyInstance | null)[]): UpdateMiddleClassPlayerAction {
            return {type: "update_player", player: "mc", playerData: {companies}}
        },
        storage: {
            food: function (food: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {storage: {food}}}
            },
            luxuries: function (luxuries: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {storage: {luxuries}}}
            },
            health: function (health: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {storage: {health}}}
            },
            education: function (education: GoodStorage): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {storage: {education}}}
            }
        },
        goods: {
            food: function (food: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {goods: {food}}}
            },
            luxuries: function (luxuries: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {goods: {luxuries}}}
            },
            health: function (health: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {goods: {health}}}
            },
            education: function (education: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {goods: {education}}}
            },
            influence: function (influence: number): UpdateMiddleClassPlayerAction {
                return {type: "update_player", player: "mc", playerData: {goods: {influence}}}
            }
        }
    }
}
