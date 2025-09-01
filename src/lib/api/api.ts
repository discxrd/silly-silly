import axios from "axios";

// @TODO: move to env

export const apiInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});
