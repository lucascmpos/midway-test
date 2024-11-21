import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Frown } from "lucide-react-native";
import Button from "./components/button";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex h-full w-full items-center justify-center gap-4 bg-midway-green-700">
      <Frown size={100} className="text-midway-green-500" />
      <Text className="text-lg font-medium text-midway-green-500">
        Página não encontrada.
      </Text>
      <Button
        onClick={() => router.push("/")}
        className="rounded-lg bg-midway-green-500"
      >
        <Text className="p-2 text-xl font-semibold text-midway-green-800">
          Voltar para a página inicial
        </Text>
      </Button>
    </View>
  );
}
