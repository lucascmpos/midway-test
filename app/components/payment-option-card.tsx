import React from "react";
import VisaIcon from "../assets/icons/visa-icon.svg";
import MasterCardIcon from "../assets/icons/mastercard-icon.svg";
import { Image } from "react-native";

interface PaymentOptionProps {
  method: "credit_card" | "account";
  brand?: string;
  cardNumber?: string;
  cardName?: string;
  balance?: number;
  currency?: string;
  onSelect: () => void;
  uniqueId: string;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  method,
  brand,
  cardNumber,
  cardName,
  balance,
  currency,
  onSelect,
  uniqueId,
}) => {
  const inputId = `${method}-${uniqueId}`;
  return (
    <div className="py-4 px-3 w-full items-center flex shadow-md rounded-lg">
      <label className="flex items-center">
        <input
          className="peer hidden"
          type="radio"
          id={inputId}
          name="paymentMethod"
          value={inputId}
          onChange={onSelect}
        />
        <span
          className="w-6 h-6 flex justify-center items-center border-2 rounded-full 
               border-midway-green-600 peer-checked:bg-midway-green-600 peer-checked:border-midway-green-600 
               hover:border-midway-green-600/90 p-1"
        ></span>
      </label>
      <label htmlFor={inputId} className="ml-2">
        {method === "credit_card" ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {brand === "Visa" ? (
                <Image source={VisaIcon} alt="Visa" className="w-6 h-6" />
              ) : brand === "Master" ? (
                <Image
                  source={MasterCardIcon}
                  alt="MasterCard"
                  className="w-6 h-6"
                />
              ) : null}
              <p className="text-midway-green-600 font-semibold">{cardName}</p>
            </div>
            <p className="text-sm">Final {cardNumber}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-midway-green-600 text-md font-semibold">
              Saldo em conta
            </p>
            <p className="text-sm">
              Disponível: {currency === "BRL" ? "R$" : currency}{" "}
              {balance?.toLocaleString("pt-BR")}
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default PaymentOption;
