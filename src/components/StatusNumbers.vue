<template>
      <div class="uk-section uk-section-muted uk-padding-remove uk-margin-remove" uk-height-viewport="offset-top: true">
        <div class="uk-flex uk-padding-small uk-margin-remove-left uk-margin-remove-horizontal uk-margin-top" uk-grid>
          <div class="uk-flex uk-margin-remove uk-padding-remove uk-width-1-1">
            <NumDisplay class="uk-width-1-2" v-for="tcon in temperatureControllers" :key="tcon.name"  :num="tcon.current" 
            :unit="'&deg;C'" :name="tcon.name" :isBig="true" :setpoint="tcon.setpoint">
            </NumDisplay>
          </div>
          <div class="uk-flex uk-padding-remove uk-width-1-1" uk-grid>
            <div v-for="num in smallSensors" :key="num.name" class="uk-width-1-3">
              <NumDisplay :key="num.name" :num="num.current" :unit="OPTIONAL_SENSOR_INFO[num.name].units" :name="num.name">
              </NumDisplay>
            </div>
          </div>


        </div>
      </div>
</template>

<script>
  // @ is an alias to /src
  import NumDisplay from "@/components/NumDisplay"
  import * as machineVariables from "@/controller/machine";
  import { mapGetters } from 'vuex'

  export default {
    name: "StatusNumbers",
    components: {
      NumDisplay
    },
    data: function () {
      return {
        OPTIONAL_SENSOR_INFO: machineVariables.OPTIONAL_SENSOR_INFO
      };
    },
    computed:{
      ...mapGetters({
        optionalSensors: 'machine/optionalSensors',
        temperatureControllers: 'machine/temperatureControllers',
      }),
      smallSensors(){
        return this.optionalSensors;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";
</style>