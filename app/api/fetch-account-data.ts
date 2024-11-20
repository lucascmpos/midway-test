import axios from "axios";

export const fetchAccountData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/account");
    return response.data;
  } catch (error) {
    console.error("Error fetching account data:", error);
    throw error;
  }
};
