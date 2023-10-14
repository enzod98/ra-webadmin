import { boot } from "quasar/wrappers";
import { api } from "boot/axios";
import { getUserTokenSession } from "../composables/cookiesComposable";

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const privatePages = ["/"];
    const authRequired = privatePages.includes(to.path);
    // console.log(getUserTokenSession());

    if (authRequired) {
      await api
        .post("login/validar-token")
        .then(({ data }) => {
          // console.log(data);
          return next();
        })
        .catch((err) => {
          // console.log(err);
          return next("login");
        });
    } else {
      next();
    }
  });
});
