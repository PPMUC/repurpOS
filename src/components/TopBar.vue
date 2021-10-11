<template>
  <div class="uk-section uk-section-secondary uk-padding-remove">
    <div class="uk-flex uk-padding-small uk-margin-remove" uk-grid>
      <button v-if="isRunning" class="uk-button uk-button-large uk-button-danger uk-width-1-2"><span class="uk-text"
          @click="stopSheetPress">Stop
          Sheet press</span></button>
      <button v-if="!isRunning" @click="startSheetPress"
        class="uk-button uk-button-large uk-button-primary uk-width-1-2"><span class="uk-text">Start
          Sheet press</span></button>
      <router-link to="/Profile" class="uk-margin-left uk-margin-right  uk-padding-remove">
        <button class="uk-button uk-button-large uk-button-default "><span
            class="uk-text">Adjust Profile</span></button>
      </router-link>
      <div class="uk-inline uk-width-expand uk-margin-remove uk-padding-remove">
        <button class="uk-button uk-button-default uk-height-1-1 uk-width-1-1" type="button">More <span
            uk-icon="icon:  triangle-down"></span></button>
        <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
          <ul class="uk-nav uk-dropdown-nav">
            <li class="uk-active"><a href="#">Active</a></li>
            <li><a href="#">Item</a></li>
            <li class="uk-nav-header">Header</li>
            <li><a href="#">Item</a></li>
            <li><a href="#">Item</a></li>
            <li class="uk-nav-divider"></li>
            <li><a href="#">Item</a></li>
          </ul>
        </div>
      </div>
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
    },
    computed: {
      isRunning() {
        return this.$store.state.machine.isRunning;
      }
    },
    methods: {
      startSheetPress() {
        this.$store.dispatch('machine/attemptToStartMachine');
      },
      stopSheetPress() {
        this.$store.dispatch('machine/attemptToStopMachine');
      }
    }

  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";
  a{
    margin: 0;
    padding: 0;
  }
</style>