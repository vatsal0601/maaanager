import { db } from "./index";

export interface Account {
  id: number;
  name: string;
  balance: number;
}

export const addAccount = ({ name }: Pick<Account, "name">) => {
  const sql = "INSERT INTO accounts (name, balance) VALUES (?, ?);";

  return new Promise<Account>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [name, 0],
        (_, result) => {
          console.log("Account added successfully", result);
          resolve({ id: result.insertId, name, balance: 0 });
        },
        err => {
          console.log(err);
          reject();
          return null;
        }
      );
    });
  });
};

export const doAccountExists = () => {
  const sql = "SELECT COUNT(name) as totalAccounts FROM accounts;";

  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const count = (result.rows._array[0]["totalAccounts"] as number) ?? 0;
          resolve(count > 0);
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

export const getTotalAmount = () => {
  const sql = "SELECT SUM(balance) as totalAmount FROM accounts;";

  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const total = (result.rows._array[0]["totalAmount"] as number) ?? 0;
          resolve(total);
        },
        err => {
          console.log(err);
          reject(0);
          return null;
        }
      );
    });
  });
};
