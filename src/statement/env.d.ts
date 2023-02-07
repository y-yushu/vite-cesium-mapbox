/*
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 21:31:30
 * @LastEditors: yyshu 2671255784@qq.com
 * @LastEditTime: 2023-02-07 21:40:31
 * @FilePath: \vite\vite-cesium-mapbox\src\statement\env.d.ts
 * @Description: 文件声明
 */
// vue3 报错提示 找不到模块“./XXX.vue”或其相应的类型声明
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
