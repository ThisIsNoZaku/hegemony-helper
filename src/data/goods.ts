export type GoodsName = "food" | "health" | "education" | "luxuries" | "influence";
export type GoodStorage = BasicStorage | FtzGoodStorage;

/**
 * Storage for goods.
 */
export interface BasicStorage {
    quantity: number,
    capacity: number,
    storageBought?: boolean
    ftzQuantity?: number
    ftzCapacity?: number
}

/**
 * Storage for goods from capitalist, middle class and state companies.
 */
export interface FtzGoodStorage extends BasicStorage {
    ftzQuantity: number
    ftzCapacity: number
}