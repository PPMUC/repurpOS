<template>
  <div id="overallBackground" class="{fadeout: !isLoaded}" v-if="!isloaded">
    <div id="logo">
      <img class="pulseTime" src="@/assets/Precious_Plastic_Logo.png" />
    </div>
  </div>
</template>

<script>
/* import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
}) */
export default {
  data: () => {
    return {
      isloaded: false,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        setTimeout(() => {
          this.isloaded = true;
        }, 1700);
      }
    };
  },
  name: "Home",
  props: ["isLoading"],
};
</script>

<style lang="scss" scoped>
@use "../assets/css/variables";

#overallBackground {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: variables.$darkPPMColourHover;
  z-index: 999;
}

#logo {
  position: fixed;
  background: variables.$darkPPMColourHover;
  height: 425px;
  width: 425px;
}

img {
  max-height: 100%;
  max-width: 100%;
}

.pulseTime {
  animation: pulse 1.7s linear infinite;
}

@keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(0.9);
    transform: scale(1);
  }
}

@keyframes fadeout {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  /*to {
    opacity: 0;
    visibility: hidden;
  }*/
}
</style>
