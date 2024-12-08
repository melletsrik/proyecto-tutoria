<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/estilos/CalificarTutoriasGeneral.css';
import NavBar from './Navbar.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Variables reactivas
const n_calificacion = ref(0); // n_ para numérico
const p_tutorSeleccionado = ref(null); // Tutoría seleccionada
const a_tutoriasPendientes = ref([]); // Lista de tutorías pendientes
const router = useRouter();

// Función para obtener las tutorías desde el servidor
const f_obtenerTutorias = async () => {
  try {
    const loRespon = await axios.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
      ID: 'TUT1060',
      CCODALU: sessionStorage.getItem('gcCodAlu'),
      CNRODNI: sessionStorage.getItem('gcNroDni'),
      CTOKEN: sessionStorage.getItem('gcToken'),
    });
    if (loRespon.data?.ERROR) {
      throw new Error(loRespon.data.ERROR);
    }
    // Asignar datos obtenidos al arreglo
    a_tutoriasPendientes.value = loRespon.data.map((tutoria) => ({
      CIDTUTO: tutoria.CIDTUTO,
      CNOMDOC: tutoria.CNOMDOC,
      DFECHA: tutoria.TRESPUE || 'Fecha no disponible',
      calificada: false,
    }));
  } catch (error) {
    console.error('Error al obtener tutorías:', error);
    alert('Error al conectar con el servidor: ' + error.message);
  }
};

// Función para calificar la tutoría seleccionada
const f_calificarTutoria = () => {
  if (!p_tutorSeleccionado.value || n_calificacion.value === 0) {
    alert('Selecciona una tutoría y una calificación.');
    return;
  }

  p_tutorSeleccionado.value.calificada = true; // Marcar tutoría como calificada
  alert(`Tutoría calificada con éxito: ${n_calificacion.value} estrellas`);
  n_calificacion.value = 0; // Resetear calificación
  p_tutorSeleccionado.value = null; // Limpiar selección
};
// Función para recortar nombres largos
const f_recortarNombre = (cNombre) => cNombre.length > 15 ? `${cNombre.slice(0, 15)}...` : cNombre;

// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};

// Cargar tutorías al montar el componente
onMounted(() => f_obtenerTutorias());
// Función para volver al menú
</script>

<template>
  <NavBar />
  <div class="calificar-tutorias-general">
    <div class="titulo-barra">
      <h2>CALIFICAR LA TUTORÍA</h2>
    </div>
    <div class="body">
      <!-- Mensaje si no hay tutorías -->
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
      <!-- Opciones de calificación -->
      <div v-if="p_tutorSeleccionado" class="calificacion-estrellas">
        <label v-for="i in 5" :key="i">
          <input type="radio" v-model="n_calificacion" :value="i" />
          {{ i }}✰
        </label>
      </div>
      <!-- Botones -->
      <div class="botones">
        <button class="calificar" @click="f_calificarTutoria">Calificar</button>
        <button class="rojo" @click="f_volver">
         <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
         Volver
         </button>
      </div>
    </div>
  </div>
</template>
