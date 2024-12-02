import axios from 'axios';
import { router } from "@/router/index"
import { useAuthStore } from "@/store/authStore.js";

const http = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        Accepts: "application/json",
    }
})

http.interceptors.request.use(
    function (config ) {
        const authStore = useAuthStore()
    }
)

export { http }
