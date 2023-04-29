import { db } from "./index";

export interface Transaction {
  id: number;
  accountId: number;
  tagId: number;
  type: string;
  amount: number;
  date: string;
}

export const createTransactionTable = () => {
  const sql =
    "CREATE TABLE if NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER NOT NULL, tagId INTEGER NOT NULL, type TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, FOREIGN KEY(accountId) REFERENCES accounts(id), FOREIGN KEY(tagId) REFERENCES tags(id));";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (_, result) =>
        console.log("Transaction table created successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};

export const addTransaction = ({
  accountId,
  tagId,
  type,
  amount,
}: Omit<Transaction, "id" | "date">) => {
  const sql =
    "INSERT INTO transactions (accountId, tagId, type, amount, date) VALUES (?, ?, ?, ?, ?);";

  const date = new Date(Date.now()).toISOString();

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [accountId, tagId, type, amount, date],
      (_, result) => console.log("Transaction added successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};
