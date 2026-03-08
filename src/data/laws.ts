/**
 * All levels laws can be at.
 * 0 = C
 * 1 = B
 * 2 = A
 */
export type LawLevel = 0 | 1 | 2

export type PrimaryLawId = "fiscal" | "labor" | "tax" | "health" | "education";
/**
 * Names for all laws:
 */
export type LawId = PrimaryLawId | "foreignTrade" | "immigration";