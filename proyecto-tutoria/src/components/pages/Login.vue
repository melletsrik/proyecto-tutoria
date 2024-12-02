<script setup>
import { ref } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/estilos/Login.css';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';
import { useAuthStore } from "@/store/authStore";
import { http } from "@/plugins/axios.js";
import {apiPost} from "@/plugins/api.js";

const authStore = useAuthStore();
const plClave = ref(false);
const paData = ref({
   CNRODOC: '',
   pcClave: ''
});
const pcError = ref('');
const router = useRouter();

const togglePassword = () => {
   plClave.value = !plClave.value;
};

const f_validarDni = (p_pcNroDni) => {
   // Expresión regular para validar solo números y exactamente 8 dígitos
   const dniRegex = /^\d{8}$/;
   return dniRegex.test(p_pcNroDni);
};

const f_IniciarSesion = async () => {
   pcError.value = '';
   if (!f_validarDni(paData.value.CNRODOC)) {
      pcError.value = 'NÚMERO DE DNI INVÁLIDO';
      return;
   }
   // Hasheamos la clave antes de enviarla
   let lcClave = CryptoJS.SHA512(paData.value.pcClave).toString();

   const { MENSAJE, isLogged } = await authStore.login({ ...paData.value, CCLAVE: lcClave, ID: 'LOGINE' })
   if ( !isLogged ) {
      alert(MENSAJE)
   } else {
      alert(MENSAJE)
      router.push('/menu');
   }
};

const f_cerrarSesion = () => {
   sessionStorage.removeItem('gcAuthToken');
   sessionStorage.removeItem('gcNombreUsuario');
   //sessionStorage.removeItem('gcLoginTime');
   router.push('/login');
};

</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <img src="../../assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo">
      <h2>INICIAR SESIÓN</h2>
      <form @submit.prevent="f_IniciarSesion">
        <div class="input-group">
          <input
            type="text"
            v-model="paData.CNRODOC"
            placeholder="DNI"
            required
            autofocus
          />
          <i class="fas fa-user"></i>
        </div>
        <p v-if="pcError" class="error-message">{{ pcError }}</p>
        <div class="input-group">
          <input
            :type="plClave ? 'text' : 'password'"
            v-model="paData.pcClave"
            placeholder="Contraseña"
            required
          />
          <i class="fas" :class="plClave ? 'fa-eye-slash' : 'fa-eye'" @click="togglePassword"></i>
        </div>
        <div class="button-group">
          <button type="submit" class="login-boton">INGRESAR</button>
        </div>
      </form>
    </div>
  </div>
</template>
