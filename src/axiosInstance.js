import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:5000',
  baseURL: 'https://dbms-backend.herokuapp.com',
  timeout: 4000,
});