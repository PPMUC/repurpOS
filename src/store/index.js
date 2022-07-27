import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import machine from "./modules/machine";
import profile from "./modules/profile";
import shortcuts from "./modules/shortcuts";
import settings from "./modules/settings";

const state = function () {
  return {};
};

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["shortcuts", "settings"]
});

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {
    machine,
    profile,
    shortcuts,
    settings
  },
  plugins: [vuexLocal.plugin]
});
