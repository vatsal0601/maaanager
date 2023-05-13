import * as SQLite from "expo-sqlite";

export const INCOME = "INCOME";
export const EXPENSE = "EXPENSE";
export const FUND = "FUND";
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
        "CREATE TABLE if NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER, tagId INTEGER, fundId INTEGER, title TEXT NOT NULL, type TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, FOREIGN KEY(accountId) REFERENCES accounts(id), FOREIGN KEY(tagId) REFERENCES tags(id), FOREIGN KEY(fundId) REFERENCES funds(id));",
    },
  ];

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      sqlStatements.forEach(({ name, query }, index) => {
        tx.executeSql(
          query,
          [],
          (_, result) => {
            console.log(`[Q] Table ${name} created successfully`);
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

export const dropTables = () => {
  const sqlStatements = [
    {
      name: "transactions",
      query: "DROP TABLE IF EXISTS transactions;",
    },
    {
      name: "accounts",
      query: "DROP TABLE IF EXISTS accounts;",
    },
    {
      name: "funds",
      query: "DROP TABLE IF EXISTS funds;",
    },
    {
      name: "tags",
      query: "DROP TABLE IF EXISTS tags;",
    },
  ];

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      sqlStatements.forEach(({ name, query }, index) => {
        tx.executeSql(
          query,
          [],
          (_, result) => {
            console.log(`[Q] Table ${name} dropped successfully`);
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

export const homeScreenData = () => {
  const sqlStatements = [
    {
      name: "totalAmount",
      query: "SELECT SUM(balance) as totalAmount FROM accounts;",
    },
    {
      name: "totalFundsAmount",
      query:
        "SELECT SUM(currentAmount) as totalFundsAmount FROM funds WHERE targetAmount IS NOT NULL;",
    },
    {
      name: "currentMonthExpenses",
      query: `SELECT SUM(amount) as currentMonthExpenses FROM transactions WHERE date BETWEEN DATE('now','start of month') AND DATE('now','start of month','+1 month','-1 day') AND type = '${EXPENSE}';`,
    },
    {
      name: "completedFunds",
      query:
        "SELECT count(name) as completedFunds FROM funds WHERE currentamount >= targetamount;",
    },
  ];

  const results = [];

  return new Promise<number[]>((resolve, reject) => {
    db.transaction(tx => {
      sqlStatements.forEach(({ name, query }, index) => {
        tx.executeSql(
          query,
          [],
          (_, result) => {
            const { rows } = result;
            const { [name]: value } = rows.item(0);
            console.log(`[Q] ${name}: `, value ?? 0);
            results.push(value ?? 0);
            if (index === sqlStatements.length - 1) resolve(results);
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
