import { createStore, combineReducers } from "redux";
import { ItemReducer } from "./item/reducer";
import { ItemsReducer } from "./items/reducer";

const rootReducer = combineReducers({
    item: ItemReducer,
    items: ItemsReducer
})
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;