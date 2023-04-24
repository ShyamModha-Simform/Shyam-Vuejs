import { createApp } from 'vue'
import App from './App.vue'
import NavbarContainer from './Components/Navbar.vue';

import './assests/main.css';

const app = createApp(App);

app.component('NavbarContainer', NavbarContainer)

app.mount('#app')
