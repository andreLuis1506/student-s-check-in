import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Subjects from "../views/Subjects.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/subjects",
    name: "Subjects",
    component: Subjects
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
