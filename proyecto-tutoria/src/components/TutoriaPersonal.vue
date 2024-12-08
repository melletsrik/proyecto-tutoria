<script setup>
import { ref } from 'vue';
import '@/assets/estilos/Tut1060.css';
import NavBar from './Navbar.vue';
const n_calificacion = ref(0); // n_ para numérico
const p_tutorSeleccionado = ref(null); // p_ para parámetro
// Inicializa las tutorías con la propiedad calificada
const a_tutoriasPendientes = ref([
   { CIDTUTO: 1, CNOMDOC: 'ZUÑIGA CARNERO MANUEL MARIANO ', DFECHA: '2024-11-12 10:00', calificada: false },
   { CIDTUTO: 2, CNOMDOC: 'VILLAVERDE YUMBATO NORBEL ANTONIO', DFECHA: '2024-11-13 22:00', calificada: false },
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
// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};

const f_recortarNombre = (cNombre) => {
   return cNombre.length > 15 ? cNombre.slice(0, 15) + '...' : cNombre;
};
</script>
<template>
   <NavBar />
   <div class="calificar-tutorias-general">
      <div class="titulo-barra">
         <h2>CALIFICAR LA TUTORÍA</h2>
      </div>
      <div class='body'>
         <p v-if="!a_tutoriasPendientes.some(t => !t.calificada)" class="no-registros">
            NO HAY TUTORÍAS PENDIENTES POR CALIFICAR.
         </p>
         <!-- Tabla de tutorías -->
         <table v-else>
            <thead>
               <tr>
                  <th class="col-nombre">DOCENTE</th>
                  <th class="col-fecha">FECHA Y HORA</th>
                  <th class="col-seleccion"></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="p_tutoria in a_tutoriasPendientes.filter(t => !t.calificada)" :key="p_tutoria.CIDTUTO">
                  <td>{{ f_recortarNombre(p_tutoria.CNOMDOC) }}</td>
                  <td>{{ p_tutoria.DFECHA }}</td>
                  <td>
                     <input type="radio" :value="p_tutoria" v-model="p_tutorSeleccionado"
                        :name="'tutoria-' + p_tutoria.CIDTUTO" />
                  </td>
               </tr>
            </tbody>
         </table>
         <div class="campos">
            <textarea id="tema" v-model="tema" placeholder="TEMA DE LA TUTORÍA">
            </textarea>
            <textarea id="respuesta" v-model="respuesta" placeholder="RESPUESTA DEL DOCENTE">
            </textarea>

         </div>
         <!-- Mostrar opciones de calificación -->
         <div>
            <!-- Mostrar mensaje si no hay tutoría seleccionada -->
            <p v-if="!p_tutorSeleccionado" class="mensaje">
               Selecciona una tutoría para calificar.
            </p>
            <!-- Opciones de calificación solo si hay tutoría seleccionada -->
            <div v-else class='calificacion-estrellas'>
               <label v-for="i in 5" :key="i">
                  <input type="radio" v-model="n_calificacion" :value="i" />
                  {{ i }}✰
               </label>
            </div>
         </div>
         <!-- Botones de acción -->
         <button class="rojo" @click="f_volver">
               <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
               Volver
         </button>
      </div>
   </div>
</template>
