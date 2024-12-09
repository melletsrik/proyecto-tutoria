import { authMiddleware } from "@/middleware/authMiddleware.js";

import Login from "@/components/pages/Login.vue";
import Menu from "@/components/pages/Menu.vue";

import TutoriaLayout from "@/components/layouts/TutoriaLayout.vue";
import ElegirAccion from "@/components/pages/ElegirAccion.vue";
import Tut9000 from "@/components/pages/Tut9000.vue";
import Tut1060 from "@/components/pages/Tut1060.vue";
import Tut1061 from "@/components/pages/Tut1061.vue";
import CalificarTutoriasGeneral from "@/components/pages/CalificarTutoriasGeneral.vue";
import OpcionesTutoriaSolicitar from "@/components/pages/OpcionesTutoriaSolicitar.vue";


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
      meta: {
         middleware: [
            authMiddleware,
         ]
      },
      children: [
         {
            path: '/elegir-accion',
            name: 'elegirAccion',
            component: ElegirAccion,
         },
         {
            path: '/calificar-tutoria',
            name: 'calificarTutoria',
            component: CalificarTutoriasGeneral, // Vista para calificar tutorías
         },
         {
            path: '/solicitar-tutoria-opciones',
            name: 'solicitarTutoria',
            component: OpcionesTutoriaSolicitar, // Vista para elegir tipo de tutoría
         },
         {
            path: '/solicitar-tutoria-general',
            name: 'solicitarTutoriaGeneral',
            component: Tut9000, // Vista para Tutoría General
         },
         {
            path: '/solicitar-tutoria-particular',
            name: 'solicitarTutoriaParticular',
            component: Tut1061, // Vista para Tutoría Particular
         },
         {
            path: '/solicitar-tutoria-personal',
            name: 'solicitarTutoriaPersonal',
            component: Tut1060, // Vista para Tutoría Personal
         },
      ]
   },
]
