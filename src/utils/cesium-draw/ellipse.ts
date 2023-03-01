/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-01 17:54:54
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-01 18:17:13
 * @FilePath: \vite-cesium-mapbox\src\utils\cesium-draw\ellipse.ts
 * @Description: 画圆形
 */
import { Viewer, Cartesian3 } from "cesium";
import { Arg } from "./interface";
import { cartesian3toLonAndLat } from "./public";

class DrawCurve {
  constructor(arg: Arg) {
    this.viewer = arg.viewer;
  }

  viewer: Viewer;

  /**
   * 贝塞尔曲线实现
   * @param {Cartesian3[]} points 点的集合
   */
  fineBezier(points: Cartesian3[]) {
    points.forEach((e) => {
      const d = cartesian3toLonAndLat(this.viewer, e);
      console.log(d);
    });
  }
}

export default DrawCurve;
