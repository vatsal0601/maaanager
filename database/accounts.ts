import { db } from "./index";

export interface Account {
  id: number;
  name: string;
  balance: number;
}

export const createAccountTable = () => {
  const sql =
    "CREATE TABLE if NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL NOT NULL);";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (_, result) => console.log("Account table created successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};

export const addAccount = ({ name }: Pick<Account, "name">) => {
  const sql = "INSERT INTO accounts (name, balance) VALUES (?, ?);";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [name, 0],
      (_, result) => console.log("Account added successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};
