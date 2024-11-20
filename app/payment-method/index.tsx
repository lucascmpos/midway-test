import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { fetchAccountData } from "../api/fetch-account-data";
import PaymentOption from "../components/payment-option-card";
import { AccountData } from "../types/account-data";
import { PaymentData } from "../types/payment-data";
import { fetchPaymentData } from "../api/fetch-payment-data";
import BottomSheet from "@gorhom/bottom-sheet";
import { View } from "react-native";
import InstallmentsList from "./components/installments-list";
import { PaymentContext } from "./context/payment-context";

export default function PaymentMethodScreen() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("Footer must be used within a PaymentProvider");
  }

  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedInstallment,
    setSelectedInstallment,
  } = context;
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [installments, setInstallments] = useState<
    { installmentAmount: number; amountToPay: number; installments: number }[]
  >([]);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "100%"], []);

  useEffect(() => {
    const getData = async () => {
      try {
        const account = await fetchAccountData();
        const payment = await fetchPaymentData();
        setAccountData(account);
        setPaymentData(payment);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col  px-4 pt-8 gap-6">
      <button
        className="p-1 h-8 w-8 items-center flex bg-midway-green-500 rounded-full"
        onClick={() => router.push("/")}
      >
        <ChevronLeft size={24} className="text-midway-green-700" />
      </button>
      <h1 className="font-bold text-midway-green-800 text-2xl">
        Transferência Pix
      </h1>
      <h2 className="font-semibold">Escolha uma forma de pagamento</h2>

      <div className="flex flex-col gap-7">
        <h2 className="text-midway-grey-800 font-semibold">Conta Midway</h2>

        <div>
          <PaymentOption
            method="account"
            balance={accountData.balance}
            currency={accountData.currency}
            onSelect={() => setSelectedPaymentMethod("account")}
            uniqueId="account"
          />
        </div>

        <h2 className="text-midway-grey-800 font-semibold text-center mt-1">
          Cartões de crédito
        </h2>

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
                <>
                  <button
                    className="mt-2 p-2 w-full  text-midway-green-600 font-semibold rounded flex justify-between"
                    onClick={handleOpenSheet}
                  >
                    Escolher parcelas
                    <ChevronRight />
                  </button>
                  {installments.length > 0 && (
                    <BottomSheet
                      enablePanDownToClose
                      ref={sheetRef}
                      index={1}
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
