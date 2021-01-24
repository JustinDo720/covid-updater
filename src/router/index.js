import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage";
import DisplayInfo from "@/components/DisplayInfo";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  },
  {
    path: '/info',
    name: 'DisplayInfo',
    component: DisplayInfo
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
