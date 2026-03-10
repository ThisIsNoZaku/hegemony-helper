import type {CompanyInstance} from "../../../data/companies.ts";

export default function calculateCompanyOutput(company: CompanyInstance) {
    return company.output.base + (company.automatedBonus ? company.output.automationBonus : 0);
}