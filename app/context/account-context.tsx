import React, { createContext, useState, ReactNode, useEffect } from "react";
import { fetchAccountData } from "@/app/api/fetch-account-data";
import { AccountData } from "@/app/types/account-data";

interface AccountContextProps {
  accountData: AccountData | null;
  setAccountData: (data: AccountData | null) => void;
  loading: boolean;
}

export const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const account = await fetchAccountData();
        setAccountData(account);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <AccountContext.Provider value={{ accountData, setAccountData, loading }}>
      {children}
    </AccountContext.Provider>
  );
};
