export default {
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
    },
    {
      path: "/login",
      component: () => import("@/views/Login"),
    },
    {
      path: "/reg",
      component: () => import("@/views/Reg"),
    },
    {
      path: "/channel/:id",
      component: () => import("@/views/ChannelNews"),
    },
    {
      path: "*", //匹配所有路径
      component: () => import("@/views/NotFound"),
    },
  ],
  mode: "history",
};
