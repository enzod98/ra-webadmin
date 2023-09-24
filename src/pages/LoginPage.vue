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
        <q-btn label="Submit" type="submit" color="primary" />
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

export default {
  setup() {
    const $q = useQuasar();
    const username = ref("");
    const password = ref("");

    console.log(api.getUri());

    return {
      username,
      password,
      isPwd: ref(true),
      onSubmit() {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
