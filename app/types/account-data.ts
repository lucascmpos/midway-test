export interface AccountData {
  balance: number;
  currency: string;
  cards: {
    cardId: string;
    brand: string;
    cardNumber: string;
    name: string;
  }[];
}
