import axios from "axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});



API.interceptors.response.use(
    (response) => {

        if (response.data?.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error: AxiosError) => {
        const serverMsg =
            (error.response?.data as { message?: string })?.message ||
            "Unexpected error occurred";

        toast.error(serverMsg);
        return Promise.reject(error);
    }
);

export default API;
