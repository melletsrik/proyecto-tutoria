<script setup>
import { ref } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/estilos/Login.css';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useSessionStore } from '@/store/sessionStore';

const plClave = ref(false);
const paData = ref({
   pcNroDni: '',
   pcClave: ''
});
const pcError = ref('');
const p_router = useRouter();

const togglePassword = () => {
   plClave.value = !plClave.value;
};

const f_validarDni = (p_pcNroDni) => {
   // Expresión regular para validar solo números y exactamente 8 dígitos
   const dniRegex = /^\d{8}$/;
   return dniRegex.test(p_pcNroDni);
};

const f_IniciarSesion = async () => {
   /*
   if (!f_validarDni(paData.value.pcNroDni)) {
      pcError.value = 'NÚMERO DE DNI INVÁLIDO';
      return;
   } else {
      pcError.value = '';
   }
   */
   pcError.value = '';
   if (!f_validarDni(paData.value.pcNroDni)) {
      pcError.value = 'NÚMERO DE DNI INVÁLIDO';
      return;
   }
   // Hasheamos la clave antes de enviarla
   let lcClave = CryptoJS.SHA512(paData.value.pcClave).toString();
   console.log(paData.value.pcNroDni)
   // Llama al APIREST
   let loRespon = null;
   try {
      loRespon = await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
         ID: 'LOGINE',
         CNRODOC: paData.value.pcNroDni,
         CCLAVE: lcClave // Enviar la contraseña hasheada
      });
      console.log('LLAMADA API')
   } catch (error) {
      console.error('Error de autenticación:', error);
      alert('NO SE PUDO CONECTAR CON EL SERVIDOR (1)');
      return;
      // OJOFPM
   }
   // Verifica respuesta
   if (loRespon == null) {
      alert('NO SE PUDO CONECTAR CON EL SERVIDOR (2)');
      return;
      // OJOFPM
   } else if (loRespon.data.ERROR) {
      alert(loRespon.data.ERROR);
      return;
      // OJOFPM
   }
   console.log(loRespon.data);
   console.log('respuesta API')
   // session.setUsuario(loRespon.data);
   // console.log(loRespon.value);
   // session.setNombre(loRespon.data.CNAME);
   // sessionStorage.setItem('app_user', loRespon.data);
   // sessionStorage.setItem('nombre', loRespon.data.CNAME);
   sessionStorage.setItem('gcToken', loRespon.data.CTOKEN);
   sessionStorage.setItem('gcNombre', loRespon.data.CNOMBRE); // Guardamos solo el primer nombre
   sessionStorage.setItem('gcName', loRespon.data.CNAME); // Guardamos solo el primer nombre
   sessionStorage.setItem('gcNroDni', loRespon.data.CNRODNI); // Guardamos solo el primer nombre
   sessionStorage.setItem('gcCodAlu', loRespon.data.DATOS[0]['CCODALU']); // Guardamos solo el primer nombre
   sessionStorage.setItem('gaDatos', JSON.stringify(loRespon.data.DATOS));    // Guardamos solo el primer nombre
   console.log(sessionStorage.getItem('gaDatos'));
   // Redirigir al menú
   p_router.push('/menu');
};
/*
const f_cerrarSesion = () => {
   sessionStorage.removeItem('gcAuthToken');
   sessionStorage.removeItem('gcNombreUsuario');
   //sessionStorage.removeItem('gcLoginTime');
   router.push('/login');
};
*/
</script>

<template>
   <div class="login-container">
      <div class="login-card">
         <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo">
         <h2>INICIAR SESIÓN</h2>
         <form @submit.prevent="f_IniciarSesion">
            <div class="input-group">
               <input type="text" v-model="paData.pcNroDni" placeholder="DNI" required />
               <i class="fas fa-user"></i>
            </div>
            <p v-if="pcError" class="error-message">{{ pcError }}</p>
            <div class="input-group">
               <input :type="plClave ? 'text' : 'password'" v-model="paData.pcClave" placeholder="Contraseña"
                  required />
               <i class="fas" :class="plClave ? 'fa-eye-slash' : 'fa-eye'" @click="togglePassword"></i>
            </div>
            <div class="button-group">
               <button type="submit" class="login-boton">INGRESAR</button>
            </div>
         </form>
      </div>
   </div>
</template>