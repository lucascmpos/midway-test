import React, { useContext, useEffect, useState } from "react";
import { fetchAccountData } from "./api/fetch-account-data";
import {
  Banknote,
  CircleDollarSign,
  CreditCard,
  User,
} from "lucide-react-native";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { AccountContext } from "./context/account-context";

export default function HomeScreen() {
  const accountContext = useContext(AccountContext);

  if (!accountContext) {
    throw new Error("AccountContext must be used within a AccountProvider");
  }

  const { accountData } = accountContext;

  return (
    <View className="flex flex-col h-full  ">
      <View className="bg-midway-green-700 p-4">
        <View className="flex items-center flex-row gap-2">
          <User
            size={32}
            className="text-midway-green-700 bg-white rounded-full "
          />
          <View className="flex flex-col">
            <Text className="font-semibold text-2xl  text-white ">
              Bom dia,{" "}
              <span className="text-midway-green-500">
                {accountData?.owner.name}
              </span>
              !
            </Text>
            <Text className="font-medium text-white">
              O que deseja fazer hoje?
            </Text>
          </View>
        </View>
      </View>

      <View className="flex gap-4 w-full p-4">
        <Text className="text-lg font-semibold text-midway-grey-800">
          Serviços
        </Text>
        <View className="grid grid-cols-2 w-full gap-4">
          <Link
            href="/payment-method"
            className="px-4  hover:bg-slate-100 text-center py-8 gap-2 flex flex-col text-midway-green-600 items-center shadow-md rounded-lg"
          >
            <Text className="font-medium text-lg">Transferencia PIX</Text>
            <CircleDollarSign size={32} />
          </Link>
          <button
            disabled
            className="px-4  py-8 gap-2 flex flex-col text-midway-green-600/40 items-center  shadow-md text-center rounded-lg"
          >
            <Text className="font-medium text-lg text-midway-green-600/40">
              Deposito em conta
            </Text>
            <Banknote size={32} />
          </button>

          <button
            disabled
            className="px-4  py-8 gap-2 flex flex-col text-midway-green-600/40 items-center shadow-md text-center rounded-lg"
          >
            <Text className="font-medium text-lg text-midway-green-600/40">
              Cartoes de credito
            </Text>
            <CreditCard size={32} />
          </button>

          <button
            disabled
            className="px-4  py-8 gap-2 flex flex-col text-midway-green-600/40 items-center shadow-md text-center rounded-lg"
          >
            <Text className="font-medium text-lg text-midway-green-600/40">
              Cartoes de debito
            </Text>
            <CreditCard size={32} />
          </button>
        </View>
      </View>
    </View>
  );
}
