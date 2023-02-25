import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue3 from 'bootstrap-vue-3'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Vue draggable resizable
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faPlay, faAngleUp, faAngleDown, faCircleExclamation, faTriangleExclamation, faSearch, faBook,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faAngleUp, faAngleDown, faCircleExclamation, faTriangleExclamation, faSearch, faBook, faLaptopCode);

// css for the konect-api-vue
import 'konect-api-vue/dist/konect-api.css';

import '@/assets/css/style.css';

import "@mdi/font/css/materialdesignicons.css";

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
  });

createApp(App).use(store)
    .use(router)
    .use(BootstrapVue3)
    .use(vuetify)
    .use(Vue3DraggableResizable)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

