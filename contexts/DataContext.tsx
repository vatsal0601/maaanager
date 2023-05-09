import * as React from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { createTables } from "../database";
import { doAccountExists } from "../database/accounts";

interface DataProps {
  name: string;
  nameExists: boolean;
  accountExists: boolean;
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

  React.useEffect(() => {
    const init = async () => {
      await createTables();

      const accountExists = await doAccountExists();
      setAccountExists(accountExists);

      const name = await SecureStore.getItemAsync("maaanager-name");
      const nameExists = name !== null && name.length > 0;
      setNameExists(nameExists);
      if (nameExists) setName(name);

      await SplashScreen.hideAsync();
    };

    init();
  }, []);

  return (
    <DataContext.Provider
      value={{ name, nameExists, accountExists, setAccountExists }}>
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
