<template>
  <div>
    <TopBar v-if="showTopBar"></TopBar>
    <router-view />
    <BottomBar></BottomBar>
  </div>
</template>

<style lang="scss">
  @import "./assets/css/app.scss";
  @import "../node_modules/uikit/dist/css/uikit.css";

  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

  body {
    overflow: hidden;
  }
</style>

<script>
  // @ is an alias to /src
  import BottomBar from "@/components/BottomBar.vue";
  import TopBar from "@/components/TopBar.vue";

  import * as GUI from "@/controller/GUI";

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
        for (let allowedPage of GUI.SHOW_TOP_BAR_PAGES)
          if (currentRoute === allowedPage) {
            return true;
          }
        return false;
      }
    }
  };
</script>
