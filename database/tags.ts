import { db } from "./index";

export interface Tag {
  id: number;
  name: string;
}

export const createTagTable = () => {
  const sql =
    "CREATE TABLE if NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (_, result) => console.log("Tag table created successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};

export const addTag = ({ name }: Omit<Tag, "id">) => {
  const sql = "INSERT INTO tags (name) VALUES (?);";

  return db.transaction(tx => {
    tx.executeSql(
      sql,
      [name],
      (_, result) => console.log("Tag added successfully", result),
      err => {
        console.log(err);
        return null;
      }
    );
  });
};
