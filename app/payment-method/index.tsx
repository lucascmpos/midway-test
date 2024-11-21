import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useContext } from "react";
import PaymentOption from "../components/payment-option-card";
import BottomSheet from "@gorhom/bottom-sheet";
import InstallmentsList from "./components/installments-list";
import { AccountContext } from "../context/account-context";
import { PaymentContext } from "../context/payment-context";
import { Text, View } from "react-native";

export default function PaymentMethodScreen() {
  const accountContext = useContext(AccountContext);
  const paymentContext = useContext(PaymentContext);

  if (!accountContext || !paymentContext) {
    throw new Error(
      "PaymentMethodScreen must be used within AccountProvider and PaymentProvider"
    );
  }

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
  const snapPoints = useMemo(() => ["30%", "95%"], []);

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

  const handleChangeSheet = useCallback((index: number) => {
    console.log("Sheet at index:", index);
  }, []);

  if (!accountData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex flex-col  px-4 pt-8 gap-6">
      <button
        className="p-1 h-8 w-8 items-center flex bg-midway-green-500 rounded-full"
        onClick={() => router.push("/")}
      >
        <ChevronLeft size={24} className="text-midway-green-700" />
      </button>
      <Text className="font-bold text-midway-green-800 text-2xl">
        Transferência Pix
      </Text>
      <Text className="font-semibold">Escolha uma forma de pagamento</Text>

      <div className="flex flex-col gap-7">
        <Text className="text-midway-grey-800 font-semibold">Conta Midway</Text>

        <View>
          <PaymentOption
            method="account"
            balance={accountData.balance}
            currency={accountData.currency}
            onSelect={() => setSelectedPaymentMethod("account")}
            uniqueId="account"
          />
        </View>

        <Text className="text-midway-grey-800 font-semibold text-center mt-1">
          Cartões de crédito
        </Text>

        <div className="flex flex-col gap-4">
          {accountData.cards.map((card, index) => (
            <div key={`${card.cardId}-${index}`}>
              <PaymentOption
                method="credit_card"
                brand={card.brand}
                cardNumber={card.cardNumber}
                cardName={card.name}
                onSelect={() => handleCreditCardSelect(card.cardId)}
                uniqueId={`${card.cardId}-${index}`}
              />
              {selectedPaymentMethod === card.cardId && (
                <button
                  className="mt-2 p-2 w-full text-midway-green-600 font-semibold rounded flex justify-between"
                  onClick={handleOpenSheet}
                >
                  Escolher parcelas
                  <ChevronRight />
                </button>
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
          onChange={handleChangeSheet}
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
    </View>
  );
}
