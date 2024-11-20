import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Footer from "./components/footer";
import PaymentMethodScreen from "./index";
import { PaymentContext, PaymentProvider } from "./context/payment-context";
import { useContext } from "react";

SplashScreen.preventAutoHideAsync();

export default function PaymentMethodLayout() {
  return (
    <PaymentProvider>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <PaymentMethodScreen />
        </div>
        <Footer />
      </div>
    </PaymentProvider>
  );
}
