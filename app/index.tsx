import React, { useEffect, useState } from "react";
import { fetchAccountData } from "./api/fetch-account-data";
import { CircleDollarSign } from "lucide-react-native";
import { Link, router } from "expo-router";

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
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="font-semibold text-2xl">
        Bom dia, <span className="text-midway-green-600">{ownerName}</span>!
      </h1>

      <h2 className="font-medium text-gray-500">O que deseja fazer hoje?</h2>

      <div className="flex gap-4 mt-4">
        <Link
          href="/payment-method"
          className="px-4 py-8 gap-2 flex flex-col text-midway-green-600 items-center shadow-md rounded-lg"
        >
          <p className="font-medium text-lg">Transferencia PIX</p>
          <CircleDollarSign size={32} />
        </Link>
      </div>
    </div>
  );
}
