import React, { createContext, useState, ReactNode, useEffect } from "react";
import { fetchPaymentData } from "@/app/api/fetch-payment-data";
import { PaymentData, Installment } from "@/app/types/payment-data";

interface PaymentContextProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
  selectedInstallment: number | null;
  setSelectedInstallment: (installment: number | null) => void;
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData | null) => void;
  installments: Installment[];
  setInstallments: (installments: Installment[]) => void;
  loading: boolean;
}

export const PaymentContext = createContext<PaymentContextProps | undefined>(
  undefined,
);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(
    null,
  );
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [installments, setInstallments] = useState<Installment[]>([]);
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

  const handlePaymentMethodChange = (method: string | null) => {
    setSelectedPaymentMethod(method);
    if (method === "account") {
      setSelectedInstallment(null);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        selectedPaymentMethod,
        setSelectedPaymentMethod: handlePaymentMethodChange,
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
