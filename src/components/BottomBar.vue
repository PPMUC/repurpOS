<template>
  <div uk-grid>
    <div id="leftBottomBar" class="uk-width-1-3 uk-text-left">
      <router-link id="status-bar-item" to="/">
        <i class="fa fa-home"></i>
      </router-link>

      <router-link id="status-bar-item" to="/profile">
        <i class="fa fa-line-chart"></i>
      </router-link>

      <router-link id="status-bar-item" to="/">
        <span v-text="statusOptions[checkStatus]"></span>
      </router-link>
    </div>
    
    <div id = "middleBottomBar" class="uk-width-1-2">
         <p>{{timeStamp }}</p>
    </div>

    <div id="rightBottomBar" class="uk-width-1-3 uk-text-right">
      <router-link id="status-bar-item" to="/">
        <span v-text="checkUpdate"></span>
      </router-link>
      
      <router-link id="status-bar-item" to="/shortcuts">
        <i class="fa fa-th-large"></i>
      </router-link>

      <router-link id="status-bar-item" to="/settings">
        <i class="fa fa-gear"></i>
      </router-link>
    </div>
  </div>
</template>


<script>
import { objectTypeSpreadProperty } from '@babel/types';

// @ is an alias to /src
const date = new Date(); //date function 

export default {
  name: "Home",
  components: {},
  computed: {
    checkStatus() {
      if (this.$store.state.machine.isRunning) {
        return "on";
      } else {
        return "off";
      }
    },
    checkUpdate() {
      // return `Plate Distance: ${this.$store.state.machine.plateDistance} mm`;
      return "Plate Distance Placeholder"; // placeholder until distance info is implemented
    }
  },

  data: function () {
    return {
      timeStamp: "",
      statusOptions: {
        // h: 'Sheet Press Heating ...',
        on: "Sheet Press Running!",
        off: "Sheet Press Stopped.",
      }
    };
  },

   created() {
      setInterval(this.getNow, 1000);
            },
  methods:{
    getNow() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date + '   '+ time
      this.timeStamp = dateTime;
   
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/css/variables";

#leftBottomBar {
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  line-height: 2; //changed to 2 to make it bigger - makes overall left bar bigger
  padding-left: 10px;
  color: white;
}

#middleBottomBar {
  position: absolute;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  line-height: 2; //changed to 2 to make it bigger - makes overall left bar bigger
  color: white;
  left: 280px;
  padding-right: 100px;
}

#rightBottomBar {
  position: fixed;
  right: 0px;
  bottom: 0px;
  background-color: variables.$darkPPMColour;
  line-height: 2; //changed to 2 to make it bigger - makes overall right bar bigger
  padding-right: 10px;
  color: white;
}
#status-bar-item {
  //can change to fit / align to make bigger
  padding-top: 3px;
  padding-bottom: 4px;
  padding-right: 10px;
  padding-left: 7px;
  text-decoration: none;
  color: white;
  background: variables.$darkPPMColour;
}

#status-bar-item:hover {
  color: white;
  background: variables.$darkPPMColourHover;
}
</style>
