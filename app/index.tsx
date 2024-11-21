import React from "react";
import { CircleDollarSign, User } from "lucide-react-native";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAccountContext } from "./hooks/use-account-context";

export default function HomeScreen() {
  const accountContext = useAccountContext();
  const { accountData } = accountContext;

  return (
    <View className="flex h-full flex-col">
      <View className="bg-midway-green-700 p-4">
        <View className="flex flex-row items-center gap-2">
          <User
            size={32}
            className="rounded-full bg-white text-midway-green-700"
          />
          <View className="flex flex-col">
            <Text className="text-2xl font-semibold text-white">
              Bom dia,{" "}
              <Text className="text-midway-green-500">
                {accountData?.owner.name ?? "Usuário"}
              </Text>
              !
            </Text>
            <Text className="font-medium text-white">
              O que deseja fazer hoje?
            </Text>
          </View>
        </View>
      </View>

      <View className="flex w-full gap-4 p-4">
        <Text className="text-lg font-semibold text-midway-grey-800">
          Serviços
        </Text>
        <View className="grid w-full grid-cols-2 gap-4">
          <Link
            href="/payment-method"
            className="flex flex-col items-center gap-2 rounded-lg px-4 py-8 text-center text-midway-green-600 shadow hover:bg-slate-100"
          >
            <Text className="text-lg font-medium">Transferência PIX</Text>
            <CircleDollarSign size={32} />
          </Link>
        </View>
      </View>
    </View>
  );
}
