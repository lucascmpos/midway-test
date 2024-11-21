import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import Footer from "./footer";
import Button from "@/app/components/button";
import RadioButton from "@/app/components/radio-button";

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
    <>
      <BottomSheetScrollView className="bg-white">
        <View className="p-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg font-bold">Parcelas do pagamento</Text>
            <Button
              className="flex h-8 w-8 items-center rounded-full bg-midway-green-500 p-1"
              onClick={closeSheet}
            >
              <X size={24} className="text-midway-green-700" />
            </Button>
          </View>

          <Text className="text-sm">
            O destinatário receberá à vista e você pagará parcelado.
          </Text>
          <View className="mt-6 flex flex-col gap-4">
            {installments.map((installment) => (
              <View
                onClick={() =>
                  handleInstallmentSelect(installment.installments)
                }
                className="flex flex-row items-center gap-4 rounded-lg p-4 shadow"
                key={`${selectedPaymentMethod}-${installment.installments}`}
              >
                <RadioButton
                  selected={selectedInstallment === installment.installments}
                  onPress={() =>
                    handleInstallmentSelect(installment.installments)
                  }
                />
                <Text className="flex-1 text-[16px] font-semibold text-midway-green-600">
                  {`${installment.installments}  x  de  R$  ${installment.installmentAmount.toFixed(2)}`}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </BottomSheetScrollView>
      <Footer isInsideSheet={true} closeSheet={closeSheet} />
    </>
  );
};

export default InstallmentsList;
