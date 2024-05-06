

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from '@/Firebase/init.js';

import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

let isAppMounted = false;
auth.onAuthStateChanged(() => {
    if(!isAppMounted){
        app.mount('#app');
        isAppMounted = true;
    }
})



// app.mount('#app')
