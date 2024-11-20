import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { fetchAccountData } from "../api/fetch-account-data";
import PaymentOption from "../components/payment-option-card";
import { AccountData } from "../types/account-data";

interface PaymentMethodScreenProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
}

export default function PaymentMethodScreen({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentMethodScreenProps) {
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const account = await fetchAccountData();
        setAccountData(account);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);

  if (!accountData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full px-4 gap-6">
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
            <PaymentOption
              key={`${card.cardId}-${index}`}
              method="credit_card"
              brand={card.brand}
              cardNumber={card.cardNumber}
              cardName={card.name}
              onSelect={() => setSelectedPaymentMethod(card.cardId)}
              uniqueId={`${card.cardId}-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
