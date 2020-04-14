<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  async getavueimg() {
    const that = this;
    that.$nextTick(function() {
      const imgNodes = document.querySelectorAll(".avue-img");
      for (var i = 0; i < imgNodes.length; i++) {
        imgNodes[i].id = "imgId";
        if (imgNodes[i].getAttribute("id") == "imgId") {
          // 对满足条件的标签设置属性即可
          // qsa[i].style.backgroundColor = "blue";
          // imgNodes[i].style.backgroundImage = `url(${require("./assets/video.png")})`;
          imgNodes[i].style.backgroundImage = `url(http://multistack-videoweb.oss-cn-hongkong.aliyuncs.com/4fa578b180c78401a8eec45dc8a6f006.png)`;
          imgNodes[i].style.backgroundSize = "cover";
          imgNodes[i].style.backgroundRepeat = "no-repeat";
        }
      }
    });
  }

  mounted() {
    setTimeout(() => {
      this.getavueimg();
    }, 400);
  }
  updated() {
    setTimeout(() => {
      this.getavueimg();
    }, 100);
  }
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
