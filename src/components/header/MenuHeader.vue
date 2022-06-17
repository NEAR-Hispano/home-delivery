<template>
  <section id="menuHeader">
    <!-- menu search -->
    <v-menu
      bottom
      transition="scroll-y-transition"
      offset-y
      z-index="10"
      activator=".openSearch"
      :close-on-content-click="false"
    >
      <v-text-field
        v-model="search"
        solo
        hide-details="true"
        maxlength="20"
        class="searchMobile"
      >
      <template v-slot:prepend-inner>
        <img src="@/assets/icons/lupa.svg" alt="icon">
      </template>

        <template v-slot:label>
          <span class="label">{{$t('labelBuscar')}}</span>
        </template>
      </v-text-field>
    </v-menu>

    <!-- menu options -->
    <v-menu
      v-model="optionMenu"
      bottom
      transition="scroll-y-transition"
      offset-y
      z-index="10"
      activator=".openOptions"
      :close-on-content-click="false"
    >
      <v-expansion-panels focusable class="menuGlobal">
        <!-- expansion -->
        <template v-if="dataMenuOptions.expansion">
          <v-expansion-panel v-for="(item, i) in dataMenuOptions.expansion" :key="i">
            <v-expansion-panel-header>
              {{ $t(item.key) }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-list v-for="(item2, i) in item.selection" :key="i">
                <v-list-item @click="CambiarLanguaje(item2.key); optionMenu = false"
                  class="activeClass">
                  <v-list-item-title class="center">
                    <span class="not_clr">{{ $t(item2.name) }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </template>

        <!-- list -->
        <!--<template v-if="dataMenuOptions.list">
          <v-list class="intoExpansion">
            <v-list-item v-for="(item,i) in dataMenuOptions.list" :key="i"
              @click="SelectOptionItem(item.key)">
              <v-list-item-title>
                <v-badge
                  :content="messages"
                  :value="messages"
                  color="#3E2185"
                  inline
                  class="not_clr"
                  style="margin: 0"
                >
                  {{ item.key }}
                </v-badge>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>-->
      </v-expansion-panels>
    </v-menu>

    <!-- menu logout -->
    <v-menu
      v-model="logout"
      bottom
      transition="scroll-y-transition"
      offset-y
      z-index="10"
      activator=".openMenuLogout"
      :close-on-content-click="false"
    >
      <v-expansion-panels focusable class="menuGlobal">
        <!-- expansion -->
        <template v-if="dataMenuLogout.expansion">
          <v-expansion-panel v-for="(item, i) in dataMenuLogout.expansion" :key="i">
            <v-expansion-panel-header>
              {{ $t(item.key) }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-list v-for="(item2, i) in item.selection" :key="i">
                <v-list-item class="activeClass" :to="item2.to" @click.stop="logout = false">
                  <v-list-item-title class="center">
                    <span class="not_clr">{{ $t(item2.key) }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </template>

        <!-- list -->
        <template v-if="dataMenuLogout.list">
          <v-list class="intoExpansion">
            <v-list-item v-for="(item,i) in dataMenuLogout.list" :key="i"
              @click.stop="Logout()">
              <v-list-item-title>
                <span class="not_clr">{{ $t(item.key) }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-expansion-panels>
    </v-menu>

    <v-dialog
      v-model="modalShopCart"
      max-width="min(100%, 60em)"
      scrollable
    >
      <v-card id="modalShopCart" class="divcol jspace">
        <v-btn icon class="close" @click.stop="modalShopCart=false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>

        <v-window v-model="ventanaTiendas">
          <v-window-item v-for="(item,i) in dataModalShopCart" :key="`card-${i}`"
            class="padd1block relative">
            <section class="center">
              <h1 class="h7_em">{{item.user}}</h1>
            </section>

            <section class="contentModal grid">
              <section class="contInformacion divcol gap1">
                <span class="h10_em bold" style="text-indent:24px;">{{$t('informacionPedido')}}</span>
                <ul class="divcol gap1">
                  <v-card v-for="(item2,i) in item.pedido" :key="i" v-ripple="{class: 'activeRipple'}"
                    class="grid" :style="`--numeration: '${i+1}-'`" :ripple="true">
                    <span class="h11_em semibold"><span class="titulo">Orden: </span>{{item2.orden}}</span>
                    <div class="divcol">
                      <div class="divrow acenter" style="gap:.2em">
                        <span class="h11_em semibold"><span class="titulo">Precio: </span>{{item2.precio}}</span>
                        <img src="@/assets/logos/near.svg" width="14px" alt="near">
                      </div>
                      <span class="h11_em semibold"><span class="titulo">Comentario: </span>{{item2.comentario}}</span>
                    </div>
                    <v-btn icon class="cancelBtn not_clr">
                      <img src="@/assets/icons/eliminar.svg" alt="cancel order">
                    </v-btn>
                  </v-card>
                </ul>
              </section>

              <aside class="contRightPanel">
                <section class="divcol">
                  <span class="h10_em bold">{{$t('precioPedido')}}</span>
                  <aside class="divcol" style="gap:.2em">
                    <span class="h11_em semibold acenter" style="gap:.2em">
                      <span class="titulo">Precio de Delivery: </span>
                      {{item.precio.delivery}}
                      <img src="@/assets/logos/near.svg" width="14px" alt="near">
                      </span>
                    <span class="h11_em semibold acenter" style="gap:.2em">
                      <span class="titulo">Total del Pedido: </span>
                      {{item.precio.total}}
                      <img src="@/assets/logos/near.svg" width="14px" alt="near">
                    </span>
                  </aside>
                  <v-btn class="botones2 align maxsize_w margin1top">
                    Aceptar
                  </v-btn>
                </section>

                <section class="divcol">
                  <span class="h10_em bold">{{$t('direccionEntrega')}}</span>
                  <aside class="divcol" style="gap:.2em">
                    <GoogleMap :UserCoordinates="item.entrega.coordinates"
                      style="width:100%;height:150px"></GoogleMap>

                    <span class="h11_em semibold">
                      <span class="titulo">Dirección: </span>
                      {{item.entrega.direccion}}
                    </span>
                    <span class="h11_em semibold">
                      <span class="titulo">Número: </span>
                      {{item.entrega.numero}}
                    </span>
                  </aside>
                </section>
              </aside>
            </section>
          </v-window-item>
        </v-window>

        <v-card-actions class="center">
          <v-item-group v-model="ventanaTiendas" mandatory>
            <v-item v-for="n in dataModalShopCart.length" :key="`btn-${n}`" v-slot="{ active, toggle }">
              <v-btn :input-value="active" icon @click="toggle" :class="active?'':'not_clr'">
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { i18n } from "@/plugins/i18n";
import GoogleMap from '@/components/googleMaps/GoogleMap'
export default {
  name: "headerMenu",
  i18n: require("./i18n"),
  components: { GoogleMap },
  // created() {
  //   this.element = document.getElementById("theme");
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     this.CambiarTheme(theme);
  //   }
  // },
  mounted() {
    this.CambiarLanguaje(localStorage.language);
  },
  data() {
    return {
      modalShopCart: false,
      ventanaTiendas: 0,
      logout: false,
      optionMenu: false,
      messages: 1,
      search: "",
      dataMenuOptions: {
        expansion: [
          {
            key: "idioma",
            selection: [{name: "ingles", key: "US"}, {name: "español", key: "ES"}],
          },
        ],
      },
      dataMenuLogout: {
        expansion: [
          {
            key: "ajustes",
            selection: [
              {
                key: "perfil",
                to: "/mi-perfil",
              },
              {
                key: "tienda",
                to: "/mi-tienda",
              },
            ],
          },
        ],
        list: [
          { key: "logout" }
        ]
      },
      dataModalShopCart: [
        {
          user: "juanito's shop",
          pedido: [
            {
              orden: "papitas fritas con refresco, dos raciones de pollo y ensalada",
              precio: 4,
              comentario: "ensalada sin cebolla",
            },
            {
              orden: "papitas fritas con refresco, dos raciones de pollo y ensalada",
              precio: 4,
              comentario: "ensalada sin cebolla",
            },
            {
              orden: "papitas fritas con refresco, dos raciones de pollo y ensalada",
              precio: 4,
              comentario: "ensalada sin cebolla",
            },
            {
              orden: "papitas fritas con refresco, dos raciones de pollo y ensalada",
              precio: 4,
              comentario: "ensalada sin cebolla",
            },
          ],
          precio:{delivery: 0.5, total: 8.5},
          entrega: {
            direccion: "virgen de guadalupe, las rosas",
            coordinates: { lat:9.988903846136667, lng:-67.6891094161248 },
            numero: "0414-4137640",
          },
        },
        {
          user: "pedrito's shop",
          pedido: [
            {
              orden: "sucaritas vida y mas na",
              precio: 2,
              comentario: "ninguno",
            },
          ],
          precio:{delivery: 0.5, total: 2.5},
          entrega: {
            direccion: "las carmencitas, hoyuelos",
            coordinates: { lat:9.988903846136667, lng:-67.6891094161248 },
            numero: "0414-4137640",
          },
        },
      ]
    };
  },
  methods: {
    // CambiarTheme(theme) {
    //   if (theme == 'light') {
    //     this.$store.dispatch("CambiarTheme", { theme, element: this.element });
    //   }
    //   if (theme == 'dark') {
    //     this.$store.dispatch("CambiarTheme", { theme, element: this.element });
    //   }
    // },
    CambiarLanguaje(lang) {
      if (lang === "ES") {
        localStorage.language = lang;
        i18n.locale = lang;
      } else {
        localStorage.language = lang;
        i18n.locale = lang;
      }
    },
    Logout() {
      this.$parent.$parent.loginNear('logout');
      this.logout = false;
      if (this.$route.name !== 'inicio') {
        localStorage.removeItem('store')
        this.$parent.$parent.$parent.$parent.$refs.navbar.to('inicio');
      }
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
