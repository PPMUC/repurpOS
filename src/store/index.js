import { createStore } from "vuex";
import machine from "./modules/machine";
import profile from "./modules/profile";
import shortcuts from "./modules/shortcuts";

export default createStore({
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  modules: {
    machine,
    profile,
    shortcuts
  }
});
