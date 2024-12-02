export default function middlewarePipeline(context, middleware, index){
   const nextMiddleware = middleware[index];

   if(!nextMiddleware){
      return context.next;
   }

   return (params) => {
      if(params){
         const nextGuard = context.next;
         return nextGuard(params);
      }

      nextMiddleware({
         ...context,
         next: middlewarePipeline(context, middleware, index + 1)
      })
   }
}
