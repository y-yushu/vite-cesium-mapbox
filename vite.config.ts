/*
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-06 23:23:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-01 16:07:34
 * @FilePath: \vite\vite-cesium-mapbox\vite.config.ts
 * @Description: 配置文件
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
