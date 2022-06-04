<template>
  <section id="miMenu" class="parentForm section">
    <Alerts ref="alerts"></Alerts>
    <MenuForms ref="menu"></MenuForms>
    <v-col class="contmimenu divcol gap2">
      <aside class="contup divrow">
        <v-btn class="back" icon href="#/tienda">
          <v-icon size="clamp(1.5em, 2.5vw, 2.5em)">mdi-arrow-left</v-icon>
        </v-btn>

        <div class="divcol">
          <h1 class="h7_em">Mi Menú</h1>
          <h2 class="h9_em">Organiza tu menu</h2>
        </div>
      </aside>

      <aside class="contdown">
        <v-card color="transparent">
          <label for="foto" class="h10_em"> Foto del platillo </label>

          <v-file-input
            v-model="menu.img"
            id="foto"
            solo
            prepend-icon=""
            :clearable="false"
            class="input-file"
            @change="ImagePreview()"
          >
            <template v-slot:selection>
              <img :src="url" alt="Image selected" />
            </template>
          </v-file-input>
        </v-card>
        <v-card color="transparent">
          <label for="nombre" class="h10_em"> Nombre del plato </label>

          <v-text-field v-model="menu.name" id="telefono" solo></v-text-field>
        </v-card>
        <v-card color="transparent">
          <aside>
            <label for="categoria" class="h10_em"> Categoria </label>
          </aside>
          <v-select
            v-model="menu.category"
            :items="listCategoria"
            item-text="name"
            item-value="name"
            id="categoria"
            solo
          >
          </v-select>
        </v-card>
        <v-card color="transparent">
          <label for="descripcion" class="h10_em"> Descripción </label>

          <v-text-field
            v-model="menu.description"
            id="descripcion"
            solo
          ></v-text-field>
        </v-card>
        <v-card
          color="transparent"
          style="display: flex"
          class="space contprecio"
        >
          <aside>
            <label for="precio" class="h10_em"> Precio </label>

            <v-text-field v-model="menu.price" id="precio" type="number" solo></v-text-field>
          </aside>
          <v-btn @click="Addmenu()" class="h11_em"> Agregar </v-btn>
        </v-card>
      </aside>

      <aside class="contSlide divcol">
        <v-card
          v-for="(item, i) in dataSlideMenu"
          :key="i"
          color="transparent"
          class="space fill_w"
          style="display: flex"
        >
          <aside class="firstcont divrow">
            <img class="foto" :src="item.img" alt="Menu Image" />
            <div class="child1 divcol jcenter">
              <label class="h9_em">{{ item.nombre }}</label>
              <div class="child2 space">
                <span class="h9_em bold">{{ item.categoria }}</span>
                <span class="h9_em bold">{{ item.precio }}$</span>
              </div>
            </div>
          </aside>

          <aside class="contdesc">
            <p class="h10_em semibold p">{{ item.desc }}</p>
          </aside>

          <aside class="controls acenter spacee" style="gap: 0.5em">
            <v-tooltip bottom color="var(--clr-btn)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="add" icon v-bind="attrs" v-on="on">
                  <img src="@/assets/icons/pencil.png" alt="Add Menu" />
                </v-btn>
              </template>
              <span class="clr-text-btn">Editar</span>
            </v-tooltip>

            <v-tooltip bottom color="#ff4081">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <img src="@/assets/icons/eliminar.png" alt="Add Menu" />
                </v-btn>
              </template>
              <span style="color: #ffffff !important">Eliminar</span>
            </v-tooltip>
          </aside>
        </v-card>
      </aside>
    </v-col>
  </section>
</template>

<script>
import Alerts from "@/components/alerts/Alerts.vue";
import MenuForms from "../components/MenuForms.vue";
import * as nearAPI from 'near-api-js'
import { CONFIG, IPFS } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
export default {
  name: "miMenu",
  components: {
    MenuForms,
    Alerts,
  },
  data() {
    return {
      categoria: "",
      listCategoria: ["uno", "dos", "tres"],
      url: null,
      image: null,
      menu: {},
      walletid: null,
      foto: false,
      dataSlideMenu: [
        {
          img: require("@/assets/icons/inicio.png"),
          nombre: "LUMPIAS CON QUESO",
          categoria: "CHINO",
          precio: "1000",
          desc: "rico platillo para toda la familia pues",
        },
        {
          img: require("@/assets/icons/inicio.png"),
          nombre: "HAMBURGUESAS TIRPLE CARNE",
          categoria: "FRITURA",
          precio: "1000",
          desc: "compra y lleva ahora 20% de descuenta para ¿, oferta limitada",
        },
      ],
    };
  },
  mounted() {
    this.GetCategorys()
  },
  methods: {
    ImagePreview() {
      this.url = URL.createObjectURL(this.menu.img);
    },
    async GetCategorys() {
      try {
        const CONTRACT_NAME = 'contract2.ccoronel7.testnet'
        // Connect to NEAR
        const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
        // Create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          viewMethods: ['get_category'],
          sender: wallet.account()
        })
        if (wallet.isSignedIn()) {
          await contract.get_category({
          }).then((res) => {
            console.log(res)
            this.listCategoria = res
          })
        }
      } catch (e) {
        // Router
        console.log(e)
      }
    },
    async Addmenu () {
        const CONTRACT_NAME = 'contract2.ccoronel7.testnet'
        const direccionIpfs = '.ipfs.dweb.link'
        // connect to NEAR
        const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
        )
        // create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ['set_menu'],
          sender: wallet.account()
        })
        const formData = new FormData()
        formData.append('file', this.menu.img)
        console.log(this.menu.img)
        await this.axios.post(IPFS, formData).then((data) => {
          let prices = parseInt(this.menu.price)
          contract.set_menu({
            name: this.menu.name,
            img: 'https://' + data.data + direccionIpfs + '/' + data.nombre,
            user_id: wallet.account(),
            description: this.menu.description,
            price: prices,
            category: this.menu.category
          }).then((response) => {
            console.log(response)
          }).catch((e) =>{
            console.log(e)
          }) 
        })  },
    showAlert() {
      this.$refs.alerts.Alerts("success");
      this.$refs.alerts.Alerts("cancel");
    },
  },
};
</script>

<style src="./MiMenu.scss" lang="scss" />
