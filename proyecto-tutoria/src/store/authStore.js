import {defineStore} from "pinia";
import {apiPost} from "@/plugins/api.js";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isLogged: false,
        authState: {
            usuario: {},
            carreras: [],
            token:''
        }
    }),
    getters: {
        getUser: state => state.authState.usuario,
        getToken: state => state.authState.token,
        getCarreras: state => state.authState.carreras
    },
    actions: {
        async login(p_oUsuBody) {
            try {
                const response = await apiPost(p_oUsuBody);
                console.log(response)
                const { data } = response
                console.log(data)
                this.isLogged = true;
                return { MENSAJE: '', isLogged: true }

            } catch (err) {
                console.log(err)
                return { MENSAJE: '', isLogged: false }
            }
        },
        async loogut() {
            try {
                this.isLogged = false;
            } catch (err) {
                console.log(err)
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
})
