import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Button from "@/app/components/button";
import { useEffect, useState } from "react";
import { fetchPaymentData } from "@/app/api/fetch-payment-data";
import { PaymentData } from "@/app/types/payment-data";

SplashScreen.preventAutoHideAsync();

interface FooterProps {
  isDisabled: boolean;
}

export default function Footer({ isDisabled }: FooterProps) {
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

  return (
    <div className="flex w-full bg-white border-t-2 items-center px-4 py-6 justify-between">
      <div>
        <p>Valor a ser pago</p>
        <p className="font-bold text-lg">
          {paymentData?.currency === "BRL" ? "R$" : paymentData?.currency}{" "}
          {paymentData?.amount?.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <Button variant={isDisabled ? "disabled" : "default"}>Pagar</Button>
    </div>
  );
}
