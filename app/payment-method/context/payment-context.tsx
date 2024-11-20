import React, { createContext, useState, ReactNode } from "react";

interface PaymentContextProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
  selectedInstallment: number | null;
  setSelectedInstallment: (installment: number | null) => void;
}

export const PaymentContext = createContext<PaymentContextProps | undefined>(
  undefined
);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(
    null
  );

  return (
    <PaymentContext.Provider
      value={{
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedInstallment,
        setSelectedInstallment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
