import axios from "axios";

//Get environment variable to change baseurl
//Set the env variable, set it to local when fails
const baseUrl = process.env.REACT_APP_LMS || "http://127.0.0.1:8000/";
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("Token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  } else {
    config.headers.Authorization = ``;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("userId");
    }
  },
);

export default AxiosInstance;
