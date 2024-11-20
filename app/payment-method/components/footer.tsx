import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Button from "@/app/components/button";
import { useEffect, useState, useContext } from "react";
import { fetchPaymentData } from "@/app/api/fetch-payment-data";
import { PaymentData } from "@/app/types/payment-data";
import { PaymentContext } from "../context/payment-context";

SplashScreen.preventAutoHideAsync();

export default function Footer() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("Footer must be used within a PaymentProvider");
  }

  const { selectedPaymentMethod, selectedInstallment } = context;
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        const payment = await fetchPaymentData();
        setPaymentData(payment);
      } catch (error) {
        console.error("Failed to fetch simulation data:", error);
      }
    };

    getPaymentData();
  }, []);

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
      <Button variant={!selectedPaymentMethod ? "disabled" : "default"}>
        Pagar
      </Button>
    </div>
  );
}
