<script setup>
import { ref } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/estilos/Login.css';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const plClave = ref(false);
const laData = ref({
   pcNroDni: '',
   pcClave: ''
});
const pcErrorDni = ref('');
const router = useRouter();

const togglePassword = () => {
   plClave.value = !plClave.value;
};

const f_validarDni = (p_pcNroDni) => {
   // Expresión regular para validar solo números y exactamente 8 dígitos
   const dniRegex = /^\d{8}$/;
   return dniRegex.test(p_pcNroDni);
};

const iniciarSesion = async () => {
   if (!f_validarDni(laData.value.pcNroDni)) {
      pcErrorDni.value = 'DNI debe tener 8 dígitos numéricos';
      return;
   } else {
      pcErrorDni.value = '';
   }

   // Hasheamos la clave antes de enviarla
   const lcClave = CryptoJS.SHA512(laData.value.pcClave).toString();

   try {
      const loResponse = await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
         ID: 'LOGINE',
         CNRODOC: laData.value.pcNroDni,
         CCLAVE: lcClave // Enviar la contraseña hasheada
      });

      // Revisa si el token es `CTOKEN` o `lcToken` según la respuesta del servidor
      if (loResponse.data && loResponse.data.CTOKEN) {
         const token = loResponse.data.CTOKEN; // Cambiar a `lcToken` si corresponde
         sessionStorage.setItem('authToken', token);

         // Guardar tiempo de inicio de sesión
         const ltTime = Date.now();
         sessionStorage.setItem('loginTime', ltTime);

         // Redirigir al menú
         router.push('/menu');

         // Configurar temporizador de expiración (5 minutos)
         setTimeout(() => {
            f_cerrarSesion();
         }, 5 * 60 * 1000);
      } else {
         alert('Usuario o contraseña incorrectos');
      }
   } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Error al conectar con el servidor');
   }
};

const f_cerrarSesion = () => {
   sessionStorage.removeItem('authToken');
   sessionStorage.removeItem('loginTime');
   router.push('/login');
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="iniciarSesion">
        <div class="input-group">
          <input 
            type="text" 
            v-model="laData.pcNroDni" 
            placeholder="DNI" 
            required 
          />
          <i class="fas fa-user"></i>
        </div>
        <p v-if="pcErrorDni" class="error-message">{{ pcErrorDni }}</p>
        <div class="input-group">
          <input 
            :type="plClave ? 'text' : 'password'" 
            v-model="laData.pcClave" 
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
