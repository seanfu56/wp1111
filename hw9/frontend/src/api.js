import axios from "axios";

const API_ROOT = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:4000/api";
export default axios.create({ baseURL: API_ROOT });