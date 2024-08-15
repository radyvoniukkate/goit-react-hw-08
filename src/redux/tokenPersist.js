import axios from "axios";
import {setToken} from "./auth/slice"
export const persistToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token");
};

export const loadToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return setToken(token); // Повертаємо екшн
  }
  return null;
};