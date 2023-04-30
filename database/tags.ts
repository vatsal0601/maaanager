import { db } from "./index";

export interface Tag {
  id: number;
  name: string;
}

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
