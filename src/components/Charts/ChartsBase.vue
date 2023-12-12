<template>
  <ECharts
    :option="payload"
    class="q-mt-md"
    :resizable="true"
    autoresize
    style="height: 250px"
  />
</template>

<script>
import { defineComponent } from "vue";
import * as echarts from "echarts";
import ECharts from "vue-echarts";

export default defineComponent({
  name: "ChartBase",
  components: {
    ECharts,
  },
  props: {
    payload: {
      type: Object,
      required: true,
    },
  },
  setup(prop) {},
});
</script>
