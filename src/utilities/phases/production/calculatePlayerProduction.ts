import type {PlayerWithCompanies} from "../../../data/game.ts";
import type {CompanyInstance} from "../../../data/companies.ts";
import type {GoodsName} from "../../../data/goods.ts";
import calculateCompanyOutput from "../../calculateCompanyOutput.ts";

export function calculatePlayerProduction(player:PlayerWithCompanies) {
    return player.companies.filter(c => c && c.workers)
        .map(c => c as CompanyInstance)
        .reduce((outputs, company:CompanyInstance) => {
            outputs[company?.type] += calculateCompanyOutput(company);
            return outputs;
        }, {
            food: 0,
            luxuries: 0,
            health: 0,
            education: 0,
            influence: 0
        } as Record<GoodsName, number>)
}