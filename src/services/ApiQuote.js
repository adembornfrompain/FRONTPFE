  import axios from "axios";

const apiUrl = "http://localhost:5000/quote";

export async function requestQuote(dataQuote) {
  try {
    const response = await axios.post(`${apiUrl}/request`, {...dataQuote, userId: localStorage.getItem("userId")}, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getClientQuotes() {
  try {
    const response = await axios.get(`${apiUrl}/my-quotes?userId=${localStorage.getItem("userId")}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}