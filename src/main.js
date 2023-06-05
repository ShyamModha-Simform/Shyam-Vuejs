import { createApp } from 'vue';
import App from './App.vue';
import NavbarContainer from './Components/Navbar.vue';
import VeeValidateSetup from './plugins/SetupVeeValidate';
import { createPinia } from 'pinia';

// Import our custom CSS
import './scss/styles.scss'; //order matters
import './assests/main.css';

// Import all of Bootstrap's JS
import 'bootstrap';
import Router from './routes/routes';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VeeValidateSetup);
app.use(Router);
app.component('NavbarContainer', NavbarContainer);
app.mount('#app');
