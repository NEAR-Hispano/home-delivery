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
  </section>
</template>

<script>
import { i18n } from "@/plugins/i18n";
export default {
  name: "headerMenu",
  i18n: require("./i18n"),
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
