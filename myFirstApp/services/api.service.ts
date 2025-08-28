import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP!;
export const api = axios.create({
  baseURL: `http://${SERVER_IP}:3001/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config: any) => {
  //TODO:change type
  const token = await AsyncStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
