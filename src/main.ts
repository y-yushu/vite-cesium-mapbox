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

// 增加路由组件
import router from "@/router";

createApp(App).use(router).mount("#app");
