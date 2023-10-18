<template>
  <div class="window-height bg-primary">
    <div class="q-pa-md row justify-center q-pt-xl">
      <q-card class="col-12 col-md-8 card-radius">
        <h3 class="text-center col-12">Iniciar Sesión</h3>
        <div class="q-pa-xl">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md items-center"
          >
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
                label="Ingresar"
                type="submit"
                color="primary"
                :loading="sendingData"
              />
              <q-btn
                label="Limpiar campos"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </div>
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
          console.log(data);
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

<style scoped>
.card-radius {
  /* border: 5px solid red; */
  border-top-left-radius: 5rem !important;
  border-bottom-right-radius: 5rem !important;
}
</style>
