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
          v-for="(tcon, index) in temperatureControllers"
          :key="index"
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
          v-for="(tcon, index) in temperatureControllers"
          :key="index"
          class="uk-width-1-2"
        >
          <div>
            <input
              class="uk-input"
              id="form-stacked-text"
              type="text"
              v-model="value"
              :placeholder="tcon.setpoint"
            />
          </div>
          <button
            @click="override(index, value)"
            class="uk-button uk-button-default uk-width-1-1 overrideButton"
          >
            <span class="uk-text">Override</span>
          </button>
        </div>
      </div>
      <span v-if="warning"
        >Setpoint must be between {{ HEATING_ZONES[0].limits[0] }} and
        {{ HEATING_ZONES[0].limits[1] }} degrees</span
      >
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
      <div class="uk-flex uk-margin-xlarge-top uk-padding-small uk-width-1-2 ">
          <button class="uk-button uk-button-large uk-button-danger uk-width-1-1 button-padding uk-padding-remove">
                <span class="uk-text uk-text-small uk-text-center uk-width-1-1">Grind</span>
          </button> 
      </div>
      <div class="uk-flex uk-margin-xlarge-top uk-padding-small uk-width-1-2 ">
        <button class="uk-button uk-button-large uk-button-danger uk-width-1-1 button-padding uk-padding-remove">
                <span class="uk-text uk-text-small uk-text-center uk-width-1-1">New</span>
          </button> 
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import NumDisplay from "@/components/NumDisplay";
  import * as machineVariables from "@/controller/machine_info";
  import * as structures from "@/cfg/structures";
  import { mapGetters, mapMutations } from "vuex";
  import * as Util from "@/classes/Util";

  export default {
    name: "StatusNumbers",
    components: {
      NumDisplay
    },
    data: function () {
      return {
        OPTIONAL_SENSOR_INFO: machineVariables.OPTIONAL_SENSOR_INFO,
        display: false,
        warning: false,
        HEATING_ZONES: machineVariables.HEATING_ZONES
      };
    },
    computed: {
      ...mapGetters({
        optionalSensors: "machine/optionalSensors",
        temperatureControllers: "machine/temperatureControllers",
        runCounter: "machine/machineRunCounter"
      }),
      smallSensors() {
        return this.optionalSensors;
      }
    },
    methods: {
      override(index, value) {
        console.log(`override setpoint of ${index}`);
        // if input is within limits
        if (
          value >= machineVariables.HEATING_ZONES[index].limits[0] &&
          value <= machineVariables.HEATING_ZONES[index].limits[1]
        ) {
          console.log(this.temperatureControllers);
          // update setpoint
          let newProf = new machineVariables.CONTROL_STATE();
          //Set profile time to current time
          newProf.time = this.runCounter;
          structures.CONTROL_STATE_SET_NULL(newProf);
          newProf.temp[index] = value;
          this.editFirstCurrentPoint(newProf);
          //Start and pause machine
          this.$store.dispatch("machine/attemptToPauseMachine");
          //this.setSetpoint([index, value]);
          //this.$store.state.machine.tempControllers[index].setpoint = value;
          // close input fields
          this.display = !this.display;
          // make sure warning is not displayed
          this.warning = false;
          return;
        } else {
          // display warning
          this.warning = !this.warning;
          return;
        }
      },

      displayInput() {
        console.log(this.$store);
        if (this.runCounter !== 0) {
          Util.showError(
            "Cannot override while a profile is being followed. Please try pausing and adjusting profile instead."
          );
        } else {
          this.display = !this.display;
        }
        return;
      },
      ...mapMutations({
        setSetpoint: "machine/setSetpoint",
        editFirstCurrentPoint: "profile/editFirstCurrentPoint"
      })
    }
  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";
  .overrideButton {
    padding-left: 15%;
  }
</style>
