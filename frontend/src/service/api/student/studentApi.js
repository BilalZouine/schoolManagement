import { clientAxios } from "../../../api/axios";

export const StudentApi = {
    login: async ( email, password ) => await clientAxios.post('/login', { email, password }),
    logout: async () => await clientAxios.post('/logout'),
    getStudent: async () => await clientAxios.get('/user'),
    getCsrfToken: async () => await clientAxios.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000/"

    })

}