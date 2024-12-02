import axios from 'axios';
import { router } from "@/router/index";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    }
})

const apiPost = async (p_oBody) => {
    try {
        const response = await http.post('https://transacciones.ucsm.edu.pe/wsPython/ERP/', p_oBody)
        const { data, status } = response
        if (status !== 200) {
            return { ERROR: 'Ocurrio un error, contacte con soporte.' }
        } else if (data.MENSAJE) {
            if (data.MENSAJE == 'TOKEN VENCIDO') {
                alert(data.MENSAJE)
                router.push({ name: "login" })
            } else {
                return { MENSAJE: data.MENSAJE }
            }
        } else if (data.ERROR) {
            if (data.ERROR == 'TOKEN VENCIDO') {
                alert(data.ERROR)
                router.push({ name: "login" })
            } else {
                return { MENSAJE: data.ERROR }
            }
        } else if (data.OK) {
            return { OK: data.OK }
        } else {
            return data
        }
    } catch (error) {
        console.log(error)
        return { ERROR: 'Ocurrio un error, contacte con soporte.' }
    }
}

export { apiPost }
