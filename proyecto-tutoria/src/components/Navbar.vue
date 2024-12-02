<script setup>
import '@/assets/estilos/Navbar.css';
import { useRouter } from 'vue-router';
const router = useRouter();

const f_cerrarSesion = () => {
   sessionStorage.removeItem('authToken');
   sessionStorage.removeItem('loginTime');
   router.push('/login');
};
</script>

<template>
   <div class="navbar">
      <img src="@/assets/imagenes/ucsm-logo-v2.jpg" alt="Logo UCSM" class="navbar-logo">
      <button class="navbar-button" @click="f_cerrarSesion">Cerrar Sesión</button>
   </div>
</template>
