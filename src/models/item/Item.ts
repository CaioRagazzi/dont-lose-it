import * as SQLite from "expo-sqlite";

export default class Item {
    private dataBase: SQLite.WebSQLDatabase;

    constructor(private title: string, private image: string, private notes: string) {
        this.dataBase = SQLite.openDatabase("DontForgetIt");
    }

    insertItem(): string {
        const id = new Date().getTime().toString();
        this.dataBase.transaction((tx) => {
            tx.executeSql(`
                INSERT INTO Items (id,title,image,notes)
                VALUES(?, ?, ?, ?)
            `)
        })
        return id;
    }
}