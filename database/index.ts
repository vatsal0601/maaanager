import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("maaanager.db");

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

export const createTables = () => {
  const sqlStatements = [
    "CREATE TABLE if NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL NOT NULL);",
    "CREATE TABLE if NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);",
    "CREATE TABLE if NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER NOT NULL, tagId INTEGER NOT NULL, type TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, FOREIGN KEY(accountId) REFERENCES accounts(id), FOREIGN KEY(tagId) REFERENCES tags(id));",
  ];

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      sqlStatements.forEach((sql, index) => {
        tx.executeSql(
          sql,
          [],
          (_, result) => {
            console.log("Table created successfully", result);
            if (index === sqlStatements.length - 1) resolve();
          },
          err => {
            console.log(err);
            reject();
            return null;
          }
        );
      });
    });
  });
};
