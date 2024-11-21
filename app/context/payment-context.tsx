import React, { createContext, useState, ReactNode, useEffect } from "react";
import { fetchPaymentData } from "@/app/api/fetch-payment-data";
import { PaymentData } from "@/app/types/payment-data";

interface PaymentContextProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
  selectedInstallment: number | null;
  setSelectedInstallment: (installment: number | null) => void;
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData | null) => void;
  installments: {
    installmentAmount: number;
    amountToPay: number;
    installments: number;
  }[];
  setInstallments: (
    installments: {
      installmentAmount: number;
      amountToPay: number;
      installments: number;
    }[]
  ) => void;
  loading: boolean;
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
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [installments, setInstallments] = useState<
    { installmentAmount: number; amountToPay: number; installments: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const payment = await fetchPaymentData();
        setPaymentData(payment);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedInstallment,
        setSelectedInstallment,
        paymentData,
        setPaymentData,
        installments,
        setInstallments,
        loading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
