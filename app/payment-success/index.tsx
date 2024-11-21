import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import { CircleCheck, Loader, X } from "lucide-react-native";
import { usePaymentContext } from "../hooks/use-payment-context";

export default function PaymentStatus() {
  const [status, setStatus] = useState<"loading" | "success">("loading");

  const paymentContext = usePaymentContext();
  const { paymentData } = paymentContext;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <View className="flex h-full w-full items-center justify-center gap-4 bg-midway-green-700">
        <Loader size={100} className="animate-pulse text-midway-green-500" />

        <Text className="text-lg font-medium text-white">
          Processando sua transferência
        </Text>
      </View>
    );
  }

  return (
    <View className="flex h-full w-full bg-white p-4">
      <View className="flex w-full items-end">
        <Link
          href={"/"}
          className="flex h-8 w-8 items-center rounded-full bg-midway-green-500 p-1"
        >
          <X size={24} className="text-midway-green-700" />
        </Link>
      </View>
      <Text className="text-2xl font-bold text-midway-green-800">
        Pix realizado com sucesso!
      </Text>

      <View className="flex h-full flex-col items-center justify-center gap-4">
        <CircleCheck
          size={120}
          className="rounded-full bg-midway-green-600 p-4 text-white"
        />
        <View className="flex items-center text-midway-green-800">
          <Text className="text-[16px] font-medium">Para</Text>
          <Text className="text-[16px] font-bold">
            {paymentData?.receiver.name}
          </Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-center gap-4 text-midway-green-800">
          <View className="flex items-center">
            <Text className="text-[16px] font-medium">Valor</Text>
            <Text className="text-xl font-bold">
              {paymentData?.currency === "BRL" ? "R$" : paymentData?.currency}{" "}
              {paymentData?.amount.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View className="flex items-center">
            <Text className="text-[16px] font-medium">Data</Text>
            <Text className="text-xl font-bold">
              {new Date().toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
