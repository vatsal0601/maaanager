import { db } from "./index";

export const INCOME = "INCOME";
export const EXPENSE = "EXPENSE";
export const FUND = "FUND";

export interface BaseTransaction {
  id: number;
  amount: number;
  date: string;
}

export interface Transaction extends BaseTransaction {
  accountId: number;
  tagId: number;
  type: typeof INCOME | typeof EXPENSE;
}

export interface FundTransaction extends BaseTransaction {
  fundId: number;
  type: typeof FUND;
}

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

export const addFundTransaction = ({
  fundId,
  type,
  amount,
}: Omit<FundTransaction, "id" | "date">) => {
  const sql =
    "INSERT INTO transactions (fundId, type, amount, date) VALUES (?, ?, ?, ?);";

  const date = new Date(Date.now()).toISOString();

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [fundId, type, amount, date],
      (_, result) => console.log("Fund transaction added successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};
