<template>
  <div class="home uk-padding-remove">
    <div class="uk-flex uk-margin-remove" uk-grid>
      <div
        class="
          uk-card uk-card-default uk-card-body uk-width-1-4 uk-padding-bottom
        ">
        <ul
          class="uk-tab-left"
          uk-tab="connect: #component-tab-left; animation: uk-animation-fade"
        >
          <li v-for="category in settings" :key="category">
            <a href="#"
              ><span
                class="uk-margin-small-right uk-text-large"
                :uk-icon="'icon: ' + category.icon"
              ></span>
              {{ category.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="uk-width-expand">
        <div class="uk-width-expand uk-margin uk-padding">
          <ul id="component-tab-left" class="uk-switcher">
            <li v-for="category in settings" :key="category">
              <div
                v-for="(setting, index) in category.settings"
                :key="index"
                uk-grid
              >
                <form class="uk-form-horizontal uk-margin-small">
                  <div class="uk-margin">
                    <div class="uk-flex">
                      <label
                        class="uk-text uk-margin-auto-vertical uk-margin-right"
                        for="form-time"
                        >{{ setting.name }}</label
                      >
                      <div class="uk-form-controls">
                        <input
                          v-if="!setting.isButton && !setting.isDropDown" 
                          class="uk-input uk-form-width-small"
                          id="form-time"
                          :type="getInputType(setting.value)"
                          placeholder=""
                          v-model="setting.value"
                        
                        >
                       <!--{{ setting.isDropDown }}-->            
                       <!--{{ setting.isButton }}--> 
                       <!--{{ !setting.isButton && !setting.isDropDown }}--> 
                        <button
                          v-if="setting.isButton" 
                          @click="handleFunctionCall(setting.buttonAction)"
                          class="uk-button uk-button-danger"
                          type="button"
                        >
                          {{ setting.name }}
                        </button>
                        <select 
                          v-if= "setting.isDropDown"
                          class="uk-select" aria-label="Select"
                          id = "dropDownList" 
                          >  
                          <option>Dark</option>
                          <option>Light</option>
                          <option>More Options later</option>
                        </select>
                      </div>
                    </div>
                    <p class="uk-text-muted uk-text-left uk-margin-remove">
                      {{ setting.description }}
                    </p>
                  </div>
                </form>
              </div>
            </li>
          </ul>
        </div>
        <hr class="uk-margin-remove-top" />
        <div class="uk-margin uk-margin-large-bottom uk-text-right">
          <button
            class="uk-button uk-button-default"
            type="button"
            uk-toggle="target: #modal-confirm-cancel-profile"
          >
            Cancel
          </button>
          <button
            class="
              uk-button
              uk-button-primary
              uk-margin-small-left
              uk-margin-small-right
            "
            type="button"
            @click="saveSettings"
          >
            Use
          </button>
        </div>
      </div>
    </div>

    <!-- This is the modal -->
    <div id="modal-confirm-cancel-profile" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Are you sure?</h2>
        </div>
        <div class="uk-modal-body">
          <p>You are leaving the settings. Your changes will not be saved</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button
            class="uk-button uk-button-default uk-margin-right uk-modal-close"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-danger uk-modal-close"
            type="button"
            @click="this.$router.go(-1)"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
    <div id="modal-confirm-reset-settings" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Are you sure?</h2>
        </div>
        <div class="uk-modal-body">
          <p>Confirm to reset the setting</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button
            class="uk-button uk-button-default uk-margin-right uk-modal-close"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-danger uk-modal-close"
            type="button"
            @click="resetAllSettingsAndShortcuts"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
  // @ is an alias to /src
  //import ProfileChart from "@/components/ProfileChart"
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import * as machineVariables from "@/controller/machine_info";
  import * as gui from "@/controller/GUI";
  import * as Util from "@/classes/Util";
  import UIkit from "uikit";

  export default {
    name: "Settings",
    components: {
      //ProfileChart,
    },
    setup() {},
    data: function () {
      console.log(this.$store.state.settings);
      let sett = JSON.parse(JSON.stringify(this.$store.state.settings));
      console.log(sett);
      return {
        settings: sett
      };
    },
    computed: {
      ...mapGetters({
        freshSettings: "settings/getSettings"
      })
    },
    methods: {
      getInputType(input) {
        if (typeof input === "string") return "text";
        else if (typeof input === "number") return "number";
        else if (typeof input === "boolean") return "checkbox";
      },
      ...mapMutations({
        setSetting: "settings/setSetting"
      }),
      saveSettings() {
        console.log("Saving settings");
        console.log(this.settings);
        console.log(Object.keys(this.settings));
        for (let category of Object.keys(this.settings)) {
          console.log(category);
          //console.log(key);
          //console.log(`category is ${category} and key is ${key}`);
          for (let i = 0; i < this.settings[category].settings.length; i++) {
            this.setSetting({
              category: category,
              setting: i,
              value: this.settings[category].settings[i].value
            });
          }
        }
      },
      handleFunctionCall(functionName) {
        console.log("Running button" + functionName);
        this[functionName]();
      },
      openConfirmationOfResetPopUp(){
        UIkit.modal("#modal-confirm-reset-settings").toggle();
      },
      resetAllSettingsAndShortcuts() {
        console.log("Deleted settings");
        window.localStorage.removeItem("vuex");
      },
      refreshApp() {
        window.location.reload();
      },
      refreshAllShortCut(){
        Util.showError("The error is not implemented")
      }
    }
  };
</script>
