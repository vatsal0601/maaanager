import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { createTables } from "../database";
import { doAccountExists } from "../database/accounts";

interface DataProps {
  name: string;
  nameExists: boolean;
  accountExists: boolean;
  appIsReady: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAccountExists: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const DataContext = React.createContext<DataProps | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [name, setName] = React.useState("");
  const [accountExists, setAccountExists] = React.useState(false);
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        const res = await Promise.all([
          createTables(),
          doAccountExists(),
          SecureStore.getItemAsync("maaanager-name"),
        ]);

        const [_, accountExists, name] = res;

        setAccountExists(accountExists);
        if (name !== null && name.length > 0) setName(name);
      } catch (err) {
        console.log(err);
      } finally {
        setAppIsReady(true);
      }
    };

    init();
  }, []);

  return (
    <DataContext.Provider
      value={{
        name,
        nameExists: name.length > 0,
        accountExists,
        appIsReady,
        setName,
        setAccountExists,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }

  return context;
};
