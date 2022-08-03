import { createApp } from "vue";
import BootstrapVue from "bootstrap-vue-3";
import App from "./App.vue";
import directives from "./directives/";

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);
app.use(BootstrapVue);
directives(app);
app.mount("#app");
