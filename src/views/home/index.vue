<!--
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 22:22:57
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-02-28 18:12:46
 * @FilePath: \vite\vite-cesium-mapbox\src\views\home\index.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { onMounted } from "vue";
import {
  Viewer,
  Color,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
} from "cesium";
// 组件
import FloatLeftTop from "@/components/float-left-top/float-left-top.vue";

onMounted(() => {
  const viewer = new Viewer("box", {});
  let ismove = false;
  // 增加鼠标左键点击事件
  let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  const leftClick = (e: ScreenSpaceEventHandler.PositionedEvent) => {
    if (!ismove) {
      const posi = viewer.scene.camera.pickEllipsoid(
        e.position,
        viewer.scene.globe.ellipsoid
      );
      console.log(31, posi);
      ismove = true;
      viewer.entities.add({
        position: posi,
        point: {
          pixelSize: 5,
          color: Color.WHITE,
          outlineColor: Color.fromCssColorString("#fff"),
          outlineWidth: 2,
          show: true,
        },
      });
    } else {
      ismove = false;
    }
  };
  handler.setInputAction(leftClick, ScreenSpaceEventType.LEFT_CLICK);
  // 鼠标移动方法
  handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
    // if (ismove) {
    //   console.log(e);
    // }
  }, ScreenSpaceEventType.MOUSE_MOVE);
});
</script>

<template>
  <div id="box" class="home"></div>
  <FloatLeftTop />
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  background-color: aqua;
}
</style>

<style>
/* .cesium-viewer-bottom {
  display: none;
} */
</style>
