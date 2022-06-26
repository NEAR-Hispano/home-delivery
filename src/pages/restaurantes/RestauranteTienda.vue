<template>
  <section id="restaurante-tienda" class="parent">
    <v-col class="contup">
      <section class="contbanner jspace">
        <v-img
          src="@/assets/test.jpg"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <aside class="backBtn">
            <v-btn icon @click="$router.push('/restaurantes')" :ripple="false">
              <v-icon class="not_clr">mdi-chevron-left</v-icon>
            </v-btn>
          </aside>
          <aside class="contLike">
            <button class="contimg center absolute not_clr"
              :class="{ contIconActive: perfil.like }"
              @click="perfil.like = !perfil.like">
              <img :src="require(`@/assets/icons/corazon${perfil.like==true?'':'-outline'}.svg`)" alt="Food icon">
            </button>
          </aside>
          <span class="h11_em">horario</span>

          <v-card-title class="h6_em bold">
            nombre
          </v-card-title>

          <v-card-text class="h11_em">
            descripcion
          </v-card-text>
        </v-img>

        <aside class="contmapa divcol jend">
          <div class="divcol">
            <label class="h10_em">{{$t('direccion')}}</label>
            <span class="h11_em">{{perfil.location.direccion}}</span>
          </div>

          <GoogleMap ref="map"></GoogleMap>
        </aside>
      </section>
    </v-col>

    <v-col class="contdown divcol">
      <aside class="contFilters divwrap acenter">
        <v-btn text class="searchBtn semibold">
          {{$t('filtrar')}}
        </v-btn>

        <v-text-field
          prepend-inner-icon="mdi-magnify"
          solo
          hide-details
          class="search"
        ></v-text-field>

        <v-btn class="filtro">
          <v-icon size="2.5em" color="var(--clr-text-btn)" class="not_clr">mdi-filter</v-icon>
        </v-btn>

        <v-select
          v-model="filters.filterName"
          :items="$t('filters.filterName.by')"
          :label="$t('filters.filterName.label')"
          hide-details
          filled
          class="select"
        ></v-select>

        <v-select
          v-model="filters.filterExcluir"
          :items="$t('filters.filterExcluir')"
          :label="$t('excluir')"
          filled
          hide-details
          multiple
          class="select"
        >
          <template v-slot:selection="{item, index}">
            <v-chip color="#FFFFFF" v-if="index === 0">
              <span class="semibold">{{item}}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="black--text text-caption"
            >
              (+{{ $t('filters.filterExcluir').length - 1 }})
            </span>
          </template>
        </v-select>

        <v-select
          v-model="filters.filterIncluir"
          :items="$t('filters.filterIncluir')"
          :label="$t('incluir')"
          hide-details
          filled
          multiple
          class="select"
        >
          <template v-slot:selection="{item, index}">
            <v-chip color="#FFFFFF" v-if="index === 0">
              <span class="semibold">{{item}}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="black--text text-caption"
            >
              (+{{ $t('filters.filterIncluir').length - 1 }})
            </span>
          </template>
        </v-select>
      </aside>

      <section class="contRestaurantList">
        <v-card v-for="(item,i) in dataMenuRestaurant" :key="i" :style="WidthListener"
          class="card divcol" v-ripple="activeRipple?{class: 'activeRipple'}:''">
          <div class="contImages" @click="SelectMenu(item)"
            @mouseover="activeRipple=true" @mouseleave="activeRipple=false">
            <span class="customeTooltip h12_em not_clr">Agregar al carrito</span>
            <img class="images" :src="item.img" alt="Restaurant image">
          </div>

          <aside class="contcard space">
            <p class="h10_em semibold">{{item.desc}}</p>

            <div class="contPrice divcol tend">
              <div class="acenter">
                <img class="logoNear" src="@/assets/logos/near.svg" alt="near">
                <span class="price normal">{{item.price}}</span>
              </div>
              <span class="not_clr">(${{item.dollar}})</span>
            </div>
          </aside>
        </v-card>
      </section>
    </v-col>
  </section>
</template>

<script>
import GoogleMap from '@/components/googleMaps/GoogleMap'
export default {
  name: "restauranteTienda",
  components: { GoogleMap },
  i18n: require("./i18n"),
  mounted() {
    this.$refs.map.userCoordinates = this.perfil.location.coordinates;
    const el = document.querySelectorAll('.contImages');
    el.forEach(element => {
      element.addEventListener('mousemove', (e)=>{
        var x = e.offsetX;
        var y = e.offsetY;
        element.style.setProperty('--x', `${x}px`)
        element.style.setProperty('--y', `${y}px`)
      });
    });
  },
  data() {
    return {
      activeRipple:false,
      perfil: {
        like: false,
        location:{
          direccion: 'direccion del lugar',
          coordinates: { lat:9.988903846136667, lng:-67.6891094161248 }
        }
      },
      filters: {
        filterName: null,
        filterExcluir: [],
        filterIncluir: [],
      },
      dataMenuRestaurant: [
        {
          img: require("@/assets/test.jpg"),
          desc: "descripcion",
          price: 1,
          dollar: 23
        },
        {
          img: require("@/assets/test.jpg"),
          desc: "descripcion",
          price: 1,
          dollar: 23
        },
        {
          img: require("@/assets/test.jpg"),
          desc: "descripcion",
          price: 1,
          dollar: 23
        },
        {
          img: require("@/assets/test.jpg"),
          desc: "descripcion",
          price: 1,
          dollar: 23
        },
      ]
    }
  },
  computed: {
    WidthListener() {if (this.dataMenuRestaurant.length <= 3) {return 'max-width: 20em'}}
  },
  methods: {
    // al hacer click en el menu
    SelectMenu(item) {
      console.log(item)
    }
  },
};
</script>

<style src="./Restaurantes.scss" lang="scss" />
