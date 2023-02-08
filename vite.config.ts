/*
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-06 23:23:51
 * @LastEditors: yyshu 2671255784@qq.com
 * @LastEditTime: 2023-02-08 21:01:09
 * @FilePath: \vite\vite-cesium-mapbox\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
