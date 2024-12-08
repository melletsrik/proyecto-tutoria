<script setup>
import '@/assets/estilos/Tut1060.css';
import NavBar from './Navbar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
   try {
      await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
         ID: 'TUT1061',
         CIDTUTO: pcIdTutoSel.value,
         CCODALU: sessionStorage.getItem('gcCodAlu'),
         CNRODNI: sessionStorage.getItem('gcNroDni'),
         NCALIFI: pnCalifi.value,
         CTOKEN: sessionStorage.getItem('gcToken'),
      })
      .then(data => {
         if (data == null) {
            alert('NO SE PUDO CONECTAR CON EL SERVIDOR (2)');
            return ;
            // OJOFPM
         } else if (data.ERROR) {
            alert(data.ERROR);
            return;
         } else {
            alert('CALIFICACIÓN ENVIADA CORRECTAMENTE')
         }
      })
   } catch (error) {
      alert('ERROR APROBAR');
      return ;
      // OJOFPM
   }

};

onMounted(() => {
   listarTutorias()
});
const listarTutorias = async () => {
   try {
      await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
         ID: 'TUT1060',
         CCODALU: sessionStorage.getItem('gcCodAlu'),
         CNRODNI: sessionStorage.getItem('gcNroDni'),
         CTOKEN: sessionStorage.getItem('gcToken'),
      })
      .then(data => {
         if (data == null) {
            alert('NO SE PUDO CONECTAR CON EL SERVIDOR (2)');
            return ;
            // OJOFPM
         } else if (data.ERROR) {
            alert(data.ERROR);
            return;
         } else {
            a_tutoriasPendientes.value = data.data
         }
      })
   } catch (error) {
      alert('OCURRIO UN ERROR MOUNTED');
      return ;
   }
}

// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};
const f_recortarNombre = (cNombre) => {
  return cNombre.length > 15 ? cNombre.slice(0, 30) + '...' : cNombre;
};
</script>
<template>
   <NavBar />
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
            <button class="rojo" @click="f_volver">
               <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
               Volver
            </button>
         </div>
      </div>
   </div>
</template>
