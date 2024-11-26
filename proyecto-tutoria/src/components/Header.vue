<script setup>
import '@/assets/estilos/Header.css';
import { ref, onMounted } from 'vue';

const aCarreras = ref([
   "INGENIERÍA DE SISTEMAS",
   "CARRERA DE DERECHO",
   "CENTRO DE IDIOMAS",
   "CARRERA DE MEDICINA"
]);
const indiceCarrera = ref(0); // Índice para la carrera seleccionada
const lcarrera = ref(aCarreras.value[indiceCarrera.value]);
const lcSaludo = ref('');
const lUserName = ref(sessionStorage.getItem('nombreUsuario') || 'Usuario'); // Obtener el nombre del usuario desde sessionStorage

const cambiarCarrera = (direccion) => {
   if (direccion === 'izquierda') {
      indiceCarrera.value = (indiceCarrera.value - 1 + aCarreras.value.length) % aCarreras.value.length;
   } else if (direccion === 'derecha') {
      indiceCarrera.value = (indiceCarrera.value + 1) % aCarreras.value.length;
   }
   lcarrera.value = aCarreras.value[indiceCarrera.value];
};

const f_obtenerSaludo = () => {
   const laHora = new Date().getHours();
   if (laHora >= 0 && laHora < 12) {
      return 'BUENOS DÍAS';
   } else if (laHora >= 12 && laHora < 18) {
      return 'BUENAS TARDES';
   } else {
      return 'BUENAS NOCHES';
   }
};

onMounted(() => {
   lcSaludo.value = f_obtenerSaludo(); // Establece el saludo dependiendo de la hora
   console.log("Saludo:", lcSaludo.value); // Verificar si el saludo se establece correctamente
   console.log("Usuario:", lUserName.value); // Verificar el nombre del usuario
});
</script>

<template>
   <header class="header">
      <div class="logo">
        <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo" />
      </div>
      <div class="carrera">
         <button @click="cambiarCarrera('izquierda')" class="flecha izquierda">←</button>
         <p>{{ lcarrera }}</p>
         <button @click="cambiarCarrera('derecha')" class="flecha derecha">→</button>
      </div>
      <div class="saludo">
        <p>{{ lcSaludo }}, {{ lUserName }}</p> <!-- Saludo y nombre del usuario -->
      </div>
   </header>
</template>
