import { axiosClient } from "../../api/axios.js";

const ClassesApi = {
    create: async (payload) =>{
        return await axiosClient.post('/teacher', payload
        )
    },
    update: async (id, payload) =>{
        return await axiosClient.put(`/teacher/${id}`, {...payload , id})
    },
    delete: async (id) =>{
        return await axiosClient.delete(`/teacher/${id}`)
    },
    all: async (columns = []) =>{
        return await axiosClient.get('/teacher/classes', {
            params: {
                columns :columns
            },
        })
    },
}
export default ClassesApi    