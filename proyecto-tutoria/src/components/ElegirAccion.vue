<script setup>
import { useRouter } from 'vue-router'; // Necesitamos useRouter para navegar
import MenuCard from './MenuCard.vue'; // Importamos el componente MenuCard
import Navbar from './Navbar.vue';

const router = useRouter();

// Funciones para redirigir
const irCalificarTutoria = () => {
   router.push('/calificar-tutoria'); // Redirige a la opción para calificar tutoría
};

const irSolicitarTutoria = () => {
   router.push('/solicitar-tutoria-opciones'); // Redirige a la opción para solicitar tutoría
};
// Función para volver al menu
const f_volver = () => {
  router.push('/menu'); // Redirige al menú o ajusta según la ruta de regreso
};
</script>

<template>
   <div class="elegir-tipo-tutoria">
      <Navbar />
      
      <!-- Sección para elegir la acción de tutoría -->
      <div class="seccion">
         <div class="botones-tutoria">
            <!-- Menú para Calificar Tutoría -->
            <MenuCard icon="school" text="CALIFICAR TUTORÍA" @click="irCalificarTutoria" />
            <!-- Menú para Solicitar Tutoría -->
            <MenuCard icon="forum" text="SOLICITAR TUTORÍA" @click="irSolicitarTutoria" />
         </div>
      </div>

      <!-- Botón Volver -->
      <button class="rojo" @click="f_volver">
         <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
         Volver
      </button>
   </div>
</template>
