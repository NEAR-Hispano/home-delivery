<template>
  <section id="tienda" class="parent">
    <v-col class="contup astart">
      <img src="@/assets/images/tienda-title.png" alt="Titulo tienda">

      <v-tooltip right color="var(--clr-btn)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="add" icon v-bind="attrs" v-on="on" href="#/mi-tienda">
            <img src="@/assets/icons/pencil.png" alt="Add Menu">
          </v-btn>
        </template>
        <span class="clr-text-btn">Editar datos de tienda</span>
      </v-tooltip>
    </v-col>

    <v-col class="contdown">
      <aside class="wrapper divcol">
        <div class="center">
          <h2 class="h6_em">Menú</h2>

          <v-tooltip right color="var(--clr-btn)">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="add" icon v-bind="attrs" v-on="on" href="#/mi-menu">
                <img src="@/assets/icons/plus.png" alt="add menu">
              </v-btn>
            </template>
            <span class="clr-text-btn">Agregar nuevo menú</span>
          </v-tooltip>
        </div>

        <v-col class="divcol gap2">
          <v-card v-for="(item,i) in dataMenuTienda" :key="i"
            style="display:flex" class="acenter">
            <aside class="divrow">
              <img src="@/assets/icons/inicio.png" alt="Menu Image">

              <div class="contInfo divcol jcenter">
                <label class="h7_em">{{ item.nombre }}</label>
                <div class="space">
                  <span class="h9_em semibold">{{ item.categoria }}</span>
                  <span class="h9_em semibol">{{ item.precio }}$</span>
                </div>
              </div>
            </aside>
          </v-card>
        </v-col>
      </aside>
    </v-col>
  </section>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

export default {
  name: "tienda",
  data() {
    return {
      data: {},
      dataMenuTienda: [
        {
          nombre: "herian",
          categoria: "css",
          precio: "100"
        },
        {
          nombre: "cesar",
          categoria: "django",
          precio: "100"
        },
        {
          nombre: "angel",
          categoria: "django",
          precio: "100"
        },
        {
          nombre: "herian",
          categoria: "css",
          precio: "100"
        },
        {
          nombre: "cesar",
          categoria: "django",
          precio: "100"
        },
        {
          nombre: "angel",
          categoria: "django",
          precio: "100"
        },
      ]
    }
  },
  mounted() {
    this.VerifyStore()
  },
  methods: {
    async VerifyStore() {
      try {
        const CONTRACT_NAME = 'contract2.ccoronel7.testnet'
        // Connect to NEAR
        const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
        // Create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          viewMethods: ['get_store'],
          sender: wallet.account()
        })
        if (wallet.isSignedIn()) {
          await contract.get_store({
            user_id: wallet.getAccountId()
          }).then((res) => {
            this.data = res
            localStorage.setItem('store', JSON.stringify(this.data))
          })
        }
      } catch (e) {
        // Router
        this.$router.push({name:'MiTienda'})
      }
    },
  }
};
</script>

<style src="./Tienda.scss" lang="scss" />
