import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/router/routes.js";
import middlewarePipeline from "./middlewarePipeline";

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
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
