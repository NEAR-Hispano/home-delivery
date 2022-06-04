<template>
  <section>
    <!-- desktop -->
    <v-app-bar
      id="headerApp"
      color="transparent"
      height="100px"
    >
      <v-row class="jend">
        <v-col class="contheader space">
          <aside class="contleft acenter">
            <v-text-field
              v-model="search"
              solo
              hide-details="true"
              maxlength="20"
              class="eliminarmobile"
            >
            <template v-slot:prepend-inner>
              <img src="@/assets/icons/lupa.png" alt="icon">
            </template>

              <template v-slot:label>
                <span class="label">{{$t('labelBuscar')}}</span>
              </template>
            </v-text-field>

            <v-btn class="botones openOptions">
              <img width="100%" src="@/assets/icons/options.png" alt="options">
            </v-btn>

            <v-btn
              class="botones vermobile openSearch">
              <img src="@/assets/icons/lupa.png" alt="icon">
            </v-btn>
          </aside>

          <aside class="contright center">
            <v-btn v-for="(item, index) in dataLogin" :key="index" @click="item.key=='login'?loginNear(item.key):null"
              v-show="item.show" :class="{ openMenuLogout: item.key == 'logout' }"
              class="walletButton center">
              <span v-if="item.key=='login'">{{ $t(item.text) }}</span>
              <span v-if="item.key=='logout'">{{ item.text }}</span>
            </v-btn>

            <v-btn class="botones">
              <v-badge
                :content="messages"
                :value="messages"
                color="#3E2185"
              >
                <img width="100%" src="@/assets/icons/cart.png" alt="shopping cart">
              </v-badge>
            </v-btn>
          </aside>
        </v-col>
      </v-row>
      <MenuHeader ref="menu"></MenuHeader>
    </v-app-bar>
  </section>
</template>

<script>
  import MenuHeader from './MenuHeader.vue'
  import { PERFIL,PROFILE } from '@/services/api.js'
  import * as nearAPI from "near-api-js";
  import { CONFIG } from "@/services/api";
  const { connect, keyStores, WalletConnection } = nearAPI;

  export default {
    name: "header",
    i18n: require("./i18n"),
    components: { MenuHeader },
    data() {
      return {
        nearid: false,
        user: null,
        messages: 2,
        search: "",
        dataLogin: [
          {
            key: "login",
            text: "sesion",
            show: false,
          },
          {
            key: "logout",
            text: this.user,
            show: false,
          },
        ]
      };
    },
    mounted(){
      this.axios.defaults.headers.common.Authorization = 'token '
      if (localStorage.walletid && localStorage.walletid !== 'null') {
        this.nearid = true
      }
      // Configure button/menu by: Csar
      this.ChangeMenu(this.nearid)
    },
    methods: {
      async loginNear(action) {
        const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
        )
        const wallet = new WalletConnection(near);
        if (action === 'login') {
          wallet.requestSignIn(
            "min.mintick.testnet",
          );
        } else if (action === 'logout') {
          wallet.signOut()
          this.nearid = false;
          this.ChangeMenu(this.nearid)
        }
      },
      // Change buttom/menu by: Csar/Angel
      ChangeMenu(nearid){
        if (nearid === false){
          this.dataLogin[0].show = true;
          this.dataLogin[1].show = false;
          // localStorage.clear()
        }
        if (nearid === true){
          this.dataLogin[0].show = false;
          this.dataLogin[1].show = true;
          this.dataLogin[1].text = localStorage.walletid
        }
      },
    },
  };
</script>

<style src="./Header.scss" lang="scss"></style>
