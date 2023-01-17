import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})


app.use(vue3GoogleLogin, {
    clientId: '493800475725-s6o4a3icu39cef0ju1eu457rnhp7m60o.apps.googleusercontent.com'
})
app.use(router)
app.use(pinia)
app.mount('#app')