<template>
  <q-layout view="hHh lpR lfr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="las la-bars" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-img class="absolute-top bg-primary" style="height: 150px">
        <div class="absolute-center bg-transparent text-center">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/images/usuario.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>

      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple @click="signOut">
            <q-item-section avatar>
              <q-icon name="las la-sign-out-alt" />
            </q-item-section>

            <q-item-section> Cerrar sesión </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { removeUserTokenSession } from "../composables/cookiesComposable";

const $router = useRouter();

export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const leftDrawerOpen = ref(false);
    const signOut = () => {
      removeUserTokenSession();
      $router.push("/login");
      $q.notify({
        icon: "las la-exclamation-triangle",
        type: "negative",
        message: "Sesión finalizada.",
        timeout: 3000,
        position: "top",
      });
    };

    return {
      leftDrawerOpen,
      signOut,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
