import { useAuthStore } from "@/store/authStore";

const authMiddleware = (context) => {
   const authStore = useAuthStore();
   const { next } = context;
   if (authStore.isLogged) {
      next();
   } else {
      alert('Sesión finalizada.')
      next({ name: 'login' })
   }
}

export { authMiddleware };
