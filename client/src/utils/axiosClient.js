import axios from "axios";
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localStorage";

const axiosClient = axios.create({
  baseURL: "process.env.REACT_APP_SERVER_BASE_URL",
  withCredentials: true,
});
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});
axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }
  const statusCode = data.statusCode;
  const error = data.error;
  const originalRequest = response.config;

  if (
    statusCode === 401 &&
    originalRequest.url ===
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
  ) {
    removeItem(KEY_ACCESS_TOKEN);
    window.location.href = "/login";
    return Promise.reject(error);
  }
  // @ts-ignore
  if (statusCode === 401 && !originalRequest._retry) {
   // @ts-ignore
    originalRequest._retry = true;
    const response = await axios.create({
      withCredentials: true,
    })
    .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
    console.log("response from backend", response);

    if (response.data.status === 'ok') {
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.result.accessToken}`;
      return axios(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default axiosClient;
