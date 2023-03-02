/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-02 14:24:09
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-02 16:49:52
 * @FilePath: \vite-cesium-mapbox\src\utils\cesium-draw\cardinalLine.ts
 * @Description: cardinal线
 */
import {
  Viewer,
  Entity,
  Color,
  Math as CesiumMath,
  Cartesian2,
  Cartesian3,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  ConstantProperty,
} from "cesium";
import { Option } from "./arguments";

class CardinalLine {
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
    this.dotlist = [];
    const handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
    let isMove = false;
    // 左键点击
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      this.dotlist?.push(e.position.clone());
      isMove = true;
    }, ScreenSpaceEventType.LEFT_CLICK);
    // 鼠标移动
    handler.setInputAction((e: ScreenSpaceEventHandler.MotionEvent) => {
      if (isMove) {
        const arr = [...this.dotlist!, e.endPosition];
        this.plotingCardinalLine(arr);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    // 右键点击
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      isMove = false;
      this.dotlist?.push(e.position.clone());
      handler.destroy();
      const end = this.getValue();
      console.log(61, end);
    }, ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 获取数据
  getValue() {
    return this.dotlist;
  }

  plotingCardinalLine(dotlist: Cartesian2[]) {
    const n = dotlist.length;
    let window_points = this._CubicSpline(n, dotlist);
    let GeoPoints = this._createGeoPoints(window_points);
    if (this.entities) {
      this.path?.setValue(Cartesian3.fromDegreesArray(GeoPoints));
    } else {
      this.path = new ConstantProperty(Cartesian3.fromDegreesArray(GeoPoints));
      this.entities = this.viewer.entities.add({
        name: "CardinalArrow",
        polyline: {
          positions: this.path,
          width: 5,
          material: Color.RED,
        },
      });
    }
  }

  _CubicSpline(
    n: number,
    Anchorpoints: Cartesian2[],
    grain = 1024,
    tension = 0.5
  ): Cartesian2[] {
    let alpha = new Array(50);
    let jd = [];
    let k =
      (Anchorpoints[1].y - Anchorpoints[0].y) /
      (Anchorpoints[1].x - Anchorpoints[0].x);
    jd.push({ x: Anchorpoints[0].x - 100, y: Anchorpoints[0].y - k * 100 });
    for (let i = 0; i < Anchorpoints.length; i++) {
      jd.push({ x: Anchorpoints[i].x, y: Anchorpoints[i].y });
    }
    k =
      (Anchorpoints[n - 1].y - Anchorpoints[n - 2].y) /
      (Anchorpoints[n - 1].x - Anchorpoints[n - 2].x);
    jd.push({
      x: Anchorpoints[n - 1].x + 100,
      y: Anchorpoints[n - 1].y + k * 100,
    });
    let k0, kml, k1, k2;
    //获取Mc矩阵
    let spline = new Array(1024);
    let t = tension;
    //对每两个关键点之间的插值点进行参数化到0～1之间
    for (let k = 0; k < grain; k++) {
      alpha[k] = (k * 1.0) / grain;
    }
    //从最开始的四个点开始，给第一段曲线插值
    kml = 0;
    k0 = 1;
    k1 = 2;
    k2 = 3;
    let s = 0; //纪录总共插值后的点数
    //两次循环第一次对输入的控制点遍历，第二次对每两个控制点之间插值，分别计算xy分量上得出的插值后的函数值，k值分别＋1
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < grain; j++) {
        let cpx = this._Matrix(
          jd[kml].x,
          jd[k0].x,
          jd[k1].x,
          jd[k2].x,
          alpha[j],
          t
        );
        let cpy = this._Matrix(
          jd[kml].y,
          jd[k0].y,
          jd[k1].y,
          jd[k2].y,
          alpha[j],
          t
        );
        spline[s] = { x: cpx, y: cpy };
        s++;
      }
      kml++;
      k0++;
      k1++;
      k2++;
    }
    return spline;
  }

  _Matrix(
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    u: number,
    tension: number
  ) {
    let m = this._GetCardinalMatrix(tension);
    let a, b, c, d;
    a = m[0] * p0 + m[1] * p1 + m[2] * p2 + m[3] * p3;
    b = m[4] * p0 + m[5] * p1 + m[6] * p2 + m[7] * p3;
    c = m[8] * p0 + m[9] * p1 + m[10] * p2 + m[11] * p3;
    d = m[12] * p0 + m[13] * p1 + m[14] * p2 + m[15] * p3;
    return d + u * (c + u * (b + u * a)); //au^3+bu^2+cu+d
  }

  _GetCardinalMatrix(a1: number) {
    let m = new Array(16);
    m[0] = -a1;
    m[1] = 2.0 - a1;
    m[2] = a1 - 2;
    m[3] = a1;
    m[4] = 2 * a1;
    m[5] = a1 - 3;
    m[8] = -a1;
    m[9] = 0;
    m[12] = 0;
    m[13] = 1;
    m[6] = 3 - 2 * a1;
    m[7] = -a1;
    m[10] = a1;
    m[11] = 0;
    m[14] = 0;
    m[15] = 0;
    return m;
  }

  _createGeoPoints(window_points: Cartesian2[]) {
    let points = [];
    for (let i = 0; i < window_points.length; i++) {
      let ellipsoid = this.viewer.scene.globe.ellipsoid;
      let temp_cartesian = this.viewer.camera.pickEllipsoid(
        window_points[i],
        ellipsoid
      );
      let cartographic = ellipsoid.cartesianToCartographic(temp_cartesian!);
      let lng = CesiumMath.toDegrees(cartographic.longitude);
      let lat = CesiumMath.toDegrees(cartographic.latitude);
      points.push(lng);
      points.push(lat);
    }
    return points;
  }
}

export default CardinalLine;
