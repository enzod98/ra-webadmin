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
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
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
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
