import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { createTables } from "../database";
import { doAccountExists } from "../database/accounts";

interface DataProps {
  name: string;
  nameExists: boolean;
  accountExists: boolean;
  appIsReady: boolean;
  setAccountExists: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const DataContext = React.createContext<DataProps | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [name, setName] = React.useState("");
  const [nameExists, setNameExists] = React.useState(false);
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
        const nameExists = name !== null && name.length > 0;

        setAccountExists(accountExists);
        setNameExists(nameExists);
        if (nameExists) setName(name);
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
        nameExists,
        accountExists,
        appIsReady,
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
