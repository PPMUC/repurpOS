// import machineController from "@/controller";
import * as machineVariables from "@/controller/machine_info";
import * as structures from "@/cfg/structures";
import * as Util from "@/classes/Util";
import { ErrorCodes } from "vue";
import { CONTROL_STATE } from "../../controller/machine_info";
// import router from "../../router";

// initial state
// shape: [{ id, quantity }]
const state = function () {
  return {
    proposed: [],
    current: [
      new machineVariables.CONTROL_STATE(0, [0, 0]),
      new machineVariables.CONTROL_STATE(7, [30, 10], true),
      new machineVariables.CONTROL_STATE(10, [7, 6])
    ],
    actual: [
      new machineVariables.CONTROL_STATE(0),
      new machineVariables.CONTROL_STATE(10)
    ]
  };
};

// getters
const getters = {
  getCurrent(state) {
    return state.current;
  },
  getProposed(state) {
    return state.proposed;
  },
  getChartSeriesAll(state, getters) {
    return getters.getChartSeriesActual.concat(getters.getChartSeriesCurrent);
  },
  getChartSeriesCurrent(state, getters) {
    return getters.getChartSeries("current");
  },
  getChartSeriesActual(state, getters) {
    return getters.getChartSeries("actual", true);
  },
  getChartSeriesProposed(state, getters) {
    return getters.getChartSeries("proposed", false);
  },
  getChartSeries: (state) => (dataName, showOptional) => {
    let out = [];
    //If current is empty return empty
    if (state[dataName].length === 0) {
      return out;
    }
    // console.log(state[dataName].length);
    // console.log(state[dataName]);
    //add each series to out
    //temperatures
    for (let i = 0; i < state[dataName][0].temp.length; i++) {
      let comSeries = [];
      for (let data of state[dataName]) {
        comSeries.push([data.time, data.temp[i]]);
      }
      out.push({
        name: Util.capitalize(
          machineVariables.HEATING_ZONES[i].name + " temperature" + " (C)"
        ),
        data: comSeries
      });
    }
    //Misc Sensors
    for (let series of Object.keys(state[dataName][0].miscRequiredSensor)) {
      let comSeries = [];
      for (let data of state[dataName]) {
        comSeries.push([data.time, data.miscRequiredSensor[series]]);
      }
      out.push({
        name: Util.capitalize(
          machineVariables.REQUIRED_SENSOR_INFO[series].name +
            " (" +
            machineVariables.REQUIRED_SENSOR_INFO[series].units +
            ")"
        ),
        data: comSeries
      });
    }
    if (showOptional) {
      for (let series of Object.keys(state[dataName][0].miscOptionalSensor)) {
        let comSeries = [];
        for (let data of state[dataName]) {
          comSeries.push([data.time, data.miscOptionalSensor[series]]);
        }
        out.push({
          name: Util.capitalize(
            machineVariables.OPTIONAL_SENSOR_INFO[series].name +
              " (" +
              machineVariables.OPTIONAL_SENSOR_INFO[series].units +
              ")"
          ),
          data: comSeries
        });
      }
    }

    // console.log(out);
    return out;
  }
};

// actions
const actions = {
  setCurrentProfileFromProposed({ commit, state }) {
    commit("clearCurrent");
    let newArr = [];
    for (let el of state.proposed) {
      newArr.push(structures.CONTROL_STATE_COPY_PROPERTIES(el));
    }
    console.log(newArr);
    commit("appendCurrentProfile", newArr);
  },
  setProposedProfileFromCurrent({ commit, state }) {
    commit("clearProposed");
    let newArr = [];
    for (let el of state.current) {
      newArr.push(structures.CONTROL_STATE_COPY_PROPERTIES(el));
    }
    commit("appendProposedProfile", newArr);
  },
  //& Add
  addActual(state, newPoint) {
    throw ErrorCodes.NotImplemented;
  },
  addProposedPoint({ dispatch, commit, state }, newPoint) {
    //Check for duplicate
    if (state.proposed.some((e) => e.time === newPoint.time)) {
      newPoint.time = newPoint.time - 1;
      dispatch("addProposedPoint", newPoint);
      return;
    }
    //No dupe
    state.proposed.push(newPoint);
    commit("sortProposedPoints");
  },
  //& Set
  setProposedProfile({ dispatch, commit, state }, newPoints) {
    commit("clearProposed");
    console.log(newPoints);
    for (let point of newPoints) {
      commit("appendProposedProfile", point);
    }
  }
};

// mutations
const mutations = {
  //& Remove
  removeProposedPoint(state, newPoint) {
    const index = state.proposed.indexOf(newPoint);
    //Ensure we dont delete the 0 and it exists
    if (index > -1 && newPoint.time !== 0) {
      state.proposed.splice(index, 1);
    }
  },
  //& Edit
  editFirstCurrentPoint(state, newProfile) {
    newProfile.time = 0;
    for (let i = 0; i < newProfile.temp.length; i++) {
      let val = newProfile.temp[i];
      if (val !== null) state.current[0].temp[i] = val;
      console.log(i);
      console.log(val);
    }
    for (const key in newProfile.miscRequiredSensor) {
      let val = newProfile.miscRequiredSensor[key];
      if (val !== null) state.current[0].miscRequiredSensor[key] = val;
      console.log(key);
      console.log(val);
    }

    console.log(state.current);
  },
  //& Edit point or if doesn't exist, make a new one
  editCurrentTimePoint(state, newProfile) {
    throw ErrorCodes.NotImplemented;

    // //Find if state at current time exists
    // let currentProf = null;
    // for (const prof of state.current) {
    //   if (prof.time === newProfile.time) {
    //     //Edit existing point
    //     currentProf = prof;

    //     //Only one point we need to change
    //     break;
    //   }
    // }

    // if (currentProf === null) {
    //   //We need to make a new point
    //   currentProf = structures.CONTROL_STATE_COPY_PROPERTIES();
    // }

    // //newprofile will have everything except what youy want to change set to null
    // for (let i = 0; i < newProfile.temp.length; i++) {
    //   let val = newProfile.temp[i];
    //   if (val !== null) currentProf.temp[i] = val;
    //   console.log(i);
    //   console.log(val);
    // }
    // for (const key in newProfile.miscRequiredSensor) {
    //   let val = newProfile.miscRequiredSensor[key];
    //   if (val !== null) currentProf.miscRequiredSensor[key] = val;
    //   console.log(key);
    //   console.log(val);
    // }

    // console.log(state.current);
  },
  //& Append
  appendCurrentProfile(state, newProfile) {
    state.current = state.current.concat(newProfile);
  },
  appendProposedProfile(state, newProfile) {
    console.log(newProfile);
    state.proposed = state.proposed.concat(newProfile);
    console.log(state.proposed);
  },
  //& Move
  moveProposedPoint(state, oldTime, newTime) {
    const index = state.proposed.find((prop) => {
      return prop.time === oldTime;
    });
    if (index > -1) {
      state.proposed.splice(index, 1);
    }
  },
  //& Clear
  clearProposed(state) {
    state.proposed.splice(0);
  },
  clearCurrent(state) {
    state.current.splice(0);
  },
  clearActual(state) {
    state.actual.splice(0);
  },
  //& Sort
  sortProposedPoints(state) {
    console.log("Sorting");
    state.proposed.sort((e1, e2) => e1.time - e2.time);
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
