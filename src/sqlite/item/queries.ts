import * as SQLite from "expo-sqlite";
import { useDispatch } from "react-redux";
import { getAll } from "../../redux/items/actions";
import { ItemsInterface } from "../../redux/items/reducer";

class ItemQueries {

    constructor() {
        
    }

    insertItem(title: string, image: string, hourRemind: string, dateRemind: string, type: number, notes: string, latLng: string) {
    }

    selectAllItems() {
        
    }
}

export default ItemQueries