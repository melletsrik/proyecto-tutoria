import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    }
})

const apiPost = async (p_oBody) => {
    try {
        console.log(p_oBody)
        const response = await http.post('https://transacciones.ucsm.edu.pe/wsPython/ERP/', p_oBody)
        console.log(response)
        const { data, status } = response
        if (status !== 200) {
            return { ERROR: 'Ocurrio un error, contacte con soporte.' }
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

export { apiPost }
