<template>
  <section id="miPerfil" class="parentForm section">
    <v-col class="contmiperfil divcol gap2">
      <aside class="contup divrow">
        <v-btn class="back" icon href="#/tienda">
          <v-icon size="clamp(1.5em, 2.5vw, 2.5em)">mdi-arrow-left</v-icon>
        </v-btn>
        <div style="margin-left: 5mm;" class="divcol">
          <h1 class="h7_em">Mi Tienda</h1>
          <h2 class="h9_em">Introduzca la información de la tienda</h2>
        </div>
      </aside>
      <aside class="contdown">
        <v-card color="transparent">
          <label
            for="walet"
            class="h10_em"
          >
            Nombre de la tienda
          </label>
          <v-text-field
            id="wallet"
            v-model="store.name"
            solo
          ></v-text-field>
        </v-card>
        <v-card color="transparent">
          <label
            for="walet"
            class="h10_em"
          >
            Wallet de la tienda
          </label>
          <v-text-field
            id="wallet"
            v-model="store.wallet"
            solo
          ></v-text-field>
        </v-card>
        <v-card color="transparent">
          <label
            for="Dirección"
            class="h10_em"
          >
            Dirección
          </label>
          <v-text-field
            id="Dirección"
            v-model="store.address"
            solo
          ></v-text-field>
        </v-card>
        <v-card color="transparent">
          <label
            for="telefono"
            class="h10_em"
          >
            Teléfono
          </label>

          <v-text-field
            id="telefono"
            v-model="store.phone"
            solo
          ></v-text-field>
        </v-card>
        <v-card color="transparent">
          <label
            for="telefono"
            class="h10_em"
          >
            Logo
          </label>
          <v-text-field
            id="foto"
            v-model="store.logo"
            solo
          ></v-text-field>
          <!-- <v-file-input
            v-model="store.logo"
            id="foto"
            class="input-file"
            prepend-icon=""
            solo
            @change="ImagePreview()"
          >
            <template v-slot:selection>
              <img :src="url" alt="Image selected">
            </template>
          </v-file-input> -->
        </v-card>
      </aside>

      <aside class="contsubmit center">
        <v-btn v-if="save" @click="PutStore()">
          <span class="h10_em">Guardaaar</span>
        </v-btn>
        <v-btn v-else @click="SetStore()">
          <span class="h10_em">Guardar</span>
        </v-btn>
      </aside>
    </v-col>
  </section>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

export default {
  name: "miTienda",
  data() {
    return {
      url: null,
      image: null,
      walletid: null,
      save: false,
      // foto: false,
      // foto2: false,
      store: {},
      perfil: {wallet: localStorage.getItem('walletid')},
    }
  },
  mounted(){
    this.$parent.$parent.$parent.$refs.navbar.to({key: null});
    this.SaveData()
  },
  methods: {
    SaveData(){
      if (typeof localStorage.store !== 'undefined' && localStorage.store !== 'null') {
        this.save = true
        const d = JSON.parse(localStorage.store)
        this.store = d
      }
    },
    async PutStore() {
      const data = localStorage.store
      localStorage.store = JSON.stringify(this.store)
      try {
        const CONTRACT_NAME = 'contract2.ccoronel7.testnet'
        // connect to NEAR
        const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
        // create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ['put_store'],
          sender: wallet.account()
        })
        if (wallet.isSignedIn()) {
          await contract.put_store({
            user_id: wallet.getAccountId(),
            name:this.store.name,
            address:this.store.address,
            phone:this.store.phone,
            wallet:this.store.wallet,
            logo:this.store.logo,
          }).then((res) => {
            console.log(res)
          })
        }
      } catch (e) {
        localStorage.store = data
        console.log(e)
      }
    },
    async SetStore() {
      localStorage.setItem('store',JSON.stringify(this.store))
      try {
        const CONTRACT_NAME = 'contract2.ccoronel7.testnet'
        // Connect to NEAR
        const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
        // Create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ['set_store'],
          sender: wallet.account()
        })
        if (wallet.isSignedIn()) {
          await contract.set_store({
            user_id: wallet.getAccountId(),
            name:this.store.name,
            address:this.store.address,
            phone:this.store.phone,
            wallet:this.store.wallet,
            logo:this.store.logo,
          }).then((res) => {
            this.store = res
          })
        }
      } catch (e) {
        localStorage.removeItem('store');
        console.log(e)
      }
    },
    ImagePreview() {
      this.url= URL.createObjectURL(this.image)
    },
    // AcceptVerificator(item) {
    //   if (item == "delivery") {
    //     this.perfil.delivery = true
    //     this.foto = true
    //   }
    //   if (item == "vendedor") {
    //     this.perfil.vendedor = true
    //     this.foto2 = true
    //   }
    // },
    // CancelVerificator(item) {
    //   if (item == "delivery") {
    //     this.perfil.delivery =  false
    //     this.foto = false
    //   }
    //   if (item == "vendedor") {
    //     this.perfil.vendedor = false
    //     this.foto2 = false
    //   }
    // }
  },
};
</script>

<style src="./MiTienda.scss" lang="scss" />
