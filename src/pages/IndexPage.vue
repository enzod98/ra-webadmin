<template>
  <q-page class="q-pa-md">
    <div class="row">
      <!-- <card-charts /> -->
      <ChartCard
        class="col"
        :chartData="chartDiaData"
        :title="'Visitas del día'"
      />
      <ChartCard
        class="col"
        :chartData="chartSemanaData"
        :title="'Visitas de la semana'"
      />
      <ChartCard
        class="col"
        :chartData="chartMesData"
        :title="'Visitas del mes'"
      />
    </div>
    <div class="row">
      <TableComponent
        class="col-12 col-md-8 col-xl-6"
        :tableData="apiVisitasData"
      />
    </div>
  </q-page>
</template>

<script>
// import CardCharts from "src/components/CardCharts.vue";
import ChartCard from "src/components/Cards/ChartCard.vue";
import TableComponent from "src/components/Tables/TableComponent.vue";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  components: { ChartCard, TableComponent },
  name: "IndexPage",
  setup() {
    const apiVisitasData = ref([]);

    onBeforeMount(async () => {
      await api
        .get("visitas/get-for-reports/")
        .then(({ data }) => {
          apiVisitasData.value = data.visitas;
        })
        .catch((err) => console.log);
    });

    const chartDiaData = computed(() => {
      let data = [];
      for (let visitasPorLugar of apiVisitasData.value) {
        data.push({
          descripcion: visitasPorLugar.descripcion,
          visitas: visitasPorLugar.hoy,
        });
      }
      return data;
    });

    const chartSemanaData = computed(() => {
      let data = [];
      for (let visitasPorLugar of apiVisitasData.value) {
        data.push({
          descripcion: visitasPorLugar.descripcion,
          visitas: visitasPorLugar.semana,
        });
      }
      return data;
    });

    const chartMesData = computed(() => {
      let data = [];
      for (let visitasPorLugar of apiVisitasData.value) {
        data.push({
          descripcion: visitasPorLugar.descripcion,
          visitas: visitasPorLugar.mes,
        });
      }
      return data;
    });

    return {
      apiVisitasData,
      chartDiaData,
      chartSemanaData,
      chartMesData,
    };
  },
});
</script>
