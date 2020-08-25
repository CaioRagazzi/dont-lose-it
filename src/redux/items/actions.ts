import { GET_ALL } from "./actionTypes";

export function addImage(uri: string) {
    return {
        type: GET_ALL,
        payload: { image: uri },
    }
}