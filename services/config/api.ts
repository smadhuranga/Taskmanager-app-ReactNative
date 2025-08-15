import axios from "axios";


const api = axios.create({
    baseURL: "https://689f09303fed484cf878cf38.mockapi.io/api/v1",
    timeout: 10000
})

api.interceptors.request.use(async (config)=>{
    // config.headers.Authorization = `Bearer ${token}`
    return config;
})

api.interceptors.response.use(async (config)=>{
    return config
})

export default api;