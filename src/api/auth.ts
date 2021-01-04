import axios from "axios";
import { APIURL_BASE } from "../config";

export const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${APIURL_BASE}/signin`, {
      email,
      password,
    });
    console.log("RESPONSE", response);
    const { token } = response.data;
    localStorage.setItem("authToken", token);
  } catch (err) {
    console.log("LOGIN ERROR ", err.response);
    throw new Error(err.response.data.message);
  }
};
