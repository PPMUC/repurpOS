<template>
  <div>
    <TopBar v-if="showTopBar"></TopBar>
    <router-view />
    <BottomBar></BottomBar>
  </div>
</template>

<style lang="scss">
  @import './assets/css/app.scss';
  @import "../node_modules/uikit/dist/css/uikit.css";

  body {
    overflow: hidden;
  }
</style>

<script>
  // @ is an alias to /src
  import BottomBar from "@/components/BottomBar.vue";
  import TopBar from "@/components/TopBar.vue";
  export default {
    name: "Home",
    components: {
      BottomBar,
      TopBar
    },
    data: function () {
      return {};
    },
    computed: {
      showTopBar() {
        let currentRoute = this.$router.currentRoute.value.name;
        if (currentRoute === "Run" ||
          currentRoute === "Stop") {
          return true;
        }
        return false;
      }
    }
  };
</script>