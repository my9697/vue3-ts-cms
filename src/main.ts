import { createApp } from "vue"
import { createPinia } from "pinia"
import "normalize.css"
import "./assets/css/index.less"
import router from "./router/index"
import pinia from "./stores/index"
import App from "./App.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import useLoginStore from "./stores/login/login"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(pinia)
const LoginStore = useLoginStore()
LoginStore.loadLocalCatchAction()
app.use(router)
app.mount("#app")
