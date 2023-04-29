import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("maaanager.db");

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);
