import type { SeuilConfig } from "./types"
import type { App } from "vue"
import { Seuil } from "./utils/seuil"
import { useSeuil } from "./composable/use.seuil"

export const VueSeuils = {
  install(app: App, options: SeuilConfig) {
    Seuil.getInstance(options?.thresholds, options?.debounceDelay)

    app.config.globalProperties.$breakpoints = useSeuil()
  },
}
