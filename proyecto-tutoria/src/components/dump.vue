<script setup>
import { ref } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/estilos/Login.css';
import { useRouter } from 'vue-router';
import axios from 'axios';

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

const validarDni = (dni) => {
   // Expresión regular para validar solo números y exactamente 8 dígitos
   const dniRegex = /^\d{8}$/;
   return dniRegex.test(dni);
};

const iniciarSesion = async () => {
   if (!validarDni(laData.value.pcNroDni)) {
   pcErrorDni.value = 'DNI debe tener 8 dígitos numéricos';
   return;
} else {
   pcErrorDni.value = '';
}
try {
   const response = await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
      ID: 'LOGINE',
      CNRODOC: laData.value.pcNroDni,
      CCLAVE: laData.value.pcClave
   });

   if (response.data && response.data.CTOKEN) {
      const token = response.data.CTOKEN;
      sessionStorage.setItem('authToken', token);

      // Guardar tiempo de inicio de sesión
      const loginTime = Date.now();
      sessionStorage.setItem('loginTime', loginTime);

      // Redirigir al menú
      router.push('/menu');

      // Configurar temporizador de expiración (5 minutos)
      setTimeout(() => {
         cerrarSesion();
      }, 5 * 60 * 1000);
   } else {
      alert('Credenciales incorrectas');
   }
   } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Error al conectar con el servidor');
   }
};

const cerrarSesion = () => {
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
