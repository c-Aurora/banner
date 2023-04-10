<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
@import "../static/css/reset.css";
@import "../static/css/main.css";

/* 想改变进度条的颜色，可以进入App.vue里，在style中加上下面这样几行代码即可。 */
/* #nprogress .bar {
    background: blue !important;
} */
</style>
