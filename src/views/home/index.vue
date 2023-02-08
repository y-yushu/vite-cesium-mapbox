<!--
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 22:22:57
 * @LastEditors: yyshu 2671255784@qq.com
 * @LastEditTime: 2023-02-08 22:59:32
 * @FilePath: \vite\vite-cesium-mapbox\src\views\home\index.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Viewer, ScreenSpaceEventHandler, ScreenSpaceEventType } from "cesium";

onMounted(() => {
  const viewer = new Viewer("box", {});
  // 增加鼠标左键点击事件
  let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
    console.log("触发左键点击", e);
  }, ScreenSpaceEventType.LEFT_CLICK);
});
</script>

<template>
  <div id="box" class="home"></div>
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  background-color: aqua;
}
</style>

<style>
.cesium-viewer-bottom {
  display: none;
}
</style>
