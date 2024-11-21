export interface AccountData {
  accountId: string;
  balance: number;
  currency: string;
  status: "active" | "inactive" | "suspended";
  owner: {
    name: string;
    id: string;
  };
  cards: {
    cardId: string;
    brand: string;
    cardNumber: string;
    name: string;
    expirationDate: string;
    securityCode: string;
    favorite: boolean;
    used: boolean;
  }[];
}
