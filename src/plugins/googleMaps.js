import * as VueGoogleMaps from 'vue2-google-maps';
import VueGeolocation from 'vue-browser-geolocation';
import Vue from 'vue'

// google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB8dExdQtd6WILpKT57uF2boPp8VyCIufk',
    map_id: '6840d2b70ceb1209',
    libraries: "places",
  },
  installComponents: true
})
// geolocation
Vue.use(VueGeolocation);

export default (VueGoogleMaps, VueGeolocation);