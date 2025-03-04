import { createApp } from 'vue';
import ConfigGenerator from './components/ConfigGenerator.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import EasytierFrontendLib from 'easytier-frontend-lib';

const app = createApp(ConfigGenerator);

app.use(PrimeVue)
   .use(ToastService as any)
   .use(DialogService as any)
   .use(ConfirmationService as any)
   .use(EasytierFrontendLib)
   .mount('#app');
