import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface InstallmentsListProps {
  installments: {
    installmentAmount: number;
    amountToPay: number;
    installments: number;
  }[];
  selectedInstallment: number | null;
  handleInstallmentSelect: (installment: number) => void;
  selectedPaymentMethod: string | null;
  closeSheet: () => void;
}

const InstallmentsList: React.FC<InstallmentsListProps> = ({
  installments,
  selectedInstallment,
  handleInstallmentSelect,
  selectedPaymentMethod,
  closeSheet,
}) => {
  return (
    <BottomSheetScrollView className=" bg-white">
      <View className="p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-lg">Parcelas do pagamento</Text>
          <button
            className="p-1 h-8 w-8 items-center flex bg-midway-green-500 rounded-full"
            onClick={() => {
              closeSheet;
            }}
          >
            <X size={24} className="text-midway-green-700" />
          </button>
        </View>

        <Text className="text-sm">
          O destinatário receberá à vista e você pagará parcelado.
        </Text>
        <View className="flex flex-col mt-6 gap-2">
          {installments.map((installment) => (
            <label
              key={`${selectedPaymentMethod}-${installment.installments}`}
              className="flex items-center gap-4 mb-4"
            >
              <input
                type="radio"
                className="peer hidden"
                name="installments"
                value={installment.installments}
                checked={selectedInstallment === installment.installments}
                onChange={() =>
                  handleInstallmentSelect(installment.installments)
                }
              />
              <span
                className="w-6 h-6 flex justify-center items-center border-2 rounded-full 
               border-midway-green-600 peer-checked:bg-midway-green-600 peer-checked:border-midway-green-600 
               hover:border-midway-green-600/90 p-1"
              ></span>
              <Text className="text-midway-green-600 font-semibold text-[16px] flex-1">
                {`${
                  installment.installments
                }  x  de  R$  ${installment.installmentAmount.toFixed(2)}`}
              </Text>
              {/* <Text className="text-gray-500 text-[14px]">
                {`Total: R$${installment.amountToPay.toFixed(2)}`}
              </Text> */}
            </label>
          ))}
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

export default InstallmentsList;
