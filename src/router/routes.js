const routes = [
  {
    name: "index",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    name: "ra",
    path: "/ra/:idLocation",
    component: () => import("pages/RAPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
