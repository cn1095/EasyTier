import { createApp } from 'vue';
import ConfigGenerator from './components/ConfigGenerator.vue';
import PrimeVue from 'primevue/config';
import EasytierFrontendLib from 'easytier-frontend-lib';

const app = createApp(ConfigGenerator);

app.use(PrimeVue)
   .use(EasytierFrontendLib)
   .mount('#app');
