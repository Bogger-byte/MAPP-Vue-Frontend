import { createApp } from 'vue';
import App from './App.vue';

import VueNativeSock from "vue-native-websocket-vue3";
import router from "./router";
import { createPinia } from "pinia/dist/pinia";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import OverlayPanel from "primevue/overlaypanel";
import Menubar from "primevue/menubar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Badge from "primevue/badge";
import Tag from "primevue/tag";
import BadgeDirective from "primevue/badgedirective";

import "primeflex/primeflex.css";
import "primevue/resources/themes/tailwind-light/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const pinia = createPinia();

createApp(App)
    .use(VueNativeSock, "ws://localhost:8080/api/websocket/endpoint", {
        "connectManually": true,
        "reconnection": true,
        "reconnectionAttempts": 5,
        "reconnectionDelay": 3000,
        "format": "json"
    })
    .use(PrimeVue)
    .use(router)
    .use(pinia)
    .component('Button', Button)
    .component('Checkbox', Checkbox)
    .component('InputText', InputText)
    .component('Card', Card)
    .component('OverlayPanel', OverlayPanel)
    .component('Menubar', Menubar)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Badge', Badge)
    .component('Tag', Tag)
    .directive('badge', BadgeDirective)
    .mount('#app');
