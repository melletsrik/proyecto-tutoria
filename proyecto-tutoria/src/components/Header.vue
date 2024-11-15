<script setup>
import '@/assets/estilos/Header.css';
import { ref } from 'vue';
const aCarreras = ref([
  "INGENIERIA DE SISTEMAS",
  "CARRERA DE DERECHO",
  "CENTRO DE IDIOMAS",
  "CARRERA DE MEDICINA"
]);
const indiceCarrera = ref(0); // Índice para la carrera seleccionada
const lcarrera = ref(aCarreras.value[indiceCarrera.value]);
const cambiarCarrera = (direccion) => {
  if (direccion === 'izquierda') {
    indiceCarrera.value = (indiceCarrera.value - 1 + aCarreras.value.length) % aCarreras.value.length;
  } else if (direccion === 'derecha') {
    indiceCarrera.value = (indiceCarrera.value + 1) % aCarreras.value.length;
  }
  lcarrera.value = aCarreras.value[indiceCarrera.value];
};

</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo" />
    </div>
    <div class="carrera">
      <button @click="cambiarCarrera('izquierda')" class="flecha">←</button>
      <p>{{ lcarrera }}</p>
      <button @click="cambiarCarrera('derecha')" class="flecha">→</button>
    </div>
  </header>
</template>
