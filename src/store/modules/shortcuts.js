import Shortcut from "@/classes/Shortcut";
// import router from "../../router";

// initial state
// shape: [{ id, quantity }]
const state = function () {
  let short = Array.from(new Array(12), () => new Shortcut());
  return {
    shortcuts: short
  };
};

// getters
const getters = {
  getShortcuts(state) {
    return state.shortcuts;
  }
};

// actions
const actions = {};

// mutations
const mutations = {
  modifyShortcut(state, data) {
    state.shortcuts[data.index] = data.shortcut;
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
