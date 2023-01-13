import VueGoogleMaps from 'vue-googlemaps'
import type { InstallPlugin } from '~/types/InstallPlugin'
import 'vue-googlemaps/dist/vue-googlemaps.css'

export const install: InstallPlugin = (vue) => {
  vue.use(VueGoogleMaps, {

    load: {
      // Google API key
      apiKey: 'AIzaSyDRWHlhdHr8rDNF6vL8cOEl4aw1AOeh1Zo',
      // Enable more Google Maps libraries here
      libraries: ['places'],
      // Use new renderer
      useBetaRenderer: true,
      // Use new renderer
    },
  })
}
