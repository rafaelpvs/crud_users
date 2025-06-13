import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ListUsersPage",
    component: () => import("@/pages/list-users/ListUsersPage.vue"),
  },
  {
    path: "/users/new",
    name: "CreateUserPage",
    component: () => import("@/pages/create-user/CreateUserPage.vue"),
  },
  {
    path: "/users/:id/edit",
    name: "EditUserPage",
    component: () => import("@/pages/edit-user/EditUserPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
