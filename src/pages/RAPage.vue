<template>
  <div>
    <div class="q-pa-md">
      <q-btn label="Open Dialog" color="primary" @click="dialog = true" />

      <q-dialog v-model="necesitaPermisos" persistent>
        <q-card class="q-py-lg">
          <q-card-section class="row items-center justify-center">
            <q-avatar
              icon="las la-info-circle"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm text-h6"
              >Necesitamos acceso al hardware de tu equipo</span
            >
          </q-card-section>

          <q-card-section class="row items-center q-mx-lg">
            <p class="text-center">
              Para una experiencia completa de realidad virtual, esta aplicación
              necesita autorización para utilziar tu cámara y tu ubicación
              actual. <br />
              ¡No te preocupes! No recopilamos ningún tipo de información
              personal
            </p>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              round
              icon="las la-camera"
              class="q-pa-md"
              :color="tieneAccesoACamara ? 'green' : 'red'"
              :disable="tieneAccesoACamara"
              @click="eventoSolicitarAccesoCamara"
            />
            <q-btn
              round
              icon="las la-map-marker"
              class="q-pa-md"
              :color="tieneAccesoAUbicacion ? 'green' : 'red'"
              :disable="tieneAccesoAUbicacion"
              @click="eventoSolicitarAccesoUbicacion"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const tieneAccesoACamara = ref(true);
    const tieneAccesoAUbicacion = ref(true);

    onBeforeMount(async () => {
      let accesoACamara = await navigator.permissions.query({ name: "camera" });
      let accesoAUbicacion = await navigator.permissions.query({
        name: "geolocation",
      });

      tieneAccesoACamara.value = accesoACamara.state === "granted";
      tieneAccesoAUbicacion.value = accesoAUbicacion.state === "granted";
    });

    const necesitaPermisos = computed(
      () => !(tieneAccesoACamara.value && tieneAccesoAUbicacion.value)
    );

    let notifySolicitudEnCurso;

    function notificarDenegacion(tipoPermiso) {
      notifySolicitudEnCurso({
        icon: "las la-times",
        type: "negative",
        spinner: false,
        message: `¡Acceso a ${tipoPermiso} denegado! Favor otorgue los permisos desde la configuración del navegador`,
        position: "center",
        actions: [
          {
            label: "Aceptar",
            color: "white",
          },
        ],
      });
    }

    function notificarSolicitudEnCurso() {
      notifySolicitudEnCurso = $q.notify({
        spinner: QSpinnerGears,
        group: false,
        type: "ongoing",
        message: "Solicitando permisos",
        timeout: 0,
        position: "center",
      });
    }

    function notificarSolicitudAceptada(tipoPermiso) {
      notifySolicitudEnCurso({
        icon: "las la-check",
        type: "positive",
        spinner: false,
        message: `¡Acceso a ${tipoPermiso} otorgado!`,
        timeout: 2500,
        position: "center",
      });
    }

    return {
      tieneAccesoACamara,
      tieneAccesoAUbicacion,
      necesitaPermisos,
      eventoSolicitarAccesoCamara: async function () {
        notificarSolicitudEnCurso();
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          notificarSolicitudAceptada("cámara");
          tieneAccesoACamara.value = true;
        } catch (err) {
          tieneAccesoACamara.value = false;
          notificarDenegacion("cámara");
          console.log(err);
        }
      },
      eventoSolicitarAccesoUbicacion: async function () {
        notificarSolicitudEnCurso();
        await navigator.geolocation.getCurrentPosition(
          () => {
            notificarSolicitudAceptada("ubicación");
            tieneAccesoAUbicacion.value = true;
          },
          (err) => {
            tieneAccesoAUbicacion.value = false;
            notificarDenegacion("ubicación");
          }
        );
      },
    };
  },
};
</script>
