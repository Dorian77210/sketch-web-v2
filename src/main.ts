import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue3 } from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/js/bootstrap.js'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faPlay, faAngleUp, faAngleDown, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faAngleUp, faAngleDown, faCircleExclamation, faTriangleExclamation);

// Vue draggable resizable
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import '@/assets/css/style.css';

createApp(App).use(store)
    .use(router)
    .use(BootstrapVue3)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Vue3DraggableResizable)
    .mount('#app')
