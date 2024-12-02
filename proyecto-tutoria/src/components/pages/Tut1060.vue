<script setup>
import '@/assets/estilos/Tut1060.css';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiPost } from '@/plugins/api';
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const router = useRouter();
const pnCalifi = ref(0); // n_ para numérico
const pcIdTutoSel = ref(null); // p_ para parámetro

const a_tutoriasPendientes = ref([]);
/**
 * Función para calificar la tutoría seleccionada
 * */
const f_calificarTutoria = async () => {
   if (!pcIdTutoSel.value || pnCalifi.value === 0) {
      alert('Selecciona una tutoría y una calificación.');
      return;
   }
   const loBody = {
      ID: 'TUT1061',
      CIDTUTO: pcIdTutoSel.value,
      CCODALU: authStore.getCodAlu,
      CNRODNI: authStore.getNroDni,
      NCALIFI: pnCalifi.value,
      CTOKEN: authStore.getToken,
   }
   const response = await apiPost(loBody)
   if (response.OK) {
      alert('Calificación enviada correctamente.')
   }
};

onMounted(() => {
   listarTutorias()
});
const listarTutorias = async () => {
   const loBody = {
      ID: 'TUT1060',
      CCODALU: authStore.getCodAlu,
      CNRODNI: authStore.getNroDni,
      CTOKEN: authStore.getToken,
   }
   const response = await apiPost(loBody)
   if (response.ERROR) {
      alert(response.ERROR);
   } else {
      a_tutoriasPendientes.value = response
   }
}

// Función para salir
const f_salir = () => {
  router.push('/elegir-tipo-tutoria');
};
const f_recortarNombre = (cNombre) => {
  return cNombre.length > 15 ? cNombre.slice(0, 30) + '...' : cNombre;
};
</script>
<template>
   <div class="calificar-tutorias-general">
      <div class="titulo-barra">
         <h2>CALIFICAR LA TUTORÍA</h2>
      </div>
      <div class='body'>
         <p v-if="!a_tutoriasPendientes.length" class="no-registros">
            NO HAY TUTORÍAS PENDIENTES POR CALIFICAR.
         </p>
         <!-- Tabla de tutorías -->
         <table v-else>
            <thead>
            <tr>
               <th class="col-nombre">DOCENTE</th>
               <th class="col-fecha">FECHA</th>
               <th class="col-seleccion"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="p_tutoria in a_tutoriasPendientes" :key="p_tutoria.CIDTUTO" style="font-size: 11px;">
               <td>{{ f_recortarNombre(p_tutoria.CNOMDOC) }}</td>
               <td>{{ p_tutoria.TRESPUE }}</td>
               <td>
                  <input
                  type="radio"
                  :value="p_tutoria.CIDTUTO"
                  v-model="pcIdTutoSel"
                  :name="'tutoriaSelect'"
                  />
               </td>
            </tr>
            </tbody>
         </table>
         <!-- Mostrar opciones de calificación -->
         <div>
            <!-- Mostrar mensaje si no hay tutoría seleccionada -->
            <p v-if="!pcIdTutoSel" class="mensaje">
               Selecciona una tutoría para calificar.
            </p>
            <!-- Opciones de calificación solo si hay tutoría seleccionada -->
            <div v-else class='calificacion-estrellas'>
               <label v-for="i in 5" :key="i">
                  <input
                     type="radio"
                     v-model="pnCalifi"
                     :value="i"
                  />
                  {{ i }}✰
               </label>
            </div>
         </div>
         <!-- Botones de acción -->
         <div class="botones container-center">
            <button class="calificar" @click="f_calificarTutoria">Calificar</button>
            <button class="button-salir" @click="f_salir">Salir</button>
         </div>
      </div>
   </div>
</template>
