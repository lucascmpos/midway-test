import { useContext } from "react";
import { AccountContext } from "./context/account-context";
import { PaymentContext } from "./context/payment-context";
import { Text, View } from "react-native";
import { Loader } from "lucide-react-native";

export function Loading() {
  return (
    <View className="flex h-full w-full items-center justify-center gap-4 bg-midway-green-700">
      <Loader size={100} className="animate-pulse text-midway-green-500" />
      <Text className="text-lg font-medium text-midway-green-500">
        Carregando...
      </Text>
    </View>
  );
}

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const accountContext = useContext(AccountContext);
  const paymentContext = useContext(PaymentContext);

  if (!accountContext || !paymentContext) {
    throw new Error(
      "LoadingWrapper must be used within AccountProvider and PaymentProvider",
    );
  }

  const { loading: accountLoading } = accountContext;
  const { loading: paymentLoading } = paymentContext;

  if (accountLoading || paymentLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
