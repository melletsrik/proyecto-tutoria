<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/estilos/ElegirTipoTutoria.css'; // Importa los estilos desde assets/estilos

const p_cTipoTutoria = ref(null); // p_ para parámetro, c para cadena
const p_router = useRouter(); // p_ para parámetro

// Función para manejar la selección y redirigir
const f_seleccionarTutoria = (tipo) => {
  p_cTipoTutoria.value = tipo;

  // Redirección según el tipo de tutoría seleccionada
  if (tipo === 'personal') {
    p_router.push({ name: 'tutoriaPersonal' }); // Cambiar al nombre correcto de la ruta
  } else {
    // Redirección genérica para otros tipos
    p_router.push({ name: 'calificarTutoria', query: { tipo } });
  }
};

// Función para regresar al menú principal
const f_regresar = () => {
  p_router.push('/menu'); // Redirige a la ruta /menu
};
</script>

<template>
  <div class="elegir-tipo-tutoria">
    <!-- Logo en la parte superior -->
    <img class="logoTipoTutoria" src="@/assets/imagenes/ucsm-logo.webp" alt="Logo UCSM" />

    <div class="botones-tutoria">
      <button
        class="boton"
        :class="{ activo: p_cTipoTutoria === 'general' }"
        @click="f_seleccionarTutoria('general')"
      >
        TUTORÍA GENERAL
      </button>
      <button
        class="boton"
        :class="{ activo: p_cTipoTutoria === 'personal' }"
        @click="f_seleccionarTutoria('personal')"
      >
        TUTORÍA PERSONAL
      </button>
      <button
        class="boton"
        :class="{ activo: p_cTipoTutoria === 'particular' }"
        @click="f_seleccionarTutoria('particular')"
      >
        TUTORÍA PARTICULAR
      </button>
    </div>

    <!-- Botón Volver -->
    <button class="regresar" @click="f_regresar">
      <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Regresar" />
      Volver
    </button>
  </div>
</template>

