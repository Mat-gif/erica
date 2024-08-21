
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/global.css';
import OpenLayersMap from "vue3-openlayers";
const app = createApp(App)
app.use(OpenLayersMap);

app.mount('#app')
