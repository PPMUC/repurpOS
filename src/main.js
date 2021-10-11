import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import logic from "./controller";

// loads the Icon plugin
UIkit.use(Icons);

let vm = createApp(App).use(store).use(router).mount("#app");

// components can be called from the imported UIkit reference
//UIkit.notification("Hello world.");
logic.app = vm;

console.log(vm.$store.state.profile.current);
