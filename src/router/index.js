import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@views/Home.vue";
import UserInfo from "@views/userInfo/index.vue";
import Detail from "@views/userInfo/Detail.vue";
import Department from "@views/userInfo/Department.vue";
import RoleManage from "@views/userInfo/RoleManage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/userInfo",
    name: "UserInfo",
    component: UserInfo,
    children: [
      {
        path: "/userInfo/detail/:id",
        name: "Detail",
        component: Detail
      },
      {
        path: "/userInfo/department/:id",
        name: "Department",
        component: Department
      },
      {
        path: "/userInfo/roleManage/:id",
        name: "RoleManage",
        component: RoleManage
      }
    ]
  },
  {
    path: "/index",
    component: Detail
  }
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

export default router;
