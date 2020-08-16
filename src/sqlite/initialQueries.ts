import * as SQLite from "expo-sqlite";

class InitialQueries {
    private dataBase: SQLite.WebSQLDatabase;

    constructor() {
        this.dataBase = SQLite.openDatabase("DontForgetIt");
    }

    createInitialTables() {
        this.dataBase.transaction((tx) => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS MyList (
                    title TEXT NOT NULL,
                    image TEXT NOT NULL,
                    type  INTEGER NOT NULL,
                    text TEXT
                )
            `);

            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Items (
                    id TEXT PRIMARY KEY,
                    title TEXT DEFAULT '',
                    image TEXT DEFAULT '',
                    type  INTEGER NOT NULL DEFAULT 1,
                    notes TEXT DEFAULT ''
                ) WITHOUT ROWID
            `)
        });
    }
}

export default InitialQueries