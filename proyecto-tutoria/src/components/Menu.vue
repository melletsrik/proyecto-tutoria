<script setup>
import '@/assets/estilos/Menu.css';
import { ref } from 'vue';
import MenuCard from './MenuCard.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const verificarSesion = () => {
   const token = sessionStorage.getItem('authToken');
   const loginTime = sessionStorage.getItem('loginTime');
   /*
   if (!token || (Date.now() - loginTime > 5 * 60 * 1000)) {
      alert("La sesión ha expirado. Inicia sesión nuevamente.");
      router.push('/login');
   }
      */
};
onMounted(() => {
   verificarSesion();
});
const elegirAccion = () => {
   router.push('/elegir-accion');
};
</script>
<template>
  <div class="menu-container">
    <Header />
    <div class="grid-container">
      <MenuCard icon="schedule" text="Mi Horario" />
      <MenuCard icon="schedule" text="Horario" />
      <MenuCard icon="account_balance" text="Estado de Cuenta" />
      <MenuCard icon="credit_card" text="Deudas Temporales" />
      <MenuCard icon="star" text="Notas" />
      <MenuCard icon="edit" text="Exámenes" />
      <MenuCard icon="forum" text="Tutoría" @click="elegirAccion" />
    </div> 
    <Footer />
  </div>
</template>