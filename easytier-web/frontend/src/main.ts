import { createApp } from 'vue'
import './style.css'
import 'easytier-frontend-lib/style.css'
import App from './App.vue'
import EasytierFrontendLib from 'easytier-frontend-lib'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ConfirmationService from 'primevue/confirmationservice';

import { createRouter, createWebHashHistory } from 'vue-router'
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import ConfigGenerator from './components/ConfigGenerator.vue'

const routes = [
    {
        path: '/config_generator',
        component: ConfigGenerator,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(PrimeVue,
    {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities'
                }
            }
        }
    }
).use(ToastService as any).use(DialogService as any).use(router).use(ConfirmationService as any).use(EasytierFrontendLib).mount('#app')
