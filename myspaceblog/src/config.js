import axios from "axios"


export const axiosInstance =axios.create({
    baseURL:"https://mernblog-bmj3.onrender.com/api"
})