
export interface ItemsInterface {
    items: ItemsInterface[]
}

const initialState: ItemsInterface = {
    items: []
}

export function reducer(state: ItemsInterface = initialState, action: any) {
    switch (action.type) {
        
        default:
            break;
    }
    return state;
}