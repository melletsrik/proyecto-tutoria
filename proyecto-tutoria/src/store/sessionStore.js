// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { computed } from 'vue';

export const useSessionStore = defineStore("session", () => {
    const usuario = ref(null);
    const nombre = ref('');
    const getUsuario = computed(() => usuario.value);
    const getNombre = computed(() => nombre.value);

    if (sessionStorage.getItem("app_user")) {
        usuario.value = sessionStorage.getItem("app_user");
    }
    if (sessionStorage.getItem("nombre")) {
        nombre.value = sessionStorage.getItem("nombre");
    }
  
    const setUsuario = (nuevoUsuario) => {
        console.log('STORE NOMBRE');
        
      usuario.value = nuevoUsuario;
    };
    
    const setNombre = (nuevoNombre) => {
        console.log('STORE USUARIO');
        nombre.value = nuevoNombre;
      };
  
    return {
      getUsuario,
      getNombre,
      setUsuario,
      setNombre,
    };

});