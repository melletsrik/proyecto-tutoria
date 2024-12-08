<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';

const p_cTipoTutoria = ref(null); // p_ para parámetro, c para cadena
const p_router = useRouter(); // p_ para parámetro

// Función para manejar la selección y redirigir
const f_seleccionarTutoria = (tipo) => {
  p_cTipoTutoria.value = tipo;

  // Redirección según el tipo de tutoría seleccionada
  if (tipo === 'personal') {
    p_router.push({ name: 'solicitarTutoriaPersonal' }); // Redirige a la ruta de tutoría personal
  } else if (tipo === 'particular') {
    p_router.push({ name: 'solicitarTutoriaParticular' }); // Redirige a la ruta de tutoría particular
  } else if (tipo === 'general') {
    p_router.push({ name: 'solicitarTutoriaGeneral' }); // Redirige a la ruta de tutoría general
  } else {
    // En caso de que no coincida con ninguno de los anteriores
    console.error('Tipo de tutoría no reconocido');
  }
};

// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};
</script>

<template>
  <div class="elegir-tipo-tutoria">
    <Navbar />
    <div class="botones-tutoria">
      <button
        class="verde"
        :class="{ activo: p_cTipoTutoria === 'general' }"
        @click="f_seleccionarTutoria('general')"
      >
        TUTORÍA GENERAL
      </button>
      <button
        class="verde"
        :class="{ activo: p_cTipoTutoria === 'personal' }"
        @click="f_seleccionarTutoria('personal')"
      >
        TUTORÍA PERSONAL
      </button>
      <button
        class="verde"
        :class="{ activo: p_cTipoTutoria === 'particular' }"
        @click="f_seleccionarTutoria('particular')"
      >
        TUTORÍA PARTICULAR
      </button>
    </div>

    <!-- Botón Volver -->
    <button class="rojo" @click="f_volver">
         <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
         Volver
      </button>
  </div>
</template>
