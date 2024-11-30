<script setup>
import '@/assets/estilos/Header.css';
import { ref, onMounted } from 'vue';
import { useSessionStore } from '@/store/sessionStore';
const session = useSessionStore()

const laCarreras = ref(JSON.parse(sessionStorage.getItem('gaDatos')));
const lnIndice = ref(0)
const lcarrera = ref(laCarreras.value[lnIndice.value].CNOMUNI);
const lcSaludo = ref('');
const lcName = ref(sessionStorage.getItem('gcName') || 'Usuario'); // Obtener el nombre del usuario desde sessionStorage

const cambiarCarrera = (direccion) => {
   if(laCarreras.value.length > 1){
     lnIndice.value = (direccion == 'izquierda') ? lnIndice.value -= 1 : lnIndice.value += 1
     let lcNomUni = laCarreras.value[lnIndice.value]['CNOMUNI']
     lcarrera.value = (lcNomUni.length > 15) ? lcNomUni.slice(0, 30) + '...' : lcNomUni
     sessionStorage.setItem('gcCodAlu', laCarreras.value[lnIndice.value]['CCODALU'])
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
   const lcName = sessionStorage.getItem('gcName')
   lcSaludo.value = f_obtenerSaludo(); // Establece el saludo dependiendo de la hora
});
</script>

<template>
   <header class="header">
      <div class="logo">
        <img src="@/assets/imagenes/ucsm-logo.webp" alt="Universidad Católica de Santa María" class="logo" />
      </div>
      <div class="carrera">
         <button v-if="laCarreras.length > 1 && lnIndice > 0" @click="cambiarCarrera('izquierda')" class="flecha izquierda">←</button>
         <p>{{ lcarrera }}</p>
         <button v-if="laCarreras.length > 1 && lnIndice < laCarreras.length - 1" @click="cambiarCarrera('derecha')" class="flecha derecha">→</button>
      </div>
      <div class="saludo">
        <p>{{ lcSaludo }}, {{ lcName }}</p> <!-- Saludo y nombre del usuario -->
      </div>
   </header>
</template>
