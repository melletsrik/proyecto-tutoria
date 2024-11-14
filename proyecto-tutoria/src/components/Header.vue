<script setup>
import '@/assets/estilos/Header.css';
import { ref } from 'vue';
const lcarrera = ref("INGENIERIA DE SISTEMAS");
</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo" />
    </div>
    <div class="carrera">
      <p>{{ lcarrera }}</p>
    </div>
  </header>
</template>
