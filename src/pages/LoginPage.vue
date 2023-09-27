<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input rounded filled v-model="username" label="Usuario">
        <template v-slot:prepend>
          <q-icon name="las la-user" />
        </template>
      </q-input>
      <q-input
        v-model="password"
        rounded
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Contraseña"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'las la-low-vision' : 'las la-eye'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:prepend>
          <q-icon name="las la-key" />
        </template>
      </q-input>
      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          :loading="sendingData"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";

import { setUserTokenSession } from "../composables/cookiesComposable";

export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const username = ref("");
    const password = ref("");
    const sendingData = ref(false);

    const onSubmit = async () => {
      sendingData.value = true;
      await api
        .post("login", { email: username.value, password: password.value })
        .then(({ data }) => {
          // console.log(data);
          setUserTokenSession(data.token);
          $q.notify({
            icon: "las la-check-circle",
            type: "positive",
            message: "Sesión iniciada! Redireccionando...",
            timeout: 3000,
            position: "top",
          });
          $router.push("/");
        })
        .catch((err) => {
          // console.log(err.response.data);
          $q.notify({
            icon: "las la-exclamation-triangle",
            type: "negative",
            message: err.response.data.error.message,
            timeout: 3000,
            position: "top",
          });
        });
      sendingData.value = false;
    };

    return {
      username,
      password,
      sendingData,
      isPwd: ref(true),
      onSubmit,

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
