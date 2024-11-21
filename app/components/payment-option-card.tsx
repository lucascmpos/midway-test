import React from "react";
import VisaIcon from "../assets/icons/visa-icon.svg";
import MasterCardIcon from "../assets/icons/mastercard-icon.svg";
import { Image, Text, View, TouchableOpacity } from "react-native";
import RadioButton from "./radio-button";

interface PaymentOptionProps {
  method: "credit_card" | "account";
  brand?: string;
  cardNumber?: string;
  cardName?: string;
  balance?: number;
  currency?: string;
  onSelect: () => void;
  uniqueId: string;
  selected: boolean;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  method,
  brand,
  cardNumber,
  cardName,
  balance,
  currency,
  onSelect,
  selected,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className="mb-4 flex flex-row items-center rounded-lg bg-white px-3 py-4 shadow"
    >
      <RadioButton selected={selected} onPress={onSelect} />
      <View className="ml-2">
        {method === "credit_card" ? (
          <View className="flex flex-col gap-2">
            <View className="flex flex-row items-center gap-2">
              {brand === "Visa" ? (
                <Image className="h-6 w-6" alt="Visa" source={VisaIcon} />
              ) : brand === "Master" ? (
                <Image
                  className="h-6 w-6"
                  alt="MasterCard"
                  source={MasterCardIcon}
                />
              ) : null}
              <Text className="text-[16px] font-semibold text-midway-green-600">
                {cardName}
              </Text>
            </View>
            <Text>Final {cardNumber}</Text>
          </View>
        ) : (
          <View>
            <Text className="text-[16px] font-semibold text-midway-green-600">
              Saldo em conta
            </Text>
            <Text className="text-sm">
              Disponível: {currency === "BRL" ? "R$" : currency}{" "}
              {balance?.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentOption;
