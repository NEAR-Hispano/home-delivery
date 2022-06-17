<template>
  <section id="pedido" class="parent gap2 divcol">
    <ModalPedido ref="modalPedido"></ModalPedido>
    <v-col class="contup divcol">
      <aside class="astart gap1">
        <v-btn class="anim_moveleft" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
        <h1 class="h6_em tnone">{{$t('pedido')}}: {{previewPedido.user}}</h1>
      </aside>

      <v-card class="grid">
        <GoogleMap :UserCoordinates="previewPedido.location.coordinates" class="map"></GoogleMap>

        <aside class="divcol spacea relative">
          <p class="h10_em semibold">
            <span>{{$t('informacion')}}: </span>
            {{previewPedido.information}}
          </p>
          <p class="h10_em semibold">
            <span>{{$t('costoViaje')}}: </span>
            {{previewPedido.dollar}}$ ({{previewPedido.near}} NEAR)
          </p>
          <p class="h10_em semibold">
            <span>{{$t('direccion')}}: </span>
            {{previewPedido.location.direccion}}
          </p>
          <p class="h10_em semibold">
            <span>{{$t('distanciaTotal')}}: </span>
            {{previewPedido.distance}}
          </p>
          <v-btn class="h11_em" text color="var(--clr-btn)" rounded max-width="max-content"
            @click="$refs.modalPedido.modalPedido=true">
            {{$t('verDetalles')}}
          </v-btn>
        </aside>
      </v-card>
    </v-col>

    <v-col class="contdown divcol gap1">
      <h1 class="h6_em tcap tcentermobile">{{$t('historialPedidos')}}:</h1>

      <section class="grid">
        <v-card v-for="(item,i) in dataHistorial" :key="i"
          class="divcol" :style="`width:${widthListener}`"
          @click="ViewCard(item)" v-ripple="{class: 'activeRipple'}">
          <div :style="`--tag: '${$t(item.state)}'`" class="mapa"
            :class="{completado:item.state=='completado', enCurso:item.state=='enCurso',
            cancelado:item.state=='cancelado'}">
            <img :src="`https://maps.googleapis.com/maps/api/staticmap?center=
              ${item.location.coordinates.lat},${item.location.coordinates.lng}
              &markers=color:red%7Clabel:C%7C
              ${item.location.coordinates.lat},${item.location.coordinates.lng}
              &size=600x400&zoom=14&key=AIzaSyB8dExdQtd6WILpKT57uF2boPp8VyCIufk`"
              alt="Google Map Static Location">
          </div>

          <aside class="divcol center tcenter">
            <h3 class="h8_em semibold tnone">{{item.user}}</h3>
            <span class="text">{{item.distance}} - {{item.time}}</span>
            <span class="text">{{item.dollar}} $ ({{item.near}} Near)</span>
          </aside>
        </v-card>
      </section>
    </v-col>
  </section>
</template>

<script>
import GoogleMap from '@/components/googleMaps/GoogleMap.vue'
import ModalPedido from './ModalPedido'
export default {
  name: "pedido",
  components: { GoogleMap, ModalPedido },
  i18n: require("./i18n"),
  data() {
    return {
      previewPedido: {
        user: "ramon.near",
        information: "X racion de x, X litros de X, Mantener X, no agitar por motivo x.",
        dollar: "2.7",
        near: "X",
        location: {
          direccion: "Ueb. X, Calle X, Casa X. (Extra info)",
          coordinates: { lat:9.988903846136667, lng:-67.6891094161248 }
        },
        distance: "2.0 km",
      },
      dataHistorial: [
        {
          user: "ramon.near",
          information: "X racion de x, X litros de X, Mantener X, no agitar por motivo x.",
          location: {
            direccion: "Ueb. X, Calle X, Casa X. (Extra info)",
            coordinates: { lat:9.988903846136667, lng:-67.6891094161248 }
          },
          dollar: "2.7",
          near: "X",
          distance: "2.0 km",
          time: "5:22 mins",
          state: "completado",
        },
        {
          user: "martin.near",
          information: "1 racion de pollo, X litros de soda, Mantener siete, no agitar por motivo 0p.",
          location: {
            direccion: "Ueb. gol, Calle 32, Casa asd. (Extra info)",
            coordinates: { lat:9.930025264822069, lng:-67.73924811290375 }
          },
          dollar: "2.7",
          near: "1",
          distance: "2.0 km",
          time: "5:22 mins",
          state: "enCurso",
        },
        {
          user: "aloha.near",
          information: "22 racion de 12, 0 litros de 5, Mantener 4, no agitar por motivo 2.",
          location: {
            direccion: "Ueb. asd, Calle bcd, Casa asd. (Extra info)",
            coordinates: { lat:10.041521779918515, lng:-67.74578609358772 }
          },
          dollar: "4.7",
          near: "2",
          distance: "5.0 km",
          time: "2:22 mins",
          state: "cancelado",
        },
      ],
    }
  },
  computed: {
    widthListener() {if (this.dataHistorial.length <= 3) {return `${16.875}em`}},
  },
  methods: {
    ViewCard(item) {
      this.previewPedido = item;
      // this.$refs.map.userCoordinates = this.previewPedido.location.coordinates
      // this.$refs.map.map.setCenter(this.previewPedido.location.coordinates)
    },
  },
};
</script>

<style src="./Pedido.scss" lang="scss" />
