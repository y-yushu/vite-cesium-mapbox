/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-02 16:57:18
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-02 17:13:05
 * @FilePath: \vite-cesium-mapbox\src\utils\cesium-draw\utils.ts
 * @Description: 公共方法
 */

import { Cartesian3, Cartographic, Math as CesiumMath } from "cesium";

// 经纬度
interface WGS84 {
  longitude: number;
  latitude: number;
  height: number;
}

/**
 * 笛卡尔坐标系转经纬度
 * @param {Cartesian3} cartesian 笛卡尔坐标系
 * @returns 经纬度
 */
const Cartesian3_to_WGS84 = (cartesian: Cartesian3): WGS84 => {
  const degrees = Cartographic.fromCartesian(cartesian);
  return {
    longitude: CesiumMath.toDegrees(degrees.longitude),
    latitude: CesiumMath.toDegrees(degrees.latitude),
    height: degrees.height,
  };
};

/**
 * 经纬度转笛卡尔坐标系
 * @param {WGS84} degress 经纬度
 * @returns 笛卡尔坐标系
 */
const WGS84_to_Cartesian3 = (degress: WGS84): Cartesian3 => {
  const cart = Cartesian3.fromDegrees(
    degress.longitude,
    degress.longitude,
    degress.height
  );
  return cart;
};

export { Cartesian3_to_WGS84, WGS84_to_Cartesian3 };

export type { WGS84 };
