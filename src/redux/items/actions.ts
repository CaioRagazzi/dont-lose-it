import { GET_ALL } from "./actionTypes";
import { ItemsInterface } from "./reducer";

export function getAll(items: ItemsInterface) {
    return {
        type: GET_ALL,
        payload: { items: items },
    }
}