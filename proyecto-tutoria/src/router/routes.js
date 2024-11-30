import {createRouter, createWebHistory} from "vue-router";
import Login from "@/components/Login.vue";
import Menu from "@/components/Menu.vue";
import ElegirTipoTutoria from "@/components/ElegirTipoTutoria.vue";
import Tut1060 from "@/components/Tut1060.vue";
import TutoriaPersonal from "@/components/TutoriaPersonal.vue";
import SolicitarTutoriaPersonal from "@/components/SolicitarTutoriaPersonal.vue";
import SolicitarTutoriaParticular from "@/components/SolicitarTutoriaParticular.vue";
import TutoriaLayout from "@/components/layouts/TutoriaLayout.vue";

export const routes = [
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
      path: "/",
      component: TutoriaLayout,
      redirect: '/elegit-tipo-tutoria',
      children: [
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
   },
]