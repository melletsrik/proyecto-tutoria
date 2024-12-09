<!-- CALIFICAR TUTORÍA GENERAL -->
<script setup>
import '@/assets/estilos/TutoriasGeneral.css';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Función para salir
const f_Salir = () => {
   router.push('/elegir-tipo-tutoria');
};

// Tipos de tutoría
const paTipo = ref([
   { CCODIGO: 'A', CDESCRI: 'Individual' },
   { CCODIGO: 'B', CDESCRI: 'Grupales' },
   { CCODIGO: 'C', CDESCRI: 'Personal' },
   { CCODIGO: 'D', CDESCRI: 'Orientación Profesional' }
]);

const paCodDoc = ref([]); // Lista de docentes filtrados según el tipo de tutoría
const pcTipo = ref(''); // Tipo de tutoría seleccionado
const pcUsuCod = ref(''); // Docente seleccionado
//const fechaTutoria = ref(''); // Fecha seleccionada
const pmConsul = ref(''); // Descripción del tema de tutoría
const mensajeExito = ref(''); // Mensaje de éxito después de enviar la solicitud

// Observador para actualizar los docentes filtrados cuando el tipo de tutoría cambia
watch(pcTipo, (nuevoTipo) => {
   if (nuevoTipo) {
      paCodDoc.value = docentesPorTipo[nuevoTipo] || [];
   } else {
      paCodDoc.value = [];
   }
});

// Función para solicitar tutoría
const f_Solicitar = () => {
   console.log('Solicitud enviada:', {
      CTIPO: pcTipo.value, CUSUCOD: pcUsuCod.value, MCONSUL: pmConsul.value
   });
   // Mostrar mensaje de éxito
   mensajeExito.value = "Tutoría solicitada con éxito.";
};

// Función para regresar
const f_Regresar = () => {
   router.push('/home'); // Ajusta según la ruta de regreso que desees
};
</script>
<template>
   <div class="solicitar-tutoria">
      <div class="titulo-barra">
         <h2>SOLICITAR TUTORÍA PERSONAL</h2>
      </div>
      <form @submit.prevent="f_Solicitar" class="formulario">
         <label>TIPO DE TUTORÍA:</label>
         <select id="pcTipo" v-model="pcTipo" :disabled="false">
            <option value="" disabled>--- SELECCIONE ---</option>
            <option v-for="laTmp in paTipo" :key="laTmp.CCODIGO" :value="laTmp.CDESCRI">
               {{ laTmp.CDESCRI }}
            </option>
         </select>
         <label for="docente">DOCENTE:</label>
         <select id="pcUsuCod" v-model="pcUsuCod" :disabled="!pcTipo">
            <option value="" disabled>--- SELECCIONE ---</option>
            <option v-for="laTmp in paCodDoc" key="laTmp.CCODDOC" :value="laTmp.CNOMBRE">
               {{ laTmp.CNOMBRE }}
            </option>
         </select>
         <label for="pmConsul">TEMA:</label>
         <textarea id="pmConsul" v-model="pmConsul" placeholder="Breve descripción del tema de la tutoría"></textarea>
      </form>
      <div class="botones">
         <!--<button class="buttom-green" @click="f_Solicitar">Solicitar</button>-->
         <button class="calificar" @click="f_Solicitar">Solicitar</button>
         <!--<button class="button-exit" @click="f_salir">Volver</button>-->
         <button class="button-salir" @click="f_Regresar"></button>
      </div>
   </div>
</template>
