import machineController from "@/controller";
import * as machineVariables from "@/controller/machine_info";
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
  //Required
  let requiredSensors = {};
  for (const [key, tcon] of Object.entries(
    machineVariables.REQUIRED_SENSOR_INFO
  )) {
    requiredSensors[key] = {
      current: 0,
      setpoint: 0,
      name: tcon.name
    };
  }
  //Create temp sensors
  let optionalSensors = {};
  for (const [nom, tcon] of Object.entries(
    machineVariables.OPTIONAL_SENSOR_INFO
  )) {
    optionalSensors[nom] = {
      current: 0,
      name: nom
    };
  }
  //Create lim switches
  let limitSwitches = [];
  for (const [nom, tcon] of Object.entries(machineVariables.LIM_SWITCH_INFO)) {
    limitSwitches.push({
      state: false, //False means open
      name: nom
    });
  }

  return {
    isRunning: true,
    limitSwitches: limitSwitches,
    optionalSensors: optionalSensors,
    requiredSensors: requiredSensors,
    tempControllers: tempControllers,
    logic: null,
    machineRunCounter: 0
  };
};

// getters
const getters = {
  optionalSensors(state) {
    return state.optionalSensors;
  },
  requiredSensors(state) {
    return state.requiredSensors;
  },
  temperatureControllers(state) {
    return state.tempControllers;
  },
  tempControllerCurrent(state) {
    let current = [];
    for (let i = 0; i < state.tempControllers.length; i++) {
      current.push(state.tempControllers[i].current);
    }
    return current;  
  },
  tempControllerSetpoints(state) {
    let setpoints = [];
    for (let i = 0; i < state.tempControllers.length; i++) {
      setpoints.push(state.tempControllers[i].setpoint);
    }
    return setpoints;
  },
  limitSwitches(state) {
    return state.limitSwitches;
  }
};

// actions
const actions = {
  async attemptToStopMachine({ commit, state }) {
    if (state.logic.attemptToStopMachine() === 1) {
      commit("setRunning", false);
      router.push("/stopped");
    }
  },
  async attemptToStartMachine({ commit, state }) {
    if (state.logic.attemptToStartMachine() === 1) {
      commit("setRunning", true);
      router.push("/");
    }
  }
};

// mutations
const mutations = {
  setRunning(state, run) {
    state.isRunning = run;
  },
  setLogic(state, logic) {
    state.logic = logic;
  },
  setSetpoint(state, [controller, setpoint]) {
    state.tempControllers[controller].setpoint = setpoint;
  },
  setRequiredSensorSetpoint(state, [controller, setpoint]) {
    console.log(controller);
    console.log(state.requiredSensors);
    state.requiredSensors[controller].setpoint = setpoint;
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
