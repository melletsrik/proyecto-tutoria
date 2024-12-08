import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Menu from '@/components/Menu.vue';
import ElegirAccion from '@/components/ElegirAccion.vue';
import OpcionesTutoriaSolicitar from '@/components/OpcionesTutoriaSolicitar.vue';
import SolicitarTutoriaParticular from '@/components/SolicitarTutoriaParticular.vue';
import SolicitarTutoriaPersonal from '@/components/SolicitarTutoriaPersonal.vue';
import Tut1060 from '@/components/Tut1060.vue';
import CalificarTutoriasGeneral from '@/components/CalificarTutoriasGeneral.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
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
      path: '/elegir-accion',
      name: 'elegirAccion',
      component: ElegirAccion,
    },
    {
      path: '/calificar-tutoria',
      name: 'calificarTutoria',
      component: CalificarTutoriasGeneral,
    },
    {
      path: '/solicitar-tutoria-opciones',
      name: 'solicitarTutoria',
      component: OpcionesTutoriaSolicitar,
    },
    {
      path: '/solicitar-tutoria-personal',
      name: 'solicitarTutoriaPersonal',
      component: SolicitarTutoriaPersonal,
    },
    {
      path: '/solicitar-tutoria-particular',
      name: 'solicitarTutoriaParticular',
      component: SolicitarTutoriaParticular,
    },
    // {
    //   path: '/solicitar-tutoria-general',
    //   name: 'solicitarTutoriaGeneral',
    //   component: SolicitarTutoriaGeneral,
    // },
	{
		path: '/calificar-tutoria-general',
		name: 'calificarTutoriaGeneral',
		component: Tut1060, // O la vista correspondiente 	según el tipo
		props: (route) => ({ tipo: route.query.tipo }), // Pasar el tipo como parámetro
	}
  ]
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authToken');
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirigir a login si no está autenticado
  } else {
    next(); // Continuar con la navegación
  }
});

export default router;
