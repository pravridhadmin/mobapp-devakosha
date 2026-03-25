import axios from "axios";
import  { getAuth, getIdToken } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
const auth = getAuth(getApp());

const apiClient = axios.create({
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    const token = await getIdToken(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



export default apiClient;