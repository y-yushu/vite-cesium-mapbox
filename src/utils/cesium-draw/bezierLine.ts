/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-02 16:17:54
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-02 17:25:55
 * @FilePath: \vite-cesium-mapbox\src\utils\cesium-draw\bezierLine.ts
 * @Description: 绘制Bezier曲线
 */
import {
  Viewer,
  Color,
  Math as CesiumMath,
  Cartesian2,
  Cartesian3,
  Entity,
  ConstantProperty,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
} from "cesium";
import { Cartesian3_to_WGS84, WGS84_to_Cartesian3, WGS84 } from "./utils";
import { Option } from "./arguments";

interface Dot {
  x: number;
  y: number;
}

class BezierLine {
  constructor(option: Option) {
    this.viewer = option.viewer;
  }

  // 容器
  viewer: Viewer;
  // 点集合
  dotlist?: Cartesian2[];
  // 图形
  entities?: Entity;
  // 路径参数
  path?: ConstantProperty;

  // 开始绘制
  startCreate() {
    let dotlist: Dot[] = [];
    let isMove = false;
    const handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
    // 左键点击
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      console.log(11, e.position);
      const posi = this.viewer.scene.camera.pickEllipsoid(
        e.position,
        this.viewer.scene.globe.ellipsoid
      );
      const wgs = Cartesian3_to_WGS84(posi!);
      dotlist.push({
        x: wgs.latitude,
        y: wgs.longitude,
      });
      isMove = true;
    }, ScreenSpaceEventType.LEFT_CLICK);
    // 鼠标移动
    handler.setInputAction((e: ScreenSpaceEventHandler.MotionEvent) => {
      if (isMove) {
        console.log(22, e.endPosition);
        const posi = this.viewer.scene.camera.pickEllipsoid(
          e.endPosition,
          this.viewer.scene.globe.ellipsoid
        );
        const wgs = Cartesian3_to_WGS84(posi!);
        const arr: Dot[] = [
          ...dotlist,
          {
            x: wgs.latitude,
            y: wgs.longitude,
          },
        ];
        this.plotingBezierLine(arr);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    // 右键点击
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      console.log(33, e.position);
      handler.destroy();
    }, ScreenSpaceEventType.RIGHT_CLICK);
  }

  plotingBezierLine(anchorpoints: Dot[]) {
    const window_points = this._createBezierPoints(anchorpoints);
    const GeoPoints = this._createGeoPoints(window_points);
    console.log(91, GeoPoints);
    if (this.entities) {
      this.path?.setValue(GeoPoints);
    } else {
      console.log(87, GeoPoints);
      this.path = new ConstantProperty(GeoPoints);
      this.entities = this.viewer.entities.add({
        name: "BezierArrow",
        polyline: {
          positions: this.path,
          width: 5,
          material: Color.RED,
        },
      });
    }
  }

  _createBezierPoints(anchorpoints: Dot[], numpoints = 100) {
    let points = [];
    for (let i = 0; i <= numpoints; i++) {
      let point = this._computeBezierPoints(anchorpoints, i / numpoints);
      points.push(point);
    }
    return points;
  }

  _computeBezierPoints(anchorpoints: Dot[], t: number) {
    let x = 0,
      y = 0,
      z = 0;
    let Binomial_coefficient = this._computeBinomial(anchorpoints);
    for (let j = 0; j < anchorpoints.length; j++) {
      let tempPoint = anchorpoints[j];
      x +=
        tempPoint.x *
        Math.pow(1 - t, anchorpoints.length - 1 - j) *
        Math.pow(t, j) *
        Binomial_coefficient[j];
      y +=
        tempPoint.y *
        Math.pow(1 - t, anchorpoints.length - 1 - j) *
        Math.pow(t, j) *
        Binomial_coefficient[j];
    }
    return { x: x, y: y };
  }

  _computeBinomial(anchorpoints: Dot[]) {
    let lens = anchorpoints.length;
    let Binomial_coefficient = [];
    Binomial_coefficient.push(1);
    for (let k = 1; k < lens - 1; k++) {
      let cs = 1,
        bcs = 1;
      for (let m = 0; m < k; m++) {
        cs = cs * (lens - 1 - m);
        bcs = bcs * (k - m);
      }
      Binomial_coefficient.push(cs / bcs);
    }
    Binomial_coefficient.push(1);
    return Binomial_coefficient;
  }

  _createGeoPoints(window_points: Dot[]): Cartesian3[] {
    let points = [];
    for (let i = 0; i < window_points.length; i++) {
      //   let ellipsoid = this.viewer.scene.globe.ellipsoid;
      //   const can2 = new Cartesian2(window_points[i].x, window_points[i].y);
      //   let temp_cartesian = this.viewer.camera.pickEllipsoid(can2, ellipsoid);
      //   let cartographic = ellipsoid.cartesianToCartographic(temp_cartesian!);
      //   let lng = CesiumMath.toDegrees(cartographic.longitude);
      //   let lat = CesiumMath.toDegrees(cartographic.latitude);
      //   points.push(lng);
      //   points.push(lat);
      const cart = WGS84_to_Cartesian3({
        longitude: window_points[i].x,
        latitude: window_points[i].y,
        height: 10,
      });
      points.push(cart);
    }
    return points;
  }
}

export default BezierLine;
