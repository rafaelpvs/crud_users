import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'toastr/build/toastr.min.css'

import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_blue.css";
library.add(faTrash, faPenToSquare);

const app = createApp(App);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
