import { createRouter, createWebHistory } from "vue-router";
import Calendar from "./pages/Calendar.vue";
import Home from "./pages/Home.vue";
import DCHeros from "./pages/DCHeros.vue";
import Markdown from "./pages/Markdown.vue";
import Slider from "./pages/Slider.vue";
import Calculator from "./pages/Calculator.vue";
import Modal from "./pages/ReuseableModal.vue";
import ChatMessenger from "./pages/ChatMessenger.vue";
import UserCrud from "./pages/UserCrud.vue";
import store from "./store/index";
import { auth } from "./middleware/auth.js";

const routes = [
  { path: "/", component: Home },
  { path: "/dc-heros", component: DCHeros },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider-carousal", component: Slider },
  { path: "/calculator", component: Calculator },
  { path: "/reuseable-modal", component: Modal },
  { path: "/chat", component: ChatMessenger, meta: { middleware: "auth" } },
  { path: "/user-crud", component: UserCrud },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = auth;
    if (middleware) {
      middleware(next, store);
    }
    else {
        next();
      }
    } else {
      next();
    }
  }
);

export default router;
