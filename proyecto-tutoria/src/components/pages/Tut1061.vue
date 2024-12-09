<!-- SOLICITAR TUTORIA PARTICULAR -->
<script setup>
import '@/assets/estilos/TutoriasGeneral.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect'; // Importar Vue Multiselect
import 'vue-multiselect/dist/vue-multiselect.css';

const p_router = useRouter();

// Tipos de tutoría
const tiposTutoria = ref([
	{ id: 1, nombre: 'Individual' },
	{ id: 2, nombre: 'Grupales' },
	{ id: 3, nombre: 'PARTICULAR' },
	{ id: 4, nombre: 'Orientación Profesional' }
]);

const docentes = ref([]); // Lista de docentes obtenida de la API
const selectedTipoTutoria = ref(''); // Tipo de tutoría seleccionado
const selectedDocente = ref(''); // Docente seleccionado
const descripcion = ref(''); // Tema de la tutoría
const mensajeExito = ref(''); // Mensaje de éxito

// Función para obtener todos los docentes al inicio
const obtenerTodosLosDocentes = async () => {
	try {
		const response = await fetch('https://transacciones.ucsm.edu.pe/wsPython/ERP', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				CBUSQUE: '', // Campo vacío para obtener todos los tutores
				CUNIACA: '71'
			})
		});

		const data = await response.json();
		docentes.value = data.map(docente => ({
			id: docente.CCODDOC,
			nombre: docente.CNOMBRE
		}));
	} catch (error) {
		console.error('Error al obtener todos los docentes:', error);
	}
};

// Función para solicitar tutoría
const solicitarTutoria = () => {
	console.log('Solicitud enviada:', {
		tipoTutoria: selectedTipoTutoria.value,
		docente: selectedDocente.value,
		tema: descripcion.value
	});
	mensajeExito.value = '¡Tutoría solicitada exitosamente!';
};

// Función para volver al menú
const f_volver = () => {
	p_router.push('/menu');
};

// Llamar a la API al montar el componente para obtener todos los tutores
onMounted(() => {
	obtenerTodosLosDocentes();
});
</script>

<template>
	<div class="solicitar-tutoria">
		<div class="titulo-barra">
			<h2>SOLICITA TUTORÍA PARTICULAR</h2>
		</div>

		<form @submit.prevent="solicitarTutoria" class="formulario">
			<!-- Selección de tipo de tutoría -->
			<label>TIPO DE TUTORÍA:</label>
			<select id="tipoTutoria" v-model="selectedTipoTutoria">
				<option value="" disabled>Seleccione el tipo de tutoría</option>
				<option v-for="tipoTutoria in tiposTutoria" :key="tipoTutoria.id" :value="tipoTutoria.nombre">
					{{ tipoTutoria.nombre }}
				</option>
			</select>

			<!-- Selección de docente filtrado con Vue Multiselect -->
			<label for="docente">SELECCIONE DOCENTE:</label>
			<multiselect id="docente" v-model="selectedDocente" :options="docentes" :searchable="true"
				:placeholder="'Escribe para buscar un docente...'" label="nombre" track-by="id" :close-on-select="true"
				:allow-empty="false" />

			<!-- Campo para descripción del tema -->
			<label for="descripcion">TEMA:</label>
			<textarea id="descripcion" v-model="descripcion"
				placeholder="Escriba una breve descripción del tema de la tutoría"></textarea>

			<!-- Botones -->
			<div class="botones">
				<button class="calificar" @click="solicitarTutoria">Solicitar</button>
				<button class="rojo" @click="f_volver">
					<img class="icon" src="@/assets/imagenes/icon-back.webp" alt="Volver" />
					Volver
				</button>
			</div>
		</form>

		<!-- Mensaje de éxito -->
		<p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
	</div>
</template>
