export interface Installment {
  installmentAmount: number;
  amountToPay: number;
  installments: number;
  fees: {
    fixed: {
      amount: number;
      percentage: number;
    };
    installments: {
      amount: number;
      percentage: number;
    };
  };
}

export interface PaymentData {
  transactionId: string;
  amount: number;
  currency: string;
  receiver: {
    name: string;
    id: string;
  };
  method: "credit_card" | "account";
  simulation: Installment[];
}
