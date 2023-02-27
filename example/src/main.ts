import { createApp } from "vue"
import App from "./App.vue"
import type { SeuilConfig } from "@/types.d"
import { VueSeuils } from "@/index"

createApp(App)
  .use(VueSeuils, {
    propertyName: "breakpoints",
    debounceDelay: 700,
  } as SeuilConfig)
  .mount("#app")
