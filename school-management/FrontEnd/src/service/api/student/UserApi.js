import { axiosClient } from "../../../api/axios";

const StudentApi = {
    getCsrfToken: async () => await axiosClient.get('sanctum/csrf-cookie', {
        baseURL: import.meta.env.VITE_BACKEND_URL
    }),
    login: async (email, password) => await axiosClient.post('/login', { email, password }),
    logout: async () => await axiosClient.post('/logout'),
    getStudent: async () => await axiosClient.get('/me'),

}
export default StudentApi;

