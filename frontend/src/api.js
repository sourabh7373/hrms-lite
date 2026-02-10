import axios from "axios";

export const api = axios.create({
  baseURL: "https://hrms-lite-onui.onrender.com"
});
