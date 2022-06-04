<template>
  <v-app id="login" class="center" :style="`background-image: url('${$store.state.baseURL}themes/${$store.state.theme}/bg.png')`">
    <v-main>
      <v-container class="containerlogin">
        <v-col cols="11" sm="8" md="6"
          class="divcol center align"
        >
          <!-- content -->
          <div class="containerLogoLogin">
            <img class="logoLogin centera" src="" alt="logo">
          </div>
          <v-col class="paddvertical containerInput">
            <v-text-field
              v-for="(item, index) in dataLogin"
              v-bind:key="index"
              v-model="item.model"
              :type="item.type"
              background-color="#FFFFFF"
              solo
              flat
            >
            <template v-slot:label>
              <span class="h10_em">{{ item.label }}</span>
            </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="10" md="10" class="containerOptionsLogin paddtopdel">
            <div class="divrow center">
            <v-checkbox v-model="checkbox" id="checkbox" name="checkbox" color="#6667AB" />
            <label for="checkbox" class="desc h10_em">Recuerdame</label>
            </div>
            <a href="#" class="desc h10_em tcenter" @click="unlock()">
              ¿Olvidaste la contraseña?
            </a>
          </v-col>

          <v-btn id="botonLogin" @click="login()">
            <span class="h9_em">Login</span>
          </v-btn>
        </v-col>

        <a href="#" class="soporte desc2 h10_em">
          <strong>¿Necesita ayuda?</strong> Comuníquese con Soporte
        </a>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      Login: true,
      Unlock: false,
      dataLogin: [
        {
          model: "",
          type: "text",
          label: "Apodo o Correo"
        },
        {
          model: "",
          type: "password",
          label: "Contraseña"
        }
      ],
      checkbox: false
    }
  },
  methods: {
    login() {
      const user = this.dataLogin[0].model;
      const clave = this.dataLogin[1].model;
      console.log(user, clave)
    },
    unlock() {
      this.Unlock = true;
      this.Login = false
    }
  }
}
</script>

<style src="./Register.scss" lang="scss"></style>
