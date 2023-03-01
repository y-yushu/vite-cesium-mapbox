<!--
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 22:22:57
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-01 18:38:11
 * @FilePath: \vite\vite-cesium-mapbox\src\views\home\index.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { onMounted } from "vue";
import VScaleScreen from "v-scale-screen"; // 适配组件
import { Viewer, Color, Cartesian3 } from "cesium";
import { ComputeBezier } from "@/utils/cesium-draw/public";

let viewer: Viewer | undefined;

setTimeout(() => {
  console.log(18);
  const mock = [
    {
      x: 116.411168,
      y: 39.924896,
    },
    {
      x: 117.321834,
      y: 40.94758,
    },
    {
      x: 118.191106,
      y: 40.783467,
    },
  ];
  const arr = ComputeBezier(mock);
  console.log(34, arr);
  const arr2: number[] = [];
  arr.forEach((e) => {
    arr2.push(e.x);
    arr2.push(e.y);
  });
  viewer?.entities.add({
    polyline: {
      //使用cesium的peoperty
      positions: Cartesian3.fromDegreesArray(arr2),
      show: true,
      material: Color.RED,
      width: 3,
      clampToGround: true,
    },
  });
}, 1000);

onMounted(() => {
  viewer = new Viewer("box", {});
  // let ismove = false;
  // // 增加鼠标左键点击事件
  // let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  // const leftClick = (e: ScreenSpaceEventHandler.PositionedEvent) => {
  //   const posi = viewer.scene.camera.pickEllipsoid(
  //     e.position,
  //     viewer.scene.globe.ellipsoid
  //   );
  //   if (posi) {
  //     console.log(2626);
  //     if (!ismove) {
  //       console.log(33, posi);
  //       ismove = true;
  //       viewer.entities.add({
  //         position: posi,
  //         point: {
  //           pixelSize: 5,
  //           color: Color.WHITE,
  //           outlineColor: Color.fromCssColorString("#fff"),
  //           outlineWidth: 2,
  //           show: true,
  //         },
  //       });
  //     } else {
  //       ismove = false;
  //       handler.destroy();
  //     }
  //   }
  // };
  // handler.setInputAction(leftClick, ScreenSpaceEventType.LEFT_CLICK);
  // // 鼠标移动方法
  // handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
  //   if (ismove) {
  //     console.log(e);
  //   }
  // }, ScreenSpaceEventType.MOUSE_MOVE);
});

/**
 * 判断viewer是否加载完成
 */
const viewerIsOK = () => {
  if (!viewer) throw new Error("viewer未加载完成");
};

/**
 * 添加圆
 */
const addEllipse = () => {
  viewerIsOK();
  const yuan = viewer?.entities.add({
    position: Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
    ellipse: {
      semiMinorAxis: 300000.0,
      semiMajorAxis: 300000.0,
      material: Color.GREEN,
    },
  });
  const position = yuan?.position;
  console.log(78, position);
  // viewer?.entities.add({
  //   position: position,
  //   polyline: {
  //     positions: position,
  //     width: 20, //线条粗细
  //     // followSurface: false, //取消弯曲
  //     material: Color.YELLOW, //线条材质
  //     clampToGround: true,
  //   },
  // });
};

// 点击测试
const test = () => {
  console.log("点击测试");
};
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <div class="page">
      <div class="page-left">
        <button @click="addEllipse()">添加圆形</button>
        <button @click="test()">测试</button>
      </div>
      <div class="page-center">
        <div id="box"></div>
      </div>
    </div>
  </v-scale-screen>
</template>

<style scoped lang="scss">
@import "@/assets/scss/themeify.scss";
.page {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: orange;
}
// 左侧操作栏
.page-left {
  width: 220px;
  @include themeify {
    background-color: themed("back-color-1");
  }
}
// 中间图表
.page-center {
  width: 100%;
  height: 100%;
  #box {
    height: 100%;
  }
}
</style>

<style>
/* .cesium-viewer-bottom {
  display: none;
} */
</style>
