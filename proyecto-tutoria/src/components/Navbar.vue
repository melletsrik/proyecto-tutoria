<script setup>
import '@/assets/estilos/Navbar.css';
const f_cerrarSesion = () => {
   sessionStorage.removeItem('authToken');
   sessionStorage.removeItem('loginTime');
};
</script>

<template>
   <div class="navbar">
      <img src="@/assets/imagenes/ucsm-logo-v2.jpg" alt="Logo UCSM" class="navbar-logo">
      <button class="navbar-button" @click="f_cerrarSesion">Cerrar Sesión</button>
   </div>
</template>
