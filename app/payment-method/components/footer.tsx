import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Button from "@/app/components/button";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { usePaymentContext } from "@/app/hooks/use-payment-context";

SplashScreen.preventAutoHideAsync();

interface FooterProps {
  isInsideSheet?: boolean;
  closeSheet?: () => void;
}

export default function Footer({
  isInsideSheet = false,
  closeSheet,
}: FooterProps) {
  const paymentContext = usePaymentContext();
  const router = useRouter();
  const { selectedInstallment, selectedPaymentMethod, paymentData } =
    paymentContext;

  const totalAmount = selectedInstallment
    ? paymentData?.simulation.find(
        (inst) => inst.installments === selectedInstallment,
      )?.amountToPay
    : paymentData?.amount;

  const handlePayment = () => {
    router.push("/payment-success");
  };

  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-6 shadow-xl">
      <div>
        <Text>Valor a ser pago</Text>
        <Text className="flex flex-col text-xl font-bold">
          {totalAmount === undefined
            ? "Carregando..."
            : selectedInstallment
              ? `${selectedInstallment}x de ${
                  paymentData?.currency === "BRL" ? "R$" : paymentData?.currency
                } ${(totalAmount / selectedInstallment)
                  .toFixed(2)
                  .replace(".", ",")}`
              : `${paymentData?.currency === "BRL" ? "R$" : paymentData?.currency} ${totalAmount
                  .toFixed(2)
                  .replace(".", ",")}`}
        </Text>
      </div>
      <Button
        className={
          !selectedInstallment && selectedPaymentMethod !== "account"
            ? ""
            : "bg-midway-green-600"
        }
        variant={
          !selectedInstallment && selectedPaymentMethod !== "account"
            ? "disabled"
            : "default"
        }
        disabled={!selectedInstallment && selectedPaymentMethod !== "account"}
        onClick={isInsideSheet ? closeSheet : handlePayment}
      >
        <Text className="text-lg font-medium text-white">
          {isInsideSheet ? "Continuar" : "Pagar"}
        </Text>
      </Button>
    </div>
  );
}
