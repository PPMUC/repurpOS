<template>
  <div
    class="uk-section uk-section-muted uk-padding-remove uk-margin-remove"
    uk-height-viewport="offset-top: true"
  >
    <div
      class="
        uk-flex
        uk-padding-small
        uk-margin-remove-left
        uk-margin-remove-horizontal
        uk-margin-top
      "
      uk-grid
    >
      <!-- TOP AND BOTTOM PLATE TEMPERATURES -->
      <div class="uk-flex uk-margin-remove uk-padding-remove uk-width-1-1">
        <NumDisplay
          class="uk-width-1-1"
          v-for="tcon in temperatureControllers"
          :key="tcon.name"
          :num="tcon.current"
          :unit="'&deg;C'"
          :name="tcon.name"
          :isBig="true"
          :setpoint="tcon.setpoint"
          @click="displayInput()"
        >
        </NumDisplay>
      </div>
      <!-- INPUTS FOR MANUAL OVERRIDES -->
      <div
        v-if="display"
        class="uk-flex uk-padding-remove uk-width-1-1"
        uk-grid
      >
        <div
          v-for="tcon in temperatureControllers"
          :key="tcon.name"
          class="uk-width-1-2"
        >
          <div>
            <input
              class="uk-input"
              id="tcon.name"
              type="text"
              v-model="value"
              :placeholder="tcon.setpoint"
            />
          </div>
          <button
            @click="override(tcon.name, value)"
            class="uk-button uk-button-default uk-width-1-1 overrideButton"
          >
            <span class="uk-text">Override</span>
          </button>
          <div>
            <vue-touch-keyboard
              :options="options"
              v-if="display"
              :layout="layout"
              :cancel="null"
              :accept="null"
              :input="tcon.name"
            />
          </div>
        </div>
        <span v-if="warning"
          >Setpoint must be between {{ HEATING_ZONES[0].limits[0] }} and
          {{ HEATING_ZONES[0].limits[1] }} degrees</span
        >
      </div>
      <!-- HOOD AND FRAME TEMPERATURES -->
      <div class="uk-flex uk-padding-remove uk-width-1-1" uk-grid>
        <div v-for="num in smallSensors" :key="num.name" class="uk-width-1-2">
          <NumDisplay
            :key="num.name"
            :num="num.current"
            :unit="OPTIONAL_SENSOR_INFO[num.name].units"
            :name="num.name"
          >
          </NumDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NumDisplay from "@/components/NumDisplay";
import * as machineVariables from "@/controller/machine_info";
import { mapGetters } from "vuex";
import VueTouchKeyboard from "@/assets/vue-touch-keyboard";

export default {
  name: "StatusNumbers",
  components: {
    NumDisplay,
    "vue-touch-keyboard": VueTouchKeyboard.component
  },
  data: function () {
    return {
      OPTIONAL_SENSOR_INFO: machineVariables.OPTIONAL_SENSOR_INFO,
      display: false,
      warning: false,
      HEATING_ZONES: machineVariables.HEATING_ZONES,
      layout: "numeric",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      optionalSensors: "machine/optionalSensors",
      temperatureControllers: "machine/temperatureControllers",
    }),
    smallSensors() {
      return this.optionalSensors;
    }
  },
  methods: {
    override(name, value) {
      console.log(`override setpoint of ${name}`);
      // if input is within limits
      if (
        value >= machineVariables.HEATING_ZONES[0].limits[0] &&
        value <= machineVariables.HEATING_ZONES[0].limits[1]
      ) {
        switch (name) {
          case "top plate":
            // update setpoint
            this.$store.state.machine.tempControllers[0].setpoint = value;
            // close input fields
            this.display = !this.display;
            // make sure warning is not displayed
            this.warning = false;
            return;

          case "bottom plate":
            this.$store.state.machine.tempControllers[1].setpoint = value;
            this.display = !this.display;
            this.warning = false;
            return;
        }
      } else {
        // display warning
        this.warning = !this.warning;
        return;
      }
    },

    displayInput() {
      this.display = !this.display;
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/variables";
.overrideButton {
  padding-left: 15%;
}
</style>
