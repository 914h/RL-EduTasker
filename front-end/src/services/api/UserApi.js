import { axiosClient } from "../../api/axios.js";

const UserApi = {
    login: async (email,password) =>{
        return await axiosClient.post('/login', {email,password})
    },
    logout: async () =>{
        return await axiosClient.post('/logout')
    },
    getUser: async () => {
        return await axiosClient.get('/me')
    },
    all: async (columns = []) =>{
        return await axiosClient.get('/me', {
            params: {
                columns :columns
            },
        })
    },
}
export default UserApi