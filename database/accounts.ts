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
  const sql = "SELECT COUNT(name) FROM accounts;";

  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const count = (result.rows._array[0]["COUNT(name)"] as number) ?? 0;
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
