import { EXPENSE, FUND, INCOME, db } from "./index";

export interface BaseTransaction {
  id: number;
  title: string;
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

interface TransactionWithTagsAndFunds extends BaseTransaction {
  type: typeof INCOME | typeof EXPENSE | typeof FUND;
  tagName?: string;
  fundName?: string;
}

export const getTransactionWithTagsAndFunds = ({
  limit,
}: {
  limit?: number;
}) => {
  const query = `SELECT transactions.id as id, transactions.title AS title, transactions.amount AS amount, transactions.type AS type, transactions.date AS date, tags.name AS tagName, funds.name AS fundName FROM transactions LEFT JOIN tags on transactions.tagid = tags.id LEFT JOIN funds on transactions.fundId = funds.id ORDER BY date DESC ${
    limit ? "LIMIT 5" : ""
  };`;

  return new Promise<TransactionWithTagsAndFunds[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          console.log(
            `[Q] Get transactions with tags and funds: ${rows.length} rows`
          );
          resolve(rows._array);
        },
        (_, err) => {
          reject(err);
          return null;
        }
      );
    });
  });
};
