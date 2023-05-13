import { db } from "./index";

export interface Fund {
  id: number;
  name: string;
  currentAmount: number;
  targetAmount?: number;
  targetDate?: string;
}

export const addFund = ({
  name,
  currentAmount,
  targetAmount,
  targetDate,
}: Omit<Fund, "id">) => {
  const sql =
    "INSERT INTO funds (name, currentAmount, targetAmount, targetDate) VALUES (?, ?, ?, ?);";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [name, currentAmount, targetAmount, targetDate],
      (_, result) => console.log("Fund added successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};

export const getTotalFundAmount = () => {
  const sql =
    "SELECT SUM(currentAmount) as totalAmount FROM funds WHERE targetAmount IS NOT NULL;";

  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const { rows } = result;
          const { totalAmount } = rows.item(0);
          resolve(totalAmount ?? 0);
        },
        err => {
          console.log(err);
          reject(false);
          return null;
        }
      );
    });
  });
};
