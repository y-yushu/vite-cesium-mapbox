/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-01 18:03:53
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-01 18:30:53
 * @FilePath: \vite-cesium-mapbox\src\utils\cesium-draw\public.ts
 * @Description: 公共方法
 */
import { Viewer, Math as CesiumMath, Cartesian3 } from "cesium";

/**
 * 将Cartesian3转为经纬度
 * @param {Viewer} viewer 地球
 * @param {Cartesian3} cartesian 点的位置
 * @returns {Number[]} 经纬度
 */
const cartesian3toLonAndLat = (viewer: Viewer, cartesian: Cartesian3) => {
  const _d = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
  const lon = CesiumMath.toDegrees(_d.longitude);
  const lat = CesiumMath.toDegrees(_d.latitude);
  return [lon, lat];
};

const ComputeBezier = (
  cp: Array<{ x: number; y: number }>,
  numberOfPoints = 40
) => {
  let dt,
    curve = [];
  dt = 1 / (numberOfPoints - 1);
  for (let i = 0; i < numberOfPoints; i++) {
    curve[i] = PointOnCubicBezier(cp, i * dt);
  }
  return curve;
};

const PointOnCubicBezier = (cp: Array<{ x: number; y: number }>, t: number) => {
  let ax, bx, cx;
  let ay, by, cy;
  let tSquared, tCubed;
  let result: { x: number; y: number } = { x: 0, y: 0 };
  let length = cp.length;
  let inteval = Math.floor(length / 4); // 向下取整
  /*計算多項式係數*/
  cx = 3.0 * (cp[inteval].x - cp[0].x);
  bx = 3.0 * (cp[2 * inteval].x - cp[inteval].x) - cx;
  ax = cp[length - 1].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[inteval].y - cp[0].y);
  by = 3.0 * (cp[2 * inteval].y - cp[inteval].y) - cy;
  ay = cp[length - 1].y - cp[0].y - cy - by;
  /*計算位於參數值t的曲線點*/
  tSquared = t * t;
  tCubed = tSquared * t;
  result.x = ax * tCubed + bx * tSquared + cx * t + cp[0].x;
  result.y = ay * tCubed + by * tSquared + cy * t + cp[0].y;
  return result;
};

export { cartesian3toLonAndLat, PointOnCubicBezier, ComputeBezier };
