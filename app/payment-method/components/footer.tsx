import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Button from "@/app/components/button";
import { useEffect, useState, useContext } from "react";
import { fetchPaymentData } from "@/app/api/fetch-payment-data";
import { PaymentData } from "@/app/types/payment-data";
import { PaymentContext } from "../../context/payment-context";

SplashScreen.preventAutoHideAsync();

export default function Footer() {
  const paymentContext = useContext(PaymentContext);
  if (!paymentContext) {
    throw new Error("Footer must be used within a PaymentProvider");
  }

  const { selectedInstallment, selectedPaymentMethod, paymentData } =
    paymentContext;

  const totalAmount = selectedInstallment
    ? paymentData?.simulation.find(
        (inst) => inst.installments === selectedInstallment
      )?.amountToPay
    : paymentData?.amount;

  return (
    <div className="flex w-full bg-white border-t-2 items-center px-4 py-6 justify-between">
      <div>
        <p>Valor a ser pago</p>
        <p className="font-bold text-lg">
          {paymentData?.currency === "BRL" ? "R$" : paymentData?.currency}{" "}
          {totalAmount?.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <Button
        variant={
          !selectedInstallment && selectedPaymentMethod !== "account"
            ? "disabled"
            : "default"
        }
      >
        Pagar
      </Button>
    </div>
  );
}
