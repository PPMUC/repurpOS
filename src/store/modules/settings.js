import Setting from "@/classes/Setting";
import { SETTINGS } from "@/cfg/settings";
// import router from "../../router";

// initial state
// shape: [{ id, quantity }]
const state = function () {
  console.log(SETTINGS);
  return SETTINGS;
};

// getters
const getters = {
  getSettings(state) {
    console.log(state);
    return state;
  }
};

// actions
const actions = {};

// mutations
const mutations = {
  setSetting(state, { category, setting, value }) {
    state[category][setting] = value;
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
