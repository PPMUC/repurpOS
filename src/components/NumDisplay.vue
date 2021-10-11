<template>
  <div id="outer" class="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
    <div class="uk-flex">
      <div class="uk-flex uk-flex-column uk-invisible">
        <span class="uk-text-small unit" v-html="unit"></span>
        <span v-if="hasSetpoint" class="uk-text-small unit">/{{setpoint}}</span>
      </div>
      <h3 v-if="isBig" class="uk-heading-medium uk-margin-remove-top">{{num}}</h3>
      <span id="smallText" v-if="!isBig" class="uk-text-large">{{num}}</span>
      <div class="uk-flex uk-flex-column">
        <span class="uk-text-small unit" v-html="unit"></span>
        <span v-if="!isBig && hasSetpoint" class="uk-text-small unit setpoint-small">/{{setpoint}}</span>
        <span v-if="isBig && hasSetpoint" class="uk-text-small unit setpoint-big">/ {{setpoint}}</span>
      </div>

    </div>
    <div>
      <p class="uk-text-small uk-text-center uk-text-capitalize">{{name}}</p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    //name: "Home",
    props: {
      'num': Number,
      'unit': {
        type: String,
        default: ""
      },
      'name': String,
      'isBig': {
        type: Boolean,
        default: false
      },
      'setpoint': {
        type: Number,
        default: -100
      }
    },
    components: {
    },
    computed: {
      numWithUnit() {
        return this.num + ' ' + this.unit;
      },
      hasSetpoint() {
        return this.setpoint != -100;
      }
    },
    data: function () {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";

  #outer {
    //background-color: black;
  }

  h3 {
    color: variables.$darkPPMText;
  }

  .unit {
    color: variables.$PPMText;
  }

  #smallText {
    color: variables.$PPMText;
  }

  .setpoint-small {
    margin-top: -3px;
  }

  .setpoint-big {
    margin-top: 15px;
  }
</style>