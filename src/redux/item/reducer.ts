import { ADD_IMAGE, CHANGE_TITLE, CHANGE_NOTES, REMOVE_IMAGE, CHANGE_DATEREMIND, CHANGE_HOURREMIND, CHANGE_LATLNG } from "./actionTypes";

export interface ItemInterface {
    image: string
    showImage: boolean
    title: string
    notes: string
    dateRemind: string
    hourRemind: string
    latLng: string
    type: number
}

const initialState: ItemInterface = {
    image: "",
    showImage: false,
    title: "",
    notes: "",
    dateRemind: "",
    hourRemind: "",
    latLng: "",
    type: 1,
}

export function reducer(state: ItemInterface = initialState, action: any) {
    switch (action.type) {
        case ADD_IMAGE:
            return {
                ...state,
                image: action.payload.image,
                showImage: true
            }
        case REMOVE_IMAGE:
            return {
                ...state,
                showImage: false
            }
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload.title
            }
        case CHANGE_NOTES:
            return {
                ...state,
                notes: action.payload.notes
            }
        case CHANGE_DATEREMIND:
            return {
                ...state,
                dateRemind: action.payload.dateRemind
            }
        case CHANGE_HOURREMIND:
            return {
                ...state,
                hourRemind: action.payload.hourRemind
            }
        case CHANGE_LATLNG:
            return {
                ...state,
                latLng: action.payload.latLng
            }
        default:
            break;
    }
    return state;
}