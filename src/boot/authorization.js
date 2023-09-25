import { boot } from "quasar/wrappers";

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    console.log(to.path);
    // const auth = useAuthStore();

    if (authRequired) {
      // auth.returnUrl = to.fullPath;
      return next("login");
    }
    next();
  });
});
