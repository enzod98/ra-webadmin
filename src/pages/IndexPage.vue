<template>
  <q-page class="q-pa-md">
    <div class="row">
      <!-- <card-charts /> -->
      <ChartCard
        class="col"
        :chartData="datosDeGrafico"
        :title="'Visitas del día'"
      />
      <ChartCard
        class="col"
        :chartData="datosDeGrafico"
        :title="'Visitas de la semana'"
      />
      <ChartCard
        class="col"
        :chartData="datosDeGrafico"
        :title="'Visitas del mes'"
      />
    </div>
    <div class="row">
      <TableComponent class="col" />
    </div>
  </q-page>
</template>

<script>
// import CardCharts from "src/components/CardCharts.vue";
import ChartCard from "src/components/Cards/ChartCard.vue";
import TableComponent from "src/components/Tables/TableComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { ChartCard, TableComponent },
  name: "IndexPage",
  setup() {
    return {
      datosDeGrafico: {
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
        series: [{ type: "line", areaStyle: {}, smooth: false }],
        dataset: {
          source: [
            { month: "Jan", "Unique Visit": 296, "Page View": 548 },
            {
              month: "Feb",
              "Unique Visit": 1181,
              "Page View": 714,
            },
            { month: "Mar", "Unique Visit": 235, "Page View": 961 },
            {
              month: "Apr",
              "Unique Visit": 294,
              "Page View": 580,
            },
            { month: "May", "Unique Visit": 765, "Page View": 730 },
            {
              month: "Jun",
              "Unique Visit": 412,
              "Page View": 1249,
            },
            { month: "Jul", "Unique Visit": 1125, "Page View": 267 },
            {
              month: "Aug",
              "Unique Visit": 800,
              "Page View": 251,
            },
            { month: "Sep", "Unique Visit": 948, "Page View": 1043 },
            {
              month: "Oct",
              "Unique Visit": 1046,
              "Page View": 1118,
            },
            { month: "Nov", "Unique Visit": 363, "Page View": 573 },
            {
              month: "Dec",
              "Unique Visit": 909,
              "Page View": 283,
            },
          ],
        },
        color: ["#45c2c5"],
      },
    };
  },
});
</script>
