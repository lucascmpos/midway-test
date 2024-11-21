import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useCallback, useMemo, useRef } from "react";
import PaymentOption from "../components/payment-option-card";
import BottomSheet from "@gorhom/bottom-sheet";
import InstallmentsList from "./components/installments-list";
import { Text, View } from "react-native";
import Button from "../components/button";
import { Loading } from "../loading";
import { useAccountContext } from "../hooks/use-account-context";
import { usePaymentContext } from "../hooks/use-payment-context";

interface PaymentMethodScreenProps {
  onSheetChange: (index: number) => void;
}
export default function PaymentMethodScreen({
  onSheetChange,
}: PaymentMethodScreenProps) {
  const accountContext = useAccountContext();
  const paymentContext = usePaymentContext();
  const router = useRouter();

  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedInstallment,
    setSelectedInstallment,
    paymentData,
    setPaymentData,
    installments,
    setInstallments,
  } = paymentContext;
  const { accountData } = accountContext;

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["100%"], []);

  const handleCreditCardSelect = (cardId: string) => {
    setSelectedPaymentMethod(cardId);

    const cardSimulation = paymentData?.simulation || [];
    setInstallments(cardSimulation);
    setSelectedInstallment(null);
  };

  const handleInstallmentSelect = (installment: number) => {
    setSelectedInstallment(installment);
  };

  const handleCloseSheet = () => sheetRef.current?.close();
  const handleOpenSheet = () => sheetRef.current?.expand();

  useFocusEffect(
    useCallback(() => {
      setSelectedPaymentMethod(null);
      setSelectedInstallment(null);
      setInstallments([]);
    }, []),
  );

  if (!accountData) {
    return <Loading />;
  }

  const selectedInstallmentData = installments.find(
    (inst) => inst.installments === selectedInstallment,
  );

  return (
    <div className="flex flex-col gap-6 px-4 py-8">
      <Button
        className="flex h-8 w-8 items-center rounded-full bg-midway-green-500 p-1"
        onClick={() => router.push("/")}
      >
        <ChevronLeft size={24} className="text-midway-green-700" />
      </Button>
      <Text className="text-2xl font-bold text-midway-green-800">
        Transferência Pix
      </Text>
      <Text className="font-semibold">Escolha uma forma de pagamento</Text>

      <div className="flex flex-col gap-7">
        <Text className="font-semibold text-midway-grey-800">Conta Midway</Text>

        <View>
          <PaymentOption
            method="account"
            balance={accountData.balance}
            currency={accountData.currency}
            onSelect={() => setSelectedPaymentMethod("account")}
            selected={selectedPaymentMethod === "account"}
            uniqueId="account"
          />
        </View>

        <Text className="mt-1 text-center font-semibold text-midway-grey-800">
          Cartões de crédito
        </Text>

        <div className="flex flex-col gap-4">
          {accountData.cards.map((card, index) => (
            <div key={`${card.cardId}-${index}`}>
              <PaymentOption
                key={card.cardId}
                method="credit_card"
                brand={card.brand}
                cardNumber={card.cardNumber}
                cardName={card.name}
                onSelect={() => handleCreditCardSelect(card.cardId)}
                uniqueId={`${card.cardId}-${index}`}
                selected={selectedPaymentMethod === card.cardId}
              />
              {selectedPaymentMethod === card.cardId && (
                <>
                  <Button
                    className="flex w-full flex-row justify-between rounded-lg bg-white font-semibold"
                    onClick={handleOpenSheet}
                  >
                    <Text className="flex w-full flex-row items-center justify-between p-2 py-2 text-lg font-medium text-midway-green-600">
                      {selectedInstallment
                        ? `${selectedInstallment}x de R$ ${(
                            selectedInstallmentData?.installmentAmount || 0
                          )
                            .toFixed(2)
                            .replace(".", ",")}`
                        : "Escolher parcelas"}
                      <ChevronRight />
                    </Text>
                  </Button>
                  {selectedInstallment && selectedInstallmentData && (
                    <View className="mt-4 flex w-full flex-col gap-4 rounded-lg bg-white p-4">
                      <View className="flex flex-row justify-between text-sm">
                        <Text>Valor a transferir:</Text>{" "}
                        <Text className="font-semibold">
                          R$ {paymentData?.amount.toFixed(2).replace(".", ",")}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-between text-sm">
                        <Text>Taxa do cartão: </Text>
                        <Text className="font-semibold">
                          {selectedInstallmentData.fees.fixed.amount
                            .toFixed(2)
                            .replace(".", ",")}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-between text-sm">
                        <Text>Taxa de parcelamento: </Text>
                        <Text className="font-semibold">
                          {" "}
                          {selectedInstallmentData.fees.installments.amount > 0
                            ? `${selectedInstallmentData.fees.installments.amount
                                .toFixed(2)
                                .replace(".", ",")}`
                            : "-"}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-between text-sm">
                        <Text>Valor a transferir + taxas: </Text>
                        <Text className="font-semibold">{`${selectedInstallment}x de R$ ${(
                          selectedInstallmentData.amountToPay /
                          selectedInstallment
                        )
                          .toFixed(2)
                          .replace(".", ",")}`}</Text>
                      </View>
                    </View>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedPaymentMethod && installments.length > 0 && (
        <BottomSheet
          enablePanDownToClose
          ref={sheetRef}
          index={-1}
          style={{ borderRadius: 16 }}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#FFFF" }}
          onChange={onSheetChange}
        >
          <InstallmentsList
            installments={installments}
            selectedInstallment={selectedInstallment}
            handleInstallmentSelect={handleInstallmentSelect}
            selectedPaymentMethod={selectedPaymentMethod}
            closeSheet={handleCloseSheet}
          />
        </BottomSheet>
      )}
    </div>
  );
}
