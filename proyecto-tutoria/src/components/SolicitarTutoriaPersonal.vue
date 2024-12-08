<script setup>
import '@/assets/estilos/SolicitarTutoria.css';
import NavBar from './Navbar.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Tipos de tutoría
const tiposTutoria = ref([
  { id: 1, nombre: 'Individual' },
  { id: 2, nombre: 'Grupales' },
  { id: 3, nombre: 'Personal' },
  { id: 4, nombre: 'Orientación Profesional' }
]);

// Lista de docentes para cada tipo de tutoría
const docentesPorTipo = {
  'Individual': [
    { id: 1, nombre: 'Docente A' },
    { id: 2, nombre: 'Docente B' }
  ],
  'Grupales': [
    { id: 3, nombre: 'Docente C' },
    { id: 4, nombre: 'Docente D' }
  ],
  'Personal': [
    { id: 5, nombre: 'Docente E' },
    { id: 6, nombre: 'Docente F' }
  ],
  'Orientación Profesional': [
    { id: 7, nombre: 'Docente G' },
    { id: 8, nombre: 'Docente H' }
  ]
};

const docentesFiltrados = ref([]); // Lista de docentes filtrados según el tipo de tutoría
const selectedTipoTutoria = ref(''); // Tipo de tutoría seleccionado
const selectedDocente = ref(''); // Docente seleccionado
const fechaTutoria = ref(''); // Fecha seleccionada
const descripcion = ref(''); // Descripción del tema de tutoría
const mensajeExito = ref(''); // Mensaje de éxito después de enviar la solicitud

// Observador para actualizar los docentes filtrados cuando el tipo de tutoría cambia
watch(selectedTipoTutoria, (nuevoTipo) => {
  if (nuevoTipo) {
    docentesFiltrados.value = docentesPorTipo[nuevoTipo] || [];
  } else {
    docentesFiltrados.value = [];
  }
});

// Función para solicitar tutoría
const solicitarTutoria = () => {
  console.log('Solicitud enviada:', {
    tipoTutoria: selectedTipoTutoria.value,
    docente: selectedDocente.value,
    fecha: fechaTutoria.value,
    descripcion: descripcion.value
  });

  // Mostrar mensaje de éxito
  mensajeExito.value = "Tutoría solicitada con éxito.";
};

// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};
</script>

<template>
  <NavBar />
  <div class="solicitar-tutoria">
    <div class="titulo-barra">
      <h2>SOLICITA TUTORÍA PERSONAL</h2>
    </div>

    <form @submit.prevent="solicitarTutoria" class="formulario">
      <label>TIPO DE TUTORÍA:</label>
      <select id="tipoTutoria" v-model="selectedTipoTutoria" :disabled="false">
        <option value="" disabled>Seleccione el tipo de tutoría</option>
        <option v-for="tipoTutoria in tiposTutoria" :key="tipoTutoria.id" :value="tipoTutoria.nombre">
          {{ tipoTutoria.nombre }}
        </option>
      </select>

      <label for="docente">DOCENTE:</label>
      <select id="docente" v-model="selectedDocente" :disabled="!selectedTipoTutoria">
        <option value="" disabled>Seleccione un docente</option>
        <option v-for="docente in docentesFiltrados" :key="docente.id" :value="docente.nombre">
          {{ docente.nombre }}
        </option>
      </select>

      <label for="descripcion">TEMA:</label>
      <textarea id="descripcion" v-model="descripcion" placeholder="Escriba una breve descripción del tema de la tutoría"></textarea>
    </form>

    <div class="botones">
      <!-- Cambié la función aquí a "solicitarTutoria" -->
      <button class="calificar" @click="solicitarTutoria">Solicitar</button>
      <button class="rojo" @click="f_volver">
         <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
         Volver
      </button>
    </div>

    <p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
  </div>
</template>
