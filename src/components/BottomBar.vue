<template>
  <div id="outerBottomBar" class="uk-width-1-1 uk-padding-right uk-text-right">
      Current Status
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "Home",
    components: {
    },
    data: function () {
      return {};
    }
  };
</script>

<style lang="scss" scoped>

@use "../assets/css/variables";

 #outerBottomBar{
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  color: white;
}
</style>