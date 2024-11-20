import axios from "axios";

export const fetchPaymentData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/payment");
    return response.data;
  } catch (error) {
    console.error("Error fetching account data:", error);
    throw error;
  }
};
