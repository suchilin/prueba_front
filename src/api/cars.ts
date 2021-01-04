import axios from "axios";
import { APIURL_BASE } from "../config";

export const getAll = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authenticated");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const resp = await axios.get(`${APIURL_BASE}/cars`, config);
    return resp.data;
  } catch (err) {
    console.log("GET ALL CARS ERROR", err);
  }
};

export const save = async (maker: string, model: string, image: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authenticated");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const resp = await axios.post(
      `${APIURL_BASE}/cars`,
      { maker, model, image },
      config
    );
    return resp.data;
  } catch (err) {
    console.log("GET ALL CARS ERROR", err);
  }
};

export const maintain = async (
  id: number,
  person: string,
  description: string,
  estimatedDate: string
) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authenticated");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const resp = await axios.post(
      `${APIURL_BASE}/cars/${id}/maintenance`,
      { person, description, estimatedDate },
      config
    );
    return resp.data;
  } catch (err) {
    console.log("GET ALL CARS ERROR", err);
  }
};

export const liberate = async (id: number) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authenticated");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const resp = await axios.delete(
      `${APIURL_BASE}/cars/${id}/maintenance`,
      config
    );
    return resp.data;
  } catch (err) {
    console.log("GET ALL CARS ERROR", err);
  }
};
