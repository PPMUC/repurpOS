<template>
  <div class="uk-grid-column-small uk-grid-row-small uk-preserve-height uk-preserve-width uk-child-width-1-4@s uk-padding-small" uk-grid>
    <div id="leftBottomBar" class="uk-width-1-2 uk-text-left">
        <router-link id="item-padding" to="/home" class="override-colours">
          <i class="fa fa-home"></i>  
        </router-link>

        <router-link id="item-padding" to="/profile" class="override-colours">
          <i class="fa fa-line-chart"></i>  
        </router-link>
    
        <span id="item-padding">Current Status</span>
    </div>
    <div id="rightBottomBar" class="uk-width-1-2 uk-text-right">
        <span id="item-padding">Other vital info</span>

        <router-link id="item-padding" to="/shortcuts" class="override-colours">
          <i class="fa fa-wrench"></i>  
        </router-link>

        <router-link id="item-padding" to="/settings" class="override-colours">
          <i class="fa fa-gear"></i>  
        </router-link>
    </div>
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

 #leftBottomBar{
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  color: white;
}
 #rightBottomBar{
  position: fixed;
  right: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  color: white;
  padding-right: 10px;
}
 #item-padding{
   padding-right: 10px;
   padding-left: 10px;
 }

 .override-colours{
   color: white;
 }
 .override-colours:hover{
   color: lightgrey;
 }
</style>