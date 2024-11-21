import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Footer from "./components/footer";
import PaymentMethodScreen from "./index";
import { useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function PaymentMethodLayout() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetChange = (index: number) => {
    setIsSheetOpen(index !== -1);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex-grow ${isSheetOpen ? "overflow-y-hidden" : "overflow-y-auto"}`}
      >
        <PaymentMethodScreen onSheetChange={handleSheetChange} />
      </div>
      {!isSheetOpen && <Footer />}
    </div>
  );
}
