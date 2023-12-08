<template>
  <div style="margin: 0; overflow: hidden" class="window-height">
    <a-scene
      v-if="!necesitaPermisos"
      vr-mode-ui="enabled: false;"
      embedded
      renderer="logarithmicDepthBuffer: true;"
      loading-screen="enabled: false;"
      arjs="sourceType: webcam; debugUIEnabled: true;trackingMethod: best;"
    >
      <a-marker preset="hiro" markerhandler> </a-marker>

      <a-assets>
        <img id="platform" src="/images/unida.jpg" />
        <a-asset-item
          id="optimerBoldFont"
          src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
        ></a-asset-item>
      </a-assets>

      <a-entity
        look-at="[gps-camera]"
        animation-mixer="loop: repeat"
        gltf-model="/assets/asset.gltf"
        scale="0.05 0.05 0.05"
        position="1 1.71 -2.71 "
      ></a-entity>

      <a-entity
        look-at="[gps-camera]"
        animation-mixer="loop: repeat"
        gltf-model="/assets/skeleton.gltf"
        rotation="0 80 4"
        scale="6 6 6"
        position="40 -7 1"
        material="color: gray; opacity: 0.5"
      ></a-entity>

      <a-circle src="#platform" radius=".5" position="5 1.71 -2.71 ">
      </a-circle>

      <a-entity
        geometry="primitive: box"
        position="-1 0.5 -3"
        rotation="0 45 0"
        color="#4CC3D9"
      ></a-entity>
      <a-entity
        geometry="primitive: sphere"
        position="0 1.25 -5"
        radius="1.0"
        color="#EF2D5E"
      ></a-entity>
      <a-entity
        geometry="primitive: cylinder"
        position="1 0.75 -3"
        radius="0.25"
        height="1.5"
        color="#FFC65D"
      ></a-entity>
      <a-entity
        geometry="primitive: plane"
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-entity>

      <!-- <a-box material="color: yellow" position="2 2 0" /> -->

      <a-entity camera look-controls position="0 2 10">
        <!-- Para dejar fijo un objeto en la cámara, se añade la entidad como hijo de la etiqueta -->
        <!-- <a-entity
          geometry="primitive: plane; height: 1; width: 1"
          position="0 0 -1"
          material="color: gray; opacity: 0.5"
          text="width: auto; color:white;value: This text will be 4 units wide."
        ></a-entity> -->

        <a-image
          geometry="primitive: plane; height: 53.3; width: 30"
          position="0 -0.15 -50"
          src="/images/entrada_uni.jpeg"
          text="width: auto; color:white;value: This text will be 4 units wide."
        ></a-image>

        <a-entity
          geometry="primitive: plane; height:3; width: 0.75"
          position="1 3 -10"
          rotation="0 -50 92.5"
          color="#EF2D5E"
        >
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Planta 3; size:0.35;"
            position="0 1.2 0"
            rotation="0 0 -90"
          ></a-entity>
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Aulas 17-25; size:0.2;"
            position="-0.25 1.2 0"
            rotation="0 0 -90"
          ></a-entity>
        </a-entity>
        <a-entity
          geometry="primitive: plane; height:3; width: 0.75"
          position="1 1 -10"
          rotation="0 -50 88"
          color="#EF2D5E"
        >
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Planta 2; size:0.35;"
            position="0 1.2 0"
            rotation="0 0 -90"
          >
          </a-entity>
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Aulas 9-16; size:0.2;"
            position="-0.25 1.2 0"
            rotation="0 0 -90"
          ></a-entity>
        </a-entity>

        <a-entity
          geometry="primitive: plane; height:1.75; width: 1"
          position="-1.5 1 -10"
          rotation="0 -45 87"
          color="#EF2D5E"
        >
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: B; size:0.35;"
            position="0 0.15 0"
            rotation="0 0 -90"
          >
          </a-entity>
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Bloque; size:0.2;"
            position="-0.25 0.4 0"
            rotation="0 0 -90"
          ></a-entity>
        </a-entity>

        <a-entity
          geometry="primitive: plane; height:3; width: 0.75"
          position="1 -1 -10"
          rotation="0 -50 81"
          color="#EF2D5E"
        >
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Planta 1; size:0.35;"
            position="0 1.2 0"
            rotation="0 0 -90"
          ></a-entity>
          <a-entity
            material="color:white; shadder:flat"
            text-geometry="value: Aulas 1-8; size:0.2;"
            position="-0.25 1.2 0"
            rotation="0 0 -90"
          ></a-entity>
        </a-entity>

        <!-- <a-entity
          id="entityTextBloque"
          material="color:#e1e1e1; blending: additive;"
          text-geometry="value: Bloque; size:0.015;baseline:center;"
          position="-0.055 0.15 -0.5"
          rotation="15 0 0"
        >
        </a-entity> -->

        <!-- <a-entity
          id="entityTextNivel"
          material="color:#e1e1e1"
          text-geometry="value: Nivel; size:0.0125;"
          text="baseline:center"
          position="-0.05 0.125 -0.5"
          rotation="15 0 0"
        ></a-entity> -->

        <!-- <a-entity
          text-geometry="value: Planta; size:0.01"
          position="0 0.275 -1"
        ></a-entity> -->
        <!-- <a-entity
          position="0 0 -1"
          text-geometry="value: Dog?; font: #optimerBoldFont"
        ></a-entity> -->

        <!-- <a-entity
          geometry="primitive: plane; height: 0.2; width: 0.2"
          position="0 0 -1"
          material="color: gray; opacity: 0.5"
        ></a-entity> -->
      </a-entity>
      <!-- <a-camera
        gps-new-camera
        gpsTimeInterval="1000000000"
        simulateLatitude="1"
        simulateLongitude="1"
        simulateAltitude="1"
        arjs-device-orientation-controls="smoothingFactor: 0.1"
      ></a-camera> -->
    </a-scene>
    <q-dialog v-model="necesitaPermisos" per sistent>
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
            necesita autorización para utilziar tu cámara y tu ubicación actual.
            <br />
            ¡No te preocupes! No recopilamos ningún tipo de información personal
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
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { api } from "boot/axios";
import { useQuasar, QSpinnerGears } from "quasar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const idLocation = $router.currentRoute.value.params.idLocation;

    const tieneAccesoACamara = ref(true);
    const tieneAccesoAUbicacion = ref(true);

    onBeforeMount(async () => {
      let accesoACamara = await navigator.permissions.query({ name: "camera" });
      let accesoAUbicacion = await navigator.permissions.query({
        name: "geolocation",
      });

      tieneAccesoACamara.value = accesoACamara.state === "granted";
      tieneAccesoAUbicacion.value = accesoAUbicacion.state === "granted";

      await api
        .get("contenido/" + idLocation)
        .then(({ data }) => {
          let { contenido } = data;
          console.log(contenido);

          let elBloque = document.getElementById("entityTextBloque");
          elBloque.setAttribute("text-geometry", {
            value: "Bloque " + contenido.bloque,
          });

          let elPlanta = document.getElementById("entityTextNivel");
          elPlanta.setAttribute("text-geometry", {
            value: "" + contenido.nivel,
          });
        })
        .catch(({ response }) => {
          console.log(response);
          $q.notify({
            icon: "las la-times",
            type: "negative",
            message: response.data.err,
            actions: [{ label: "Cerrar", color: "white" }],
            position: "center",
            timeout: 0,
          });
        });
    });

    AFRAME.registerComponent("markerhandler", {
      init: function () {
        this.el.sceneEl.addEventListener("markerFound", () => {
          $q.notify({
            icon: "las la-check-circle",
            type: "positive",
            message: "Contenido calibrado!",
            timeout: 3000,
            position: "top",
          });
        });
      },
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
        position: "top",
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
        position: "top",
      });
    }

    function notificarSolicitudAceptada(tipoPermiso) {
      notifySolicitudEnCurso({
        icon: "las la-check",
        type: "positive",
        spinner: false,
        message: `¡Acceso a ${tipoPermiso} otorgado!`,
        timeout: 2500,
        position: "top",
      });
    }

    return {
      idLocation,
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
