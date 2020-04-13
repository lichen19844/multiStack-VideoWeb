<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {

}
</script>

<style>
body {
  margin: 0;
}
.avue-upload--list .el-upload {
  width: 100%;
  height: auto;
}
.avue-upload__avatar {
  width: 80% !important;
  height: auto !important;
  background-color: rgba(255, 0, 0, 0.1);
}
</style>
