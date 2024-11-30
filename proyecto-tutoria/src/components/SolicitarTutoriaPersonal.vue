//TUTORIA PERSONAL
<script setup>
import '@/assets/estilos/CalificarTutoriasGeneral.css';
import NavBar from './Navbar.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Función para salir
const f_salir = () => {
	router.push('/elegir-tipo-tutoria');
};

// Tipos de tutoría
const tiposTutoria = ref([
	{ id: 1, nombre: 'Individual' },
	{ id: 2, nombre: 'Grupales' },
	{ id: 3, nombre: 'Personal' },
	{ id: 4, nombre: 'Orientación Profesional' }
]);


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

// Función para regresar
const f_regresar = () => {
	router.push('/home'); // Ajusta según la ruta de regreso que desees
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
			<textarea id="descripcion" v-model="descripcion"
				placeholder="Escriba una breve descripción del tema de la tutoría"></textarea>

		</form>

		<div class="botones">
			<button class="calificar" @click="f_calificarTutoria">Solicitar</button>
			<button class="button-salir" @click="f_salir">Volver</button>
		</div>

		<p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
	</div>
</template>
