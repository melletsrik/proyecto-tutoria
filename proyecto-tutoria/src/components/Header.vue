<script setup>
import '@/assets/estilos/Header.css';
import { ref, onMounted } from 'vue';
import { useSessionStore } from '@/store/sessionStore';
const session = useSessionStore()

const aCarreras = ref(JSON.parse(sessionStorage.getItem('gaDatos')));
const indiceCarrera = ref(0); // Índice para la carrera seleccionada
const lcarrera = ref(aCarreras.value[indiceCarrera.value].CNOMUNI);
const lcSaludo = ref('');
const lcName = ref(sessionStorage.getItem('gcName') || 'Usuario'); // Obtener el nombre del usuario desde sessionStorage

const cambiarCarrera = (direccion) => {
   //
   if(aCarreras.length >1){
      if (direccion === 'izquierda') {
         indiceCarrera.value = (indiceCarrera.value - 1 + aCarreras.value.length) % aCarreras.value.length;
      } else if (direccion === 'derecha') {
         indiceCarrera.value = (indiceCarrera.value + 1) % aCarreras.value.length;
      }  
   }
   console.log(lcarrera)
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
   const lcName = sessionStorage.getItem('gcName')
   lcSaludo.value = f_obtenerSaludo(); // Establece el saludo dependiendo de la hora
   console.log("Saludo:", `${lcSaludo.value}.${lcName}`); // Verificar si el saludo se establece correctamente
   console.log("Usuario:", lcName); // Verificar el nombre del usuario
   const jsonlaDatos = JSON.parse(sessionStorage.getItem('gaDatos'));
   console.log(jsonlaDatos)
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
        <p>{{ lcSaludo }}, {{ lcName }}</p> <!-- Saludo y nombre del usuario -->
      </div>
   </header>
</template>
