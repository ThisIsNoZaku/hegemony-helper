import type {CompanyInstance} from "../data/companies.ts";

export default function calculateCompanyOutput(company: CompanyInstance) {
    if (!company.fullyAutomated && !company.workers) {
        return 0;
    }
    return company.output.base
        // @ts-ignore
        + (company.automatedBonus ? company.output.automationBonus : 0)
        // @ts-ignore
        + (company.hasBonusWorker ? company.output.wcWorkerBonus : 0)
}