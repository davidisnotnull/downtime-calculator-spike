import { createApp } from "vue";
import BootstrapVue from "bootstrap-vue-3";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);
app.use(BootstrapVue);
app.mount("#app");
