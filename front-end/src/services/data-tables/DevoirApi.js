import { axiosClient } from "../../api/axios.js";

const DevoirApi = {
    create: async (payload) =>{
        return await axiosClient.post('/teacher/devoirs', payload
        )
    },
    update: async (id, payload) =>{
        return await axiosClient.put(`/teacher/devoirs/${id}`, {...payload , id})
    },
    delete: async (id) =>{
        return await axiosClient.delete(`/teacher/devoirs/${id}`)
    },
    all: async () =>{
        return await axiosClient.get('/teacher/devoirs')
    },
}
export default DevoirApi    