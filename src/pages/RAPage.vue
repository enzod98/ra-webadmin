<template>
  <div
    v-if="!necesitaPermisos"
    style="margin: 0; overflow: hidden"
    class="window-height"
  >
    <a-scene
      vr-mode-ui="enabled: false;"
      embedded
      renderer="logarithmicDepthBuffer: true;"
      loading-screen="enabled: false;"
      arjs="sourceType: webcam; debugUIEnabled: true;trackingMethod: best;"
      id="escena"
    >
      <a-marker preset="hiro" markerhandler> </a-marker>

      <!-- <a-entity
        look-at="[gps-camera]"
        animation-mixer="loop: repeat"
        gltf-model="/assets/skeleton.gltf"
        rotation="0 80 4"
        scale="6 6 6"
        position="40 -7 1"
        material="color: gray; opacity: 0.5"
      ></a-entity> -->

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

      <a-entity camera look-controls position="0 2 10">
        <!-- Para dejar fijo un objeto en la cámara, se añade la entidad como hijo de la etiqueta -->
        <a-entity
          geometry="primitive: plane; height: 0.2; width: 0.2"
          position="0 0 -1"
          material="color: gray; opacity: 0.2"
        ></a-entity>

        <a-entity
          id="entityTextBloque"
          material="color:#e1e1e1; blending: additive;"
          text-geometry="value: Bloque; size:0.015;baseline:center;"
          position="-0.055 0.15 -0.5"
          rotation="15 0 0"
        >
        </a-entity>

        <a-entity
          id="entityTextNivel"
          material="color:#e1e1e1"
          text-geometry="value: Nivel; size:0.0125;"
          text="baseline:center"
          position="-0.05 0.125 -0.5"
          rotation="15 0 0"
        ></a-entity>

        <a-entity
          id="entityTextDescripcion"
          material="color:#e1e1e1"
          text-geometry="value: Nivel; size:0.0125;"
          text="baseline:center"
          position="-0.05 -0.125 -0.5"
          rotation="-15 0 0"
        ></a-entity>
      </a-entity>
    </a-scene>
  </div>
  <q-dialog v-model="necesitaPermisos" persistent position="bottom">
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

      eventoSolicitarAccesoCamara();
      if (!necesitaPermisos.value) await generarContenido();
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

    async function generarContenido() {
      await api
        .get("contenido/" + idLocation)
        .then(async ({ data }) => {
          let { contenido } = data;
          let { entidades } = data;
          let { entidadesHijas } = data;
          // console.log(contenido);
          // console.log(entidades);
          // console.log(entidadesHijas);

          let elBloque = document.getElementById("entityTextBloque");
          elBloque.setAttribute("text-geometry", {
            value: "Bloque " + contenido.bloque,
          });

          let elNivel = document.getElementById("entityTextNivel");
          elNivel.setAttribute("text-geometry", {
            value: "" + contenido.nivel,
          });

          let elDescripcion = document.getElementById("entityTextDescripcion");
          elDescripcion.setAttribute("text-geometry", {
            value: "" + contenido.descripcion,
          });

          // let elEscena = document.getElementById("escena");
          // for (entidad of entidades) {
          //   let nuevaEntidad = document.createElement("a-entity");
          //   for (propiedad of entidad.propiedades) {
          //     nuevaEntidad.setAttribute(propiedad.atributo, propiedad.valor);
          //   }
          //   entidadesHijas = entidadesHijas.filter(
          //     (entidadHija) => entidadHija.id_entidad == entidad._id
          //   );
          //   for (entidadHija of entidadesHijas) {
          //     let nuevaEntidadHija = document.createElement("a-entity");
          //     for (propiedad of entidadHija.propiedades) {
          //       nuevaEntidadHija.setAttribute(
          //         propiedad.atributo,
          //         propiedad.valor
          //       );
          //     }
          //     nuevaEntidad.appendChild(nuevaEntidadHija);
          //   }
          //   elEscena.appendChild(nuevaEntidad);
          // }
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
    }

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

    async function eventoSolicitarAccesoCamara() {
      notificarSolicitudEnCurso();
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        notificarSolicitudAceptada("cámara");
        tieneAccesoACamara.value = true;
        if (!necesitaPermisos.value) await generarContenido();
      } catch (err) {
        tieneAccesoACamara.value = false;
        notificarDenegacion("cámara");
        console.log(err);
      }
    }

    async function eventoSolicitarAccesoUbicacion() {
      notificarSolicitudEnCurso();
      await navigator.geolocation.getCurrentPosition(
        async () => {
          notificarSolicitudAceptada("ubicación");
          tieneAccesoAUbicacion.value = true;
          if (!necesitaPermisos.value) await generarContenido();
        },
        (err) => {
          tieneAccesoAUbicacion.value = false;
          notificarDenegacion("ubicación");
        }
      );
    }

    return {
      idLocation,
      tieneAccesoACamara,
      tieneAccesoAUbicacion,
      necesitaPermisos,
      eventoSolicitarAccesoCamara,
      eventoSolicitarAccesoUbicacion,
    };
  },
};
</script>
