<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from './NavBar.vue';
const p_cTipoTutoria = ref(null); // p_ para parámetro, c para cadena
const p_router = useRouter(); // p_ para parámetro
// Función para manejar la selección y redirigir
const f_seleccionarTutoria = () => {
  if (!p_cTipoTutoria.value) {
    alert("Por favor, elige un tipo de tutoría.");
    return;
  }
  p_router.push({ name: 'calificarTutoria', query: { tipo: p_cTipoTutoria.value } });
};
</script>

<template>
   <NavBar />
   <div class="elegir-tipo-tutoria">
      <h2>Elige el tipo de tutoría a calificar</h2>
      <div>
         <label>
         <input type="radio" v-model="p_cTipoTutoria" value="general" /> Tutoría General
         </label>
      </div>
      <div>
         <label>
         <input type="radio" v-model="p_cTipoTutoria" value="personal" /> Tutoría Personal
         </label>
      </div>
      <div>
         <label>
         <input type="radio" v-model="p_cTipoTutoria" value="particular" /> Tutoría Particular
         </label>
      </div>
      <button @click="f_seleccionarTutoria">Seleccionar</button>
   </div>
</template>

<style scoped>
.elegir-tipo-tutoria {
  padding: 20px;
}
button {
   margin-top: 10px;
   padding: 10px;
   background-color: #4CAF50;
   color: white;
   border: none;
   cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>