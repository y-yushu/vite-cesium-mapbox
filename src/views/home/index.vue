<!--
 * @Author: yyshu 2671255784@qq.com
 * @Date: 2023-02-07 22:22:57
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-06 10:25:48
 * @FilePath: \vite\vite-cesium-mapbox\src\views\home\index.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { onMounted } from "vue";
import {
  Viewer,
  Color,
  Cartesian3,
  CallbackProperty,
  JulianDate,
  ScreenSpaceEventType,
} from "cesium";
import CardinalLine from "@/utils/cesium-draw/cardinalLine";
import BezierLine from "@/utils/cesium-draw/bezierLine";

let viewer: Viewer | undefined;

onMounted(() => {
  viewer = new Viewer("box", {});
  // 禁止默认左键事件
  viewer.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_CLICK
  );
  // viewer.imageryLayers.addImageryProvider()
  test();
});

/**
 * 添加线1
 */
const addEllipseC = () => {
  const cardinalLine = new CardinalLine({
    viewer: viewer!,
  });
  cardinalLine.startCreate();
};
/**
 * 添加线2
 */
const addEllipseB = () => {
  const bezierLine = new BezierLine({
    viewer: viewer!,
  });
  bezierLine.startCreate();
};

// 点击测试
const test = () => {
  console.log("开始测试");
  // 开始显示时间
  const s3 = JulianDate.fromDate(new Date("2023-03-06T10:00:00+08:00"));
  // 结束显示时间
  const e3 = JulianDate.fromDate(new Date("2023-03-06T15:00:00+08:00"));
  let isFlicker = false; // 是否闪烁过
  let flickerStr = false; // 闪烁中的状态
  const getShow = (time: JulianDate) => {
    if (JulianDate.lessThan(time, s3)) {
      // 情况1：未开始
      return false;
    } else {
      if (JulianDate.lessThan(time, e3)) {
        // 情况2：进行中
        // 准备闪烁状态
        if (!isFlicker) isFlicker = true;
        return true;
      } else {
        // 情况3：已结束
        // 开启闪烁状态
        if (isFlicker) {
          console.log("准备闪烁状态");
          isFlicker = false; // 关闭闪烁状态
          flickerStr = true; // 闪烁状态时，是否亮起的状态
          const interval = 300;
          // 闪烁i次
          const shan = (i: number) => {
            if (i >= 0) {
              console.log("倒数第" + i + "次闪烁");
              setTimeout(() => {
                flickerStr = true;
                setTimeout(() => {
                  flickerStr = false;
                  shan(i - 1);
                }, interval);
              }, interval);
            }
          };
          // 闪烁5次
          shan(3);
        }
        // 返回闪烁状态
        return flickerStr;
      }
    }
  };
  viewer?.entities.add({
    position: Cartesian3.fromDegrees(-85.02828, 43.351973, 10),
    point: {
      show: new CallbackProperty(getShow, false),
      pixelSize: 10,
      color: Color.RED,
    },
  });
};
</script>

<template>
  <div class="page">
    <div class="page-left">
      <button @click="addEllipseC()">添加线C</button>
      <button @click="addEllipseB()">添加线B</button>
      <button @click="test()">测试</button>
    </div>
    <div class="page-center">
      <div id="box"></div>
    </div>
  </div>
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
    width: 100%;
    height: 100%;
  }
}
</style>

<style>
/* .cesium-viewer-bottom {
  display: none;
} */
</style>
