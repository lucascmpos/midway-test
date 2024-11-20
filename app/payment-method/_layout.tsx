import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Footer from "./components/footer";
import { ScrollView } from "react-native";
import { useState } from "react";
import PaymentMethodScreen from "./index";

SplashScreen.preventAutoHideAsync();

export default function PaymentMethodLayout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  return (
    <>
      <ScrollView className="flex flex-col h-full pt-8 gap-6">
        <PaymentMethodScreen
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </ScrollView>
      <Footer isDisabled={!selectedPaymentMethod} />
    </>
  );
}
