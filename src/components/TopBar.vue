<template>
  <div class="uk-section uk-section-secondary uk-padding-remove">
    <div
      class="uk-flex uk-padding-small uk-grid-column-small uk-grid-row-small"
      uk-grid
    >
      <div class="uk-width-1-2">
        <div class="uk-flex">
          <button
            @click="stopSheetPress"
            v-if="isRunning"
            class="
              uk-button uk-button-large uk-button-danger uk-width-1-2
              button-padding
              stop-button
            "
          >
            <span class="uk-text">Stop Sheet press</span>
          </button>
          <button
            @click="pauseSheetPress"
            v-if="isRunning && !isPaused"
            class="
              uk-button uk-button-large uk-button-danger uk-width-expand
              button-padding
            "
          >
            <span class="uk-text">Pause Sheet press</span>
          </button>
          <button
            @click="startSheetPress"
            v-if="isRunning && isPaused"
            class="
              uk-button uk-button-large uk-button-danger uk-width-expand
              button-padding
            "
          >
            <span class="uk-text">Unpause Sheet press</span>
          </button>
        </div>
        <button
          v-if="!isRunning"
          @click="startSheetPress"
          class="
            uk-button uk-button-large uk-button-primary uk-width-1-1
            button-padding
          "
        >
          <span class="uk-text">Start Sheet press</span>
        </button>
      </div>

      <div class="uk-width-1-4">
        <router-link to="/Profile">
          <button
            class="
              uk-button uk-button-large uk-button-default uk-width-1-1
              button-padding
            "
          >
            <span class="uk-text uk-width-1-1">Adjust Profile</span>
          </button>
        </router-link>
      </div>

      <div class="uk-width-1-4">
        <div class="uk-width-expand">
          <button
            class="
              uk-button uk-button-large uk-button-default uk-width-1-1
              button-padding
            "
            type="button"
          >
            More <span uk-icon="icon:  triangle-down"></span>
          </button>
          <div
            id="MainDrop"
            uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;"
          >
            <ul class="uk-nav uk-dropdown-nav uk-text-emphasis">
              <li>
                <router-link to="/Settings" class=""> Settings </router-link>
              </li>
              <li class="uk-nav-header">Header</li>
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
              <li class="uk-nav-divider"></li>
              <li class="uk-active"><a href="#">Active</a></li>
              <li>
                <router-link to="/first-time" class=""
                  >First Time Setup</router-link
                >
              </li>
              <li>
                <router-link to="/shortcuts" class="">Shortcuts</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "Home",
    components: {},
    data: function () {
      return {};
    },
    computed: {
      isRunning() {
        return this.$store.state.machine.isRunning;
      },
      isPaused() {
        return this.$store.state.machine.isPaused;
      }
    },
    methods: {
      startSheetPress() {
        this.$store.dispatch("machine/attemptToStartMachine");
      },
      stopSheetPress() {
        this.$store.dispatch("machine/attemptToStopMachine");
      },
      pauseSheetPress() {
        this.$store.dispatch("machine/attemptToPauseMachine");
      }
    }
  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";
  a {
    margin: 0;
    padding: 0;
  }
  #MainDrop {
    background-color: variables.$darkPPMColour;
  }
  .button-padding {
    padding: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .stop-button {
    border-right-color: #fff;
    border-right-width: 1px;
  }
</style>
