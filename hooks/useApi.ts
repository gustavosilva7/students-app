import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useApi = () => {
    const api = axios.create({
        baseURL: "http://localhost:8000/api"
    });

    api.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const getUser = async () => {
        try {
            const response = await api.get("/user");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return { api, getUser }
}

export { useApi }