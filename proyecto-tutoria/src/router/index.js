import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/router/routes.js";
import middlewarePipeline from "./middlewarePipeline";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	// const token = sessionStorage.getItem('authToken');
	// if (to.meta.requiresAuth && !token) {
	// 	next('/login');
	// } else {
	// 	next();
	// }

	if(!to.meta.middleware) {
		return next();
	}

	const middleware = to.meta.middleware;

	const context = {
		to, from, next
	};

	return middleware[0]({
		...context,
		next: middlewarePipeline(context, middleware, 1)
	})

});

export { router }
