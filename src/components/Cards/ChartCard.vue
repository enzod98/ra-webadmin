<template>
  <div class="q-col-gutter-sm q-py-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card
        class="q-ma-xs no-shadow"
        bordered
        style="background-color: #38b1c5"
      >
        <q-card-section class="text-h6 text-white">
          {{ title }}
        </q-card-section>
        <q-card-section class="q-pa-none">
          <ChartBase :payload="payload" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ChartBase from "../Charts/ChartsBase.vue";

export default defineComponent({
  name: "ChartCard",
  components: {
    ChartBase,
  },
  props: {
    title: {
      type: String,
      default: "Inserte un título",
    },
    color: {
      type: String,
      default: "#e1e1e",
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props.chartData);
    return {
      payload: props.chartData,
    };
  },
});
</script>
