import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Menu from '@/components/Menu.vue';
import ElegirTipoTutoria from '@/components/ElegirTipoTutoria.vue';
import CalificarTutoriasGeneral from '@/components/CalificarTutoriasGeneral.vue';

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
			component: CalificarTutoriasGeneral, // O la vista correspondiente según el tipo
			props: (route) => ({ tipo: route.query.tipo }), // Pasar el tipo como parámetro
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