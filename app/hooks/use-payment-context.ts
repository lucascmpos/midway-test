import { useContext } from "react";
import { PaymentContext } from "@/app/context/payment-context";

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}
