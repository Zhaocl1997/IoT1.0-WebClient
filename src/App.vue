<template>
  <div id="app">
    <headerbar />
    <router-view v-if="isRouterAlive"></router-view>
    <footerbar />
  </div>
</template>

<script>
import headerbar from "./components/headerbar";
import footerbar from "./components/footerbar";

export default {
  name: "app",
  components: {
    headerbar,
    footerbar
  },
  provide() {
    return {
      // 提供刷新
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0px;
  padding: 0px;
}

#app {
  text-align: center;
  height: 100%;
  width: 100%;
}
</style>