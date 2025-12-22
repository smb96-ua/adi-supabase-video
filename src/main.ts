import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { IonicVue } from '@ionic/vue'
import { addIcons } from 'ionicons'
import { 
  film, filmOutline, tv, tvOutline, add, logOutOutline, 
  createOutline, trashOutline, playOutline, searchOutline
} from 'ionicons/icons'

addIcons({
  'film': film,
  'film-outline': filmOutline,
  'tv': tv,
  'tv-outline': tvOutline,
  'add': add,
  'log-out-outline': logOutOutline,
  'create-outline': createOutline,
  'trash-outline': trashOutline,
  'play-outline': playOutline,
  'search-outline': searchOutline
})

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import '@ionic/vue/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})
