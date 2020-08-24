import * as SQLite from "expo-sqlite";

class ItemQueries {
    private dataBase: SQLite.WebSQLDatabase;

    constructor() {
        this.dataBase = SQLite.openDatabase("DontForgetIt");
    }

    insertItem(title: string, image: string, hourRemind: string, dateRemind: string, type: number, notes: string, latLng: string) {
        this.dataBase.transaction((tx) => {
            tx.executeSql(`
                INSERT INTO Items (title, image, hourRemind, dateRemind, type, notes, latLng) 
                VALUES (?,?,?,?,?,?)
            `, [title, image, hourRemind, dateRemind, type, notes, latLng], (resSucc) => {
                console.log('resSucc', resSucc);
            }, (err) => {
                console.log('err', err);
            })
        });
    }
}

export default ItemQueries