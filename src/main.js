import { createApp } from 'vue';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';

// vuetify
import 'vuetify/dist/vuetify.css';
import { createVuetify } from 'vuetify';
/* eslint-disable */ 
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router.js';
import store from './store';


const vuetify = createVuetify({
  directives,
  components,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.green.darken3,
          secondary: colors.red.lighten4,
        },
      },
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(store);
app.mount('#app');

