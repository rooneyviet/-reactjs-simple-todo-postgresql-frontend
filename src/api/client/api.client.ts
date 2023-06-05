import axios from "axios"
import queryString from "query-string"
import { setLogout } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import store from "../../redux/store";

const protocol = process.env.NODE_ENV === "production" ? "https://" : "http://";
const domain = process.env.NODE_ENV === "production" ? "example.com" : "localhost:5000";
const versionPath = "api/v1"

const baseURL: string = `${protocol}${domain}/${versionPath}`;

const apiClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})

apiClient.interceptors.request.use(async config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    config.headers['Content-Type'] = "application/json";
        return config;
})

apiClient.interceptors.response.use((response) => {
    return response;

}, (error) => {
    console.log(error);
    if (
        error.response?.status === 401 //&& error.response?.data?.message === "TokenExpiredError"
      ) {
        store.dispatch(setLogout());
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
});

export default apiClient;