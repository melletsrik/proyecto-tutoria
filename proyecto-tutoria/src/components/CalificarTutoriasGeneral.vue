<script setup>
import { ref } from 'vue';
const a_tutoriasPendientes = ref([]); // a_ para arreglo
const n_calificacion = ref(0); // n_ para numérico
const p_tutorSeleccionado = ref(null); // p_ para parámetro
// Función para seleccionar la tutoría
const f_seleccionarTutoria = (p_tutoria) => {
   p_tutorSeleccionado.value = p_tutoria;
};
// Función para calificar la tutoría seleccionada
const f_calificarTutoria = () => {
  if (!p_tutorSeleccionado.value || n_calificacion.value === 0) {
    alert('Selecciona una tutoría y una calificación.');
    return;
  }
  alert(`Tutoría calificada con éxito: ${n_calificacion.value} estrellas`);
};
/*
const cargarTutoriasPendientes = async () => {
  try {
    const response = await axios.get('/api/tutorias/pending'); //Reemplazar con la URL real del API
    tutoriasPendientes.value = response.data;
  } catch (error) {
    console.error('Error cargando las tutorías:', error);
  }
};
*/
</script>

<template>
  <div class="calificar-tutorias-general">
    <h2>Tutorías Pendientes de Calificación</h2>

    <!-- Tabla de tutorías -->
    <table>
      <thead>
        <tr>
          <th>Docente</th>
          <th>Fecha y Hora</th>
          <th>Seleccionar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p_tutoria in a_tutoriasPendientes" :key="p_tutoria.CIDTUTO">
          <td>{{ p_tutoria.CNOMDOC }}</td>
          <td>{{ p_tutoria.DFECHA }}</td>
          <td>
            <input
              type="radio"
              :value="p_tutoria"
              v-model="p_tutorSeleccionado"
              :name="`tutoria-${p_tutoria.CIDTUTO}`"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mostrar los detalles de la tutoría seleccionada -->
    <div v-if="p_tutorSeleccionado">
      <h3>Califica la tutoría</h3>
      <p><strong>{{ p_tutorSeleccionado.CNOMDOC }}</strong> - {{ p_tutorSeleccionado.DFECHA }}</p>
      
      <div>
        <label v-for="i in 5" :key="i">
          <input
            type="radio"
            v-model="n_calificacion"
            :value="i"
          />
          {{ i }} Estrella{{ i > 1 ? 's' : '' }}
        </label>
      </div>

      <button @click="f_calificarTutoria">Calificar</button>
    </div>

    <!-- Botones para elegir y calificar -->
    <div v-else>
      <p>No hay tutorías pendientes de calificación.</p>
    </div>
  </div>
</template>

<style scoped>
.calificar-tutorias-general {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
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

label {
  margin-right: 10px;
}
</style>
