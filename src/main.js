import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.scss'
import GUI from "lil-gui";
import store from "@/store";


const app = createApp(App);
const gui = new GUI()
app.config.globalProperties.gui = gui;
app.use(store);
app.mount('#app')
