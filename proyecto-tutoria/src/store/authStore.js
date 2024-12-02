import {defineStore} from "pinia";
import {apiPost} from "@/plugins/api.js";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isLogged: false,
        authState: {
            CNAME: '',
            CNOMBRE: '',
            CNRODNI: '',
            CPROYEC: '',
            CTOKEN:'',
            NINDICE: 0,
            ACARRERAS: []
        }
    }),
    getters: {
        getName: state => state.authState.CNAME,
        getNombre: state => state.authState.CNOMBRE,
        getNroDni: state => state.authState.CNRODNI,
        getProyecto: state => state.authState.CPROYEC,
        getToken: state => state.authState.CTOKEN,
        getIndice: state => state.authState.NINDICE,
        getCarreras: state => state.authState.ACARRERAS,
        getCodAlu: state => state.authState.ACARRERAS[state.authState.NINDICE].CCODALU
    },
    actions: {
        async login(p_oUsuBody) {
            try {
                const response = await apiPost(p_oUsuBody);
                this.authState.CNAME = response.CNAME;
                this.authState.CNOMBRE = response.CNOMBRE;
                this.authState.CNRODNI = response.CNRODNI;
                this.authState.CPROYEC = response.CPROYEC;
                this.authState.ACARRERAS = response.DATOS
                this.authState.CTOKEN = response.CTOKEN
                this.isLogged = true;
                return { MENSAJE: 'Sesión iniciada correctamente', isLogged: true }
            } catch (err) {
                console.log(err)
                return { MENSAJE: '', isLogged: false }
            }
        },
        async cerrarSesion() {
            try {
                this.authState.NINDICE = 0;
                this.isLogged = false;
            } catch (err) {
                console.log(err)
            }
        },
        setIndiceCarrera(p_nIndice) {
            this.authState.NINDICE = p_nIndice;
        }
    },
    persist: {
        storage: sessionStorage
    }
})
