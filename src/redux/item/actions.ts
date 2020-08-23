import { ADD_IMAGE, CHANGE_TITLE, CHANGE_NOTES, REMOVE_IMAGE, CHANGE_DATEREMIND, CHANGE_HOURREMIND, CHANGE_LATLNG } from "./actionTypes";

export function addImage(uri: string) {
    return {
        type: ADD_IMAGE,
        payload: { image: uri },
    }
}

export function removeImage() {
    return {
        type: REMOVE_IMAGE,
    }
}

export function changeTitle(title: string) {
    return {
        type: CHANGE_TITLE,
        payload: { title: title },
    }
}

export function changeNotes(notes: string) {
    return {
        type: CHANGE_NOTES,
        payload: { notes: notes },
    }
}

export function changeDateRemind(dateRemind: string) {
    return {
        type: CHANGE_DATEREMIND,
        payload: { dateRemind: dateRemind },
    }
}

export function changeHourRemind(hourRemind: string) {
    return {
        type: CHANGE_HOURREMIND,
        payload: { hourRemind: hourRemind },
    }
}

export function changeLatLng(latLng: string) {
    return {
        type: CHANGE_LATLNG,
        payload: { latLng: latLng },
    }
}