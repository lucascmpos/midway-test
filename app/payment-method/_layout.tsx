import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Footer from "./components/footer";
import PaymentMethodScreen from "./index";
import { useContext } from "react";
import { PaymentProvider } from "../context/payment-context";

SplashScreen.preventAutoHideAsync();

export default function PaymentMethodLayout() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <PaymentMethodScreen />
      </div>
      <Footer />
    </div>
  );
}
