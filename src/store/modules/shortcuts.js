import Shortcut from "@/classes/Shortcut";
// import router from "../../router";

// initial state
// shape: [{ id, quantity }]
const state = function () {
  return {
    shortcuts: [new Shortcut()]
  };
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  addTimePoint(state, newShort) {
    state.shortcuts.push(newShort);
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
