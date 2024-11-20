import React, { useEffect, useState } from "react";
import { fetchAccountData } from "./api/fetch-account-data";
import { CircleDollarSign } from "lucide-react-native";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const account = await fetchAccountData();
        setOwnerName(account.owner.name);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    getAccountData();
  }, []);

  return (
    <Text className="flex flex-col h-full items-center justify-center">
      <Text className="font-semibold text-2xl">
        Bom dia, <span className="text-midway-green-600">{ownerName}</span>!
      </Text>

      <Text className="font-medium text-gray-500">
        O que deseja fazer hoje?
      </Text>

      <View className="flex gap-4 mt-4">
        <Link
          href="/payment-method"
          className="px-4 py-8 gap-2 flex flex-col text-midway-green-600 items-center shadow-md rounded-lg"
        >
          <Text className="font-medium text-lg">Transferencia PIX</Text>
          <CircleDollarSign size={32} />
        </Link>
      </View>
    </Text>
  );
}
