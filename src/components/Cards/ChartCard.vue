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
import { defineComponent, ref, computed, onBeforeMount } from "vue";
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
    const payload = computed(() => {
      return {
        tooltip: { show: true },
        title: {
          show: true,
          textStyle: { color: "rgba(0, 0, 0 , .87)", fontFamily: "sans-serif" },
        },
        grid: { containLabel: true, left: "0", bottom: "0", right: "0" },
        xAxis: {
          show: false,
          type: "category",
          axisLine: {
            lineStyle: { color: "rgba(0, 0, 0 , .54)", type: "dashed" },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              show: true,
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed",
            },
          },
          axisLabel: { show: false },
          boundaryGap: false,
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            lineStyle: { color: "rgba(0, 0, 0 , .54)", type: "dashed" },
          },
          axisLabel: { show: false },
          splitLine: { lineStyle: { type: "dashed" } },
          axisTick: {
            show: true,
            lineStyle: {
              show: true,
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed",
            },
          },
        },
        series: [{ type: "bar", areaStyle: {}, smooth: false }],
        dataset: {
          source: props.chartData,
        },
        color: ["#45c2c5"],
      };
    });

    return {
      payload,
    };
  },
});
</script>
