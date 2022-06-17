<template>
  <section id="tienda" class="parent">
    <v-col class="contup astart">
      <section class="contbanner jspace">
        <v-img
          src="@/assets/test.jpg"
          class="white--text align-end scroll_h"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <span class="h11_em">horario</span>
          <span class="h11_em">telefono</span>

          <v-card-title class="h6_em bold anim_moveup">
            nombre
            <v-tooltip right color="var(--clr-btn)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="not_clr" icon v-bind="attrs" v-on="on" to="/mi-tienda" :ripple="false">
                  <v-icon class="not_clr" color="var(--clr-text-btn)">mdi-clipboard-edit</v-icon>
                </v-btn>
              </template>
              <span class="clr_text_btn">Editar datos de tienda</span>
            </v-tooltip>
          </v-card-title>

          <v-card-text class="h11_em anim_moveup">
            descripcion
          </v-card-text>
        </v-img>

        <aside class="contHistorial fill">
          <div v-for="n in 19" :key="n" class="decoration" :style="`--distance:${(n+1)*4}`" />
          <h3 class="h8_em tcenter not_clr">Historial de Ordenes</h3>
        </aside>
      </section>
    </v-col>

    <v-col class="contdown divcol margin2top">
      <h2 class="h6_em center">Mi Menú
        <v-tooltip right color="var(--clr-btn)">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="not_clr margin1left" icon v-bind="attrs" v-on="on" to="/mi-menu" :ripple="false">
              <v-icon size="2em" class="not_clr" color="var(--clr-btn-2)">mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span class="clr_text_btn">Organizar menú</span>
        </v-tooltip>
      </h2>

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
        <v-card v-for="(item,i) in dataMenuTienda" :key="i" class="card divcol" :style="WidthListener">
          <div class="contImages">
            <label class="h9_em">{{ item.nombre }}</label>
            <img class="images" :src="item.img" alt="Restaurant image">
          </div>

          <aside class="contcard space">
            <p class="h10_em semibold">{{item.desc}}</p>

            <div class="contPrice divcol tend">
              <div class="acenter">
                <img class="logoNear" src="@/assets/logos/near.svg" alt="near">
                <span class="price normal">{{formatPrice(item.near)}}</span>
              </div>
              <span class="not_clr">(${{item.price}})</span>
            </div>
          </aside>
        </v-card>
      </section>
    </v-col>
  </section>
</template>

<script>
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;

export default {
  name: "tienda",
  i18n: require("./i18n"),
  data() {
    return {
      data: {},
      filters: {
        filterName: null,
        filterExcluir: [],
        filterIncluir: [],
      },
      perfil: {
        location:{
          direccion: 'direccion del lugar',
          coordinates: { lat:9.988903846136667, lng:-67.6891094161248 }
        }
      },
      dataMenuTienda: []
    }
  },
  mounted() {
    // this.VerifyStore()
    this.get_menu();
  },
  computed: {
    WidthListener() {if (this.dataMenuTienda.length <= 3) {return 'max-width: 20em'}}
  },
  methods: {
    formatPrice(price) {
      return utils.format.formatNearAmount(
        price.toLocaleString("fullwide", { useGrouping: false })
      );
    },
    async get_menu() {
      try {
        const CONTRACT_NAME = "contract1.ccoronel7.testnet";
        // Connect to NEAR
        const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
        );
        // Create wallet connection
        const wallet = new WalletConnection(near);
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          viewMethods: ["get_menu"],
          sender: wallet.account(),
        });
        if (wallet.isSignedIn()) {
          await contract
            .get_menu({
              user_id: wallet.getAccountId(),
            })
            .then((res) => {
              console.log(res);
              this.dataMenuTienda = res.platillos;
            });
        }
      } catch (e) {
        // Router
        console.log(e);
      }
    },
    async VerifyStore() {
      try {
        const CONTRACT_NAME = "contract1.ccoronel7.testnet";
        // Connect to NEAR
        const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
        );
        // Create wallet connection
        const wallet = new WalletConnection(near);
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          viewMethods: ["get_store"],
          sender: wallet.account(),
        });
        if (wallet.isSignedIn()) {
          await contract
            .get_store({
              user_id: wallet.getAccountId(),
            })
            .then((res) => {
              this.data = res;
              console.info(this.data);
            });
        }
      } catch (e) {
        // Router
        this.$router.push({ name: "miTienda" });
      }
    },
  },
};
</script>

<style src="./Tienda.scss" lang="scss" />
