import { createApp } from 'vue'
import App from './App.vue'
import NavbarContainer from './Components/Navbar.vue'
import VeeValidateSetup from './plugins/SetupVeeValidate'

// Import our custom CSS
import './scss/styles.scss' //order matters
import './assests/main.css'

// Import all of Bootstrap's JS
import 'bootstrap'

const app = createApp(App)

app.use(VeeValidateSetup)
app.component('NavbarContainer', NavbarContainer)

app.mount('#app')
