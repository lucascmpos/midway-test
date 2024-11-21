import { useContext } from "react";
import { AccountContext } from "./context/account-context";
import { PaymentContext } from "./context/payment-context";
import { Text, View } from "react-native";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const accountContext = useContext(AccountContext);
  const paymentContext = useContext(PaymentContext);

  if (!accountContext || !paymentContext) {
    throw new Error(
      "LoadingWrapper must be used within AccountProvider and PaymentProvider"
    );
  }

  const { loading: accountLoading } = accountContext;
  const { loading: paymentLoading } = paymentContext;

  if (accountLoading || paymentLoading) {
    return (
      <View className="w-full flex gap-4  justify-center bg-midway-green-700 items-center h-full">
        <View className="dot-spinner">
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
          <View className="dot-spinner__dot"></View>
        </View>
        <Text className="text-white text-lg font-medium">Carregando...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
