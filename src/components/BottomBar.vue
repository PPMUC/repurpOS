<template>
  <div  uk-grid>
    <div id="leftBottomBar" class="uk-width-1-2 uk-text-left">
        <router-link id="status-bar-item" to="/">
          <i class="fa fa-home"></i>  
        </router-link>

        <router-link id="status-bar-item" to="/profile">
          <i class="fa fa-line-chart"></i>  
        </router-link>
    
        <router-link id="status-bar-item" to="/">
          <span>Current Status</span>
        </router-link>
    </div>
    <div id="rightBottomBar" class="uk-width-1-2 uk-text-right">
        <router-link id="status-bar-item" to="/">
          <span>Other vital info</span>
        </router-link>

        <router-link id="status-bar-item" to="/shortcuts">
          <i class="fa fa-wrench"></i>  
        </router-link>

        <router-link id="status-bar-item" to="/settings">
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
  line-height: 1.5;
  padding-left: 10px;
  color: white;
}
 #rightBottomBar{
  position: fixed;
  right: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  line-height: 1.5;
  padding-right: 10px;
  color: white;
}
 #status-bar-item{
   padding-top:3px;
   padding-bottom:4px;
   padding-right: 10px;
   padding-left: 10px;
   text-decoration: none;
   color: white;
   background: variables.$darkPPMColour;
 }

 #status-bar-item:hover{
   color: white;
   background: variables.$darkPPMColourHover;
 }

</style>