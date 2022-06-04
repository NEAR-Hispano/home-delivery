<template>
  <section class="relative">
    <v-text-field
      v-model="CoordenatesMap"
      solo
      hide-details
      class="inputGoogleSearch"
      prepend-icon="mdi-magnify"
      @change="findLocation()"
    ></v-text-field>
    <GmapMap
      ref="mapRef"
      :center="myCoordinates"
      :zoom="zoom"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [
          {elementType: 'geometry', stylers: [{color: 'rgb(224, 224, 224)'}]},
          {featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#3E2185'}]},
        ]
      }"
      @dragend="handleDrag()"
    >
      <gmap-custom-marker
        :marker="myCoordinates"
        alignment="bottomright"
        :offsetX="-10"
        :offsetY="17.5"
        @click.native="someFunction()"
      >
        <img class="localImg" src="@/assets/logos/logo.svg" />
      </gmap-custom-marker>
    </GmapMap>
  </section>
</template>

<script>
import axios from 'axios';
import GmapCustomMarker from 'vue2-gmap-custom-marker';
export default {
  name: "googleMaps",
  components: {
    'gmap-custom-marker': GmapCustomMarker
  },
  data() {
    return {
      // map
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 13,
      // marker
      marker: {
        lat: 50.60229509638775,
        lng: 3.0247059387528408
      },
      lat: 0,
      lng: 0,
      radius: 50,
    }
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        }
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    },
    CoordenatesMap() {
      return `${this.lat}, ${this.lng}`
    }
  },
  created() {
    // get user's coordinates from browser request
    this.$getLocation()
    .then(coordinates => {
      this.myCoordinates = coordinates;
    })
    .catch(error => alert(error))

    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },
  mounted() {
    //add the map to a data object
    this.$refs.mapRef.$mapPromise.then(map => this.map = map)
  },
  methods: {
    handleDrag() {
      // get zoom level, store in localstorage
      let zoom = this.map.getZoom();
      localStorage.zoom = zoom;
    },
    findLocation() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        this.lat}, ${this.lng}&type=restaurant&radius=${
          this.radius * 1000}&key=[AIzaSyB8dExdQtd6WILpKT57uF2boPp8VyCIufk]`;
      axios.get(URL).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error.message);
      });
    }
  },
};
</script>

<style src="./GoogleMap.scss" lang="scss" />
