export type GoodsName = StoredGoods | "influence";
export type StoredGoods =  "food" | "health" | "education" | "luxuries";
export type GoodStorage = BasicStorage | FtzGoodStorage;
export type PublicService = "health" | "education" | "influence";
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