import { createStore } from "vuex";
import machine from "./modules/machine";
import profile from "./modules/profile";
import shortcuts from "./modules/shortcuts";

const state = function () {
  return {};
};

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {
    machine,
    profile,
    shortcuts
  }
});
