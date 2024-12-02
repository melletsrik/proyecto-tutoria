<script setup>
import '@/assets/estilos/Header.css';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const laCarreras = ref([]);
const lcCarrera = ref('');
const lcSaludo = ref('');

const cambiarCarrera = (direccion) => {
   if(laCarreras.value.length > 1){
     const lnIndice = (direccion == 'izquierda') ? authStore.getIndice - 1 : authStore.getIndice + 1
     authStore.setIndiceCarrera(lnIndice)
     let lcNomUni = laCarreras.value[authStore.getIndice]['CNOMUNI']
     lcCarrera.value = (lcNomUni.length > 15) ? lcNomUni.slice(0, 30) + '...' : lcNomUni
   }
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
   laCarreras.value = authStore.getCarreras
   lcCarrera.value = authStore.getCarreras[authStore.getIndice].CNOMUNI
   lcSaludo.value = f_obtenerSaludo(); // Establece el saludo dependiendo de la hora
});
</script>

<template>
   <header class="header">
      <div class="logo">
        <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo" />
      </div>
      <div class="carrera">
         <button v-if="laCarreras.length > 1 && authStore.getIndice > 0" @click="cambiarCarrera('izquierda')" class="flecha izquierda">←</button>
         <p>{{ lcCarrera }}</p>
         <button v-if="laCarreras.length > 1 && authStore.getIndice < laCarreras.length - 1" @click="cambiarCarrera('derecha')" class="flecha derecha">→</button>
      </div>
      <div class="saludo">
        <p>{{ lcSaludo }}, {{ authStore.getName }}</p> <!-- Saludo y nombre del usuario -->
      </div>
   </header>
</template>
