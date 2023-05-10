import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("maaanager.db");

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

export const createTables = () => {
  const sqlStatements = [
    {
      name: "accounts",
      query:
        "CREATE TABLE if NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL NOT NULL);",
    },
    {
      name: "funds",
      query:
        "CREATE TABLE if NOT EXISTS funds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, currentAmount REAL NOT NULL, targetAmount REAL, targetDate TEXT);",
    },
    {
      name: "tags",
      query:
        "CREATE TABLE if NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);",
    },
    {
      name: "transactions",
      query:
        "CREATE TABLE if NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER, tagId INTEGER, fundId INTEGER, type TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, FOREIGN KEY(accountId) REFERENCES accounts(id), FOREIGN KEY(tagId) REFERENCES tags(id), FOREIGN KEY(fundId) REFERENCES funds(id));",
    },
  ];

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      sqlStatements.forEach(({ name, query }, index) => {
        tx.executeSql(
          query,
          [],
          (_, result) => {
            console.log(`Table ${name} created successfully`, result);
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
