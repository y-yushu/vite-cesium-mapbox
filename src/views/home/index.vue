<!--
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 22:22:57
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-02 17:45:08
 * @FilePath: \vite\vite-cesium-mapbox\src\views\home\index.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { onMounted } from "vue";
import VScaleScreen from "v-scale-screen"; // 适配组件
import {
  Viewer,
  Color,
  createWorldTerrain,
  ArcGisMapServerImageryProvider,
  CesiumTerrainProvider,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
} from "cesium";
import CardinalLine from "@/utils/cesium-draw/cardinalLine";
import BezierLine from "@/utils/cesium-draw/bezierLine";

let viewer: Viewer | undefined;

onMounted(() => {
  viewer = new Viewer("box", {
    animation: true,
    skyBox: false,
    skyAtmosphere: false,
    baseLayerPicker: false,
    // terrainProvider: createWorldTerrain(),
    infoBox: false,
    selectionIndicator: false,
    shouldAnimate: true,
    terrainProvider: new CesiumTerrainProvider({
      url: "http://data.marsgis.cn/terrain",
    }),
  });
  let ismove = false;
  // 增加鼠标左键点击事件
  if (viewer) {
    let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      const posi = viewer!.scene.camera.pickEllipsoid(
        e.position.clone(),
        viewer!.scene.globe.ellipsoid
      );
      // const posi = viewer?.scene.pickPosition(e.position);
      console.log(45, posi);
      viewer!.entities.add({
        position: posi,
        point: {
          pixelSize: 5,
          color: Color.WHITE,
          outlineColor: Color.fromCssColorString("#fff"),
          outlineWidth: 2,
          show: true,
        },
      });
      // if (posi) {
      //   if (!ismove) {
      //     ismove = true;
      //     viewer!.entities.add({
      //       position: posi,
      //       point: {
      //         pixelSize: 5,
      //         color: Color.WHITE,
      //         outlineColor: Color.fromCssColorString("#fff"),
      //         outlineWidth: 2,
      //         show: true,
      //       },
      //     });
      //   } else {
      //     ismove = false;
      //     handler.destroy();
      //   }
      // }
    }, ScreenSpaceEventType.LEFT_CLICK);
    // 鼠标移动方法
    handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      if (ismove) {
        console.log(e);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
  }
});

/**
 * 添加线1
 */
const addEllipse1 = () => {
  const cardinalLine = new CardinalLine({
    viewer: viewer!,
  });
  cardinalLine.startCreate();
};
/**
 * 添加线2
 */
const addEllipse2 = () => {
  const bezierLine = new BezierLine({
    viewer: viewer!,
  });
  bezierLine.startCreate();
};

// 点击测试
const test = () => {
  console.log("点击测试");
  const posi = Cartesian3.fromDegrees(121.987848, 30.897286);
  viewer!.entities.add({
    position: posi,
    point: {
      pixelSize: 5,
      color: Color.WHITE,
      outlineColor: Color.fromCssColorString("#fff"),
      outlineWidth: 2,
      show: true,
    },
  });
};
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <div class="page">
      <div class="page-left">
        <button @click="addEllipse1()">添加线1</button>
        <button @click="addEllipse2()">添加线2</button>
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
