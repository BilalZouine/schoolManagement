import { axiosClient } from "../../../api/axios";

export const ParentApi = {
    allParent: () => axiosClient.get('/admin/parents'),
    create: (payload) => axiosClient.post('/admin/parents', payload),
    parent: (id) => axiosClient.get(`/admin/parents${id}`),
    update: (id, payload) => {
        // delete payload.id;
        return axiosClient.put(`/admin/parents/${id}`, payload)
    },
    delete: (id) => axiosClient.delete(`/admin/parents/${id}`),
}
