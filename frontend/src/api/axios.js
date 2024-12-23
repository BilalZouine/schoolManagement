import axios from "axios";

export const clientAxios = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true, 
    withXSRFToken:true
});
