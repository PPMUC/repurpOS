import machineController from "@/controller";
import * as machineVariables from "@/controller/machine";
import router from "../../router";

// initial state
// shape: [{ id, quantity }]
const state = function () {
  //Create temp controllers
  let tempControllers = [];
  for (const [, tcon] of Object.entries(machineVariables.HEATING_ZONES)) {
    tempControllers.push({
      current: 0,
      setpoint: 0,
      name: tcon.name
    });
  }
  //Create temp sensors
  let optionalSensors = [];
  for (const [nom, tcon] of Object.entries(
    machineVariables.OPTIONAL_SENSOR_INFO
  )) {
    optionalSensors.push({
      current: 0,
      name: nom
    });
  }
  // //Create lim switches
  // let limitSwitches = [];
  // for (const [nom, tcon] of Object.entries(
  //   machineVariables.OPTIONAL_SENSOR_INFO
  // )) {
  //   limitSwitches.push({
  //     current: 0,
  //     name: nom
  //   });
  // }
  return {
    isRunning: true,
    limitSwitches: {
      frontT: true, //true for closed
      frontB: true,
      leftT: true,
      leftB: true,
      backT: true,
      backB: true,
      rightT: true,
      rightB: true
    },
    optionalSensors: optionalSensors,
    tempControllers: tempControllers
  };
};

// getters
const getters = {
  optionalSensors(state) {
    return state.optionalSensors;
  },
  temperatureControllers(state) {
    return state.tempControllers;
  }
};

// actions
const actions = {
  async attemptToStopMachine({ commit, state }) {
    if (machineController.attemptToStopMachine() === 1) {
      commit("setRunning", false);
      router.push("/stopped");
    }
  },
  async attemptToStartMachine({ commit, state }) {
    if (machineController.attemptToStartMachine() === 1) {
      commit("setRunning", true);
      router.push("/");
    }
  }
};

// mutations
const mutations = {
  setRunning(state, run) {
    state.isRunning = run;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {}
};
