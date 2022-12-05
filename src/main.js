import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import Vuelidate from "vuelidate";
import VModal from "vue-js-modal";
import vSelect from "vue-select";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import "vue-select/dist/vue-select.css";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import api from "./plugins/api";
import "./assets/styles/main.scss";

firebase.initializeApp({
  apiKey: "AIzaSyCtb2Np7z2EiE5yvp5uyv1NMq4wMTW8bLs",
  authDomain: "vue-controlmenu.firebaseapp.com",
  projectId: "vue-controlmenu",
  storageBucket: "vue-controlmenu.appspot.com",
  messagingSenderId: "40357819323",
  appId: "1:40357819323:web:1be5b4bf985b1c3fb38a9e",
});

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(VModal);
Vue.component("VSelect", vSelect);
Vue.use(api, { firebase });
Vue.use(VueToast);
Vue.config.ignoredElements = [/^ion-/];

onAuthStateChanged(getAuth(), () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
