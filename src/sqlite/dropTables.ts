import * as SQLite from "expo-sqlite";

class DropTables {
    private dataBase: SQLite.WebSQLDatabase;

    constructor() {
        this.dataBase = SQLite.openDatabase("DontForgetIt");
    }

    dropAllTables() {
        this.dataBase.transaction((tx) => {
            tx.executeSql(`DROP TABLE IF EXISTS MyList;`);
            tx.executeSql(`DROP TABLE IF EXISTS Items;`);
        });
    }
}

export default DropTables