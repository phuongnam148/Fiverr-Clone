import axios from "axios";
const newRequest = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/api/"
})

export default newRequest;