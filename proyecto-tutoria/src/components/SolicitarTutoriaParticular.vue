<script setup>
import '@/assets/estilos/SolicitarTutoriaParticular.css';
import NavBar from './Navbar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();


// Función para salir
const f_salir = () => {
    router.push('/elegir-tipo-tutoria');
};


</script>
<template>
    <NavBar />
    <div class="solicitar-tutoria-particular">
        <h2>Solicitar Tutoría Personal</h2>

        <label for="docente">TIPO DE TUTORÍA:</label>
        <form @submit.prevent="solicitarTutoria" class="formulario">

            <select id="tipoTutoria" v-model="selectedTipoTutoria" :disabled="!selectedTipoTutoria">
                <option value="" disabled>Seleccione el tipo de tutoría</option>
                <option v-for="tipoTutoria in tiposTutoria" :key="tipoTutoria.id" :value="tipoTutoria.nombre">
                    {{ docente.nombre }}
                </option>
            </select>

            <label for="docente">DOCENTE:</label>
            <select id="docente" v-model="selectedDocente" :disabled="!selectedUnidad">
                <option value="" disabled>Seleccione un docente</option>
                <option v-for="docente in docentesFiltrados" :key="docente.id" :value="docente.nombre">
                    {{ docente.nombre }}
                </option>
            </select>

            <label for="fecha">Fecha:</label>
            <input id="fecha" type="date" v-model="fechaTutoria" />

            <label for="descripcion">TEMA:</label>
            <textarea id="descripcion" v-model="descripcion"
                placeholder="Escriba una breve descripción del tema de la tutoría"></textarea>

            <button type="submit" class="btn">Solicitar Tutoría</button>
        </form>
        <button class="regresar" @click="f_regresar">
            <img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Regresar" />
            Volver
        </button>

        <p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
    </div>

</template>
