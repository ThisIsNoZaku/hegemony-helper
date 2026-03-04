import {type Game} from "../data/game";
import calculateTaxMultiplier from "./calculateTaxMultiplier.ts";
export function calculateCapitalTax(revenue: number, taxLevel: number): number {
    if (revenue < 5) {
        return 0;
    }
    switch (taxLevel) {
        case 0:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 4;
            } else if (revenue < 50) {
                return 7;
            } else if (revenue < 100) {
                return 10;
            } else if (revenue < 200) {
                return 20;
            } else if (revenue < 300) {
                return 40;
            } else {
                return 60;
            }
        case 1:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 10;
            } else if (revenue < 100) {
                return 15;
            } else if (revenue < 200) {
                return 30;
            } else if (revenue < 300) {
                return 70;
            } else {
                return 120;
            }
        case 2:
            if (revenue < 10) {
                return 1;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 12;
            } else if (revenue < 100) {
                return 24;
            } else if (revenue < 200) {
                return 40;
            } else if (revenue < 300) {
                return 100;
            } else {
                return 160;
            }
    }
    throw new Error();
}

export function allCapitalistTaxes(game: Game) {
    const employmentTax = game.cc.companies.filter(c => c !== null && c.workers).length * calculateTaxMultiplier(game.laws.tax, game.laws.health, game.laws.education);
    const capitalTax = calculateCapitalTax(game.lastProductionPhase.capitalists.endingRevenue - employmentTax, game.laws.tax);
    return {
        employmentTax,
        capitalTax,
        total: employmentTax + capitalTax,
        startingRevenue: game.lastProductionPhase.capitalists.endingRevenue,
        startingCapital: game.lastProductionPhase.capitalists.endingCapital,
        endingRevenue: Math.max(0, game.lastProductionPhase.capitalists.endingRevenue - employmentTax - capitalTax),
        endingCapital: game.lastProductionPhase.capitalists.endingCapital - Math.max(0, (employmentTax + capitalTax) - game.lastProductionPhase.capitalists.endingRevenue)
    }
}