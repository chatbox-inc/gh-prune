// Base dependencies
import Vue from 'vue'
import Ionic from '@modus/ionic-vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// Ionic core styles and theming
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import '@/assets/scss/common.scss'

// Import IonVuePage component
import IonVuePage from '@/components/IonVuePage.vue'

// Enable the ionic-vue plugin
Vue.use(Ionic)

// Register as global component to be used as boilerplate
Vue.component('IonVuePage', IonVuePage)

// Create a new Vue instance
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
