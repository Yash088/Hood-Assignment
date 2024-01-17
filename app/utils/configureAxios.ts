import axios from "axios";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_HOST,
  timeout: 30000,
});

const getGenericErrorMessage = (e: any) => {
  const text = e.response?.data?.errors
    ? Object.values(e.response?.data?.errors)[0]
    : e.response?.data?.message || "Something went wrong!";
  toast.error(text);
};

axiosInstance.interceptors.request.use((request) => {
  // custom headers or token if we want to send it
  return request;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },

  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 402) {
      toast.error("Unauthorized Access");
      signOut();
    }
    if (error?.response?.status === 500) {
      toast.error("Internal Server Error");
    } else {
      if (error?.response?.status !== 422) {
        getGenericErrorMessage(error);
      }
    }
    throw error;
  }
);
