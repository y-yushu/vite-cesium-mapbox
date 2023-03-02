/*
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-06 23:23:51
 * @LastEditors: yyshu 2671255784@qq.com
 * @LastEditTime: 2023-02-07 22:39:51
 * @FilePath: \vite\vite-cesium-mapbox\src\main.ts
 * @Description: 项目ts入口
 */
import { createApp } from "vue";
import "./style.scss"; // 全局样式
import App from "./App.vue"; // 入口组件
import { Ion } from "cesium";

// 增加路由组件
import router from "@/router";

// 设置CesiumToken
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMGEwYmJkNi1lOTljLTRlN2EtYjgxOC0wOTgyZGQyMWM1ZTYiLCJpZCI6MTE4ODQ5LCJpYXQiOjE2NzE1MjY1NTR9.8adG-dolUaxY1WveKobMiJ05ahotExVhLrcxeFwHnuI";

createApp(App).use(router).mount("#app");
