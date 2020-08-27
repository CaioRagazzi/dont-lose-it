import { GET_ALL } from "./actionTypes";
import { ItemInterface } from "../item/reducer";

export interface ItemsInterface {
    items: ItemInterface[]
}

const initialState: ItemsInterface = {
    items: []
}
    
export function ItemsReducer(state: ItemsInterface = initialState, action: any) {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                items: action.payload.items,
            }
        default:
            break;
    }
    return state;
}