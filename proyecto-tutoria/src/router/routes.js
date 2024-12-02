import { authMiddleware } from "@/middleware/authMiddleware.js";

import Login from "@/components/pages/Login.vue";
import Menu from "@/components/pages/Menu.vue";
import ElegirTipoTutoria from "@/components/pages/ElegirTipoTutoria.vue";
import Tut1060 from "@/components/pages/Tut1060.vue";
import TutoriaPersonal from "@/components/TutoriaPersonal.vue";
import SolicitarTutoriaPersonal from "@/components/pages/SolicitarTutoriaPersonal.vue";
import SolicitarTutoriaParticular from "@/components/pages/SolicitarTutoriaParticular.vue";
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
      meta: {
         middleware: [
            authMiddleware,
         ]
      },
   },
   {
      path: "/",
      component: TutoriaLayout,
      redirect: '/elegit-tipo-tutoria',
      meta: {
         middleware: [
            authMiddleware,
         ]
      },
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
