<script setup>
import { ref } from 'vue';
import '@/assets/estilos/TutoriaPersonal.css';
import NavBar from './NavBar.vue';
const n_calificacion = ref(0); // n_ para numérico
const p_tutorSeleccionado = ref(null); // p_ para parámetro
// Inicializa las tutorías con la propiedad calificada
const a_tutoriasPendientes = ref([
   { CIDTUTO: 1, CNOMDOC: 'Manuel Zuñiga', DFECHA: '2024-11-12 10:00 AM', calificada: false },
   { CIDTUTO: 2, CNOMDOC: 'Villaverde Yumbato Norbel Antonio', DFECHA: '2024-11-13 02:00 PM', calificada: false },
]);
// Función para calificar la tutoría seleccionada
const f_calificarTutoria = () => {
   if (!p_tutorSeleccionado.value || n_calificacion.value === 0) {
      alert('Selecciona una tutoría y una calificación.');
      return;
   }
   // Marcar la tutoría como calificada
   p_tutorSeleccionado.value.calificada = true;
   p_tutorSeleccionado.value = null; // Limpia la selección después de calificar
   alert(`Tutoría calificada con éxito: ${n_calificacion.value} estrellas`);
};
// Función para salir
const f_salir = () => {
  alert("Has salido del sistema.");
};
</script>
<template>
   <NavBar />
   <div class="calificar-tutorias-general">
      <div class="titulo-barra">
         <h2>CALIFICA LA TUTORÍA PERSONAL</h2>
      </div>
      <div class='body'>
         <p v-if="!a_tutoriasPendientes.some(t => !t.calificada)" class="no-registros">
            NO HAY TUTORÍAS PENDIENTES DE CALIFICACIÓN.
         </p>
         <!-- Tabla de tutorías -->
         <table v-else>
            <thead>
            <tr>
               <th>Docente</th>
               <th>Fecha y Hora</th>
               <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="p_tutoria in a_tutoriasPendientes.filter(t => !t.calificada)" :key="p_tutoria.CIDTUTO">
               <td>{{ p_tutoria.CNOMDOC }}</td>
               <td>{{ p_tutoria.DFECHA }}</td>
               <td>
                  <input
                  type="radio"
                  :value="p_tutoria"
                  v-model="p_tutorSeleccionado"
                  :name="'tutoria-' + p_tutoria.CIDTUTO"
                  />
               </td>
            </tr>
            </tbody>
         </table>
         <!-- Mostrar opciones de calificación -->
         <div>
            <!-- Mostrar mensaje si no hay tutoría seleccionada -->
            <p v-if="!p_tutorSeleccionado" class="mensaje">
               Selecciona una tutoría para calificar.
            </p>
            <!-- Opciones de calificación solo si hay tutoría seleccionada -->
            <div v-else class='calificacion-estrellas'>
               <label v-for="i in 5" :key="i">
                  <input
                     type="radio"
                     v-model="n_calificacion"
                     :value="i"
                  />
                  {{ i }}✰
               </label>
            </div>
         </div>
         <!-- Botones de acción -->
         <div class="botones">
            <button class="calificar" @click="f_calificarTutoria">Calificar</button>
            <button class="button-salir" @click="f_salir">Salir</button>
         </div>
      </div>
   </div>
</template>
