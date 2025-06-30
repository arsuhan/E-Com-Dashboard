// import Aura from '@primevue/themes/aura';
// import PrimeVue from 'primevue/config';
// import ConfirmationService from 'primevue/confirmationservice';
// import ToastService from 'primevue/toastservice';

// import '@/assets/styles.scss';
// import '@/assets/tailwind.css';
// import { VueFire, VueFireAuth } from 'vuefire';
// import { firebaseApp } from './fairbase/db';
// import router from './router';
// //import Dashboard from './views/Dashboard.vue';



// app.use(router);
// app.use(PrimeVue, {
//     theme: {
//         preset: Aura,
//         options: {
//             darkModeSelector: '.app-dark'
//         }
//     }
// });
// app.use(ToastService);
// app.use(ConfirmationService);

// app.use(VueFire, {
//     // imported above but could also just be created here
//     firebaseApp,
//     modules: [
//         // we will see other modules later on
//         VueFireAuth()
//     ]
// });

// app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './fairbase/db';
import router from './router';

// ✅ `createApp(App)` ব্যবহার করে `app` তৈরি করো
const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
});

// ✅ অ্যাপ মাউন্ট করো
app.mount('#app');