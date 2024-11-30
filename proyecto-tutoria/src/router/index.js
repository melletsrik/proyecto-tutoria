import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Menu from '@/components/Menu.vue';
import ElegirTipoTutoria from '@/components/ElegirTipoTutoria.vue';
import Tut1060 from '@/components/Tut1060.vue';
import TutoriaPersonal from '@/components/TutoriaPersonal.vue'; // Importa el componente para Tutoría Personal
import SolicitarTutoriaPersonal from '@/components/SolicitarTutoriaPersonal.vue';
import SolicitarTutoriaParticular from '@/components/SolicitarTutoriaParticular.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/menu',
			name: 'menu',
			component: Menu,
		},
		{
			path: '/elegir-tipo-tutoria',
			name: 'elegirTipoTutoria',
			component: ElegirTipoTutoria,
		},
		{
			path: '/calificar-tutoria',
			name: 'calificarTutoria',
			component: Tut1060, // O la vista correspondiente según el tipo
			props: (route) => ({ tipo: route.query.tipo }), // Pasar el tipo como parámetro
		},
		{
			path: '/tutoria-personal', // Ruta para Tutoría Personal
			name: 'tutoriaPersonal',
			component: TutoriaPersonal, // Asegúrate de que este componente exista
		},
		{
			path: '/solicitar-tutoria-personal', // Ruta para Tutoría Personal
			name: 'solicitarTutoriaPersonal',
			component: SolicitarTutoriaPersonal, // Asegúrate de que este componente exista
		},
		{
			path: '/solicitar-tutoria-particular', // Ruta para Tutoría Personal
			name: 'solicitarTutoriaParticular',
			component: SolicitarTutoriaParticular, // Asegúrate de que este componente exista
		},
	]
})

router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('authToken');
	if (to.meta.requiresAuth && !token) {
		next('/login');
	} else {
		next();
	}
});

export default router
