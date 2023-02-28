/*
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-06 23:23:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-02-28 18:29:39
 * @FilePath: \vite\vite-cesium-mapbox\vite.config.ts
 * @Description: 配置文件
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cesium from "vite-plugin-cesium";
// import { ViteSvgIconsPlugin } from "vite-plugin-svg-icons";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    // ViteSvgIconsPlugin({
    //   // 指定要缓存的图标文件夹
    //   iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
    //   // 执行icon name的格式
    //   symbolId: "icon-[dir]-[name]",
    // }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
