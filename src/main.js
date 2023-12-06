import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration

const app = createApp(App);

app.use(router); // Use the router in your app instance

app.mount('#app');
