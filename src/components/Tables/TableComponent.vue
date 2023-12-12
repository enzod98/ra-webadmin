<template>
  <div class="q-pa-md col-8">
    <q-table
      flat
      bordered
      title="Lugares más visitados"
      :rows="tableData"
      :columns="columns"
      color="primary"
      row-key="name"
      :rows-per-page-options="[]"
      icon-prev-page="las la-angle-left"
      icon-next-page="las la-angle-right"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="las la-archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile, useQuasar } from "quasar";

const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Descripción",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "Hoy",
    align: "center",
    label: "Hoy",
    field: "hoy",
    sortable: true,
  },
  { name: "ayer", label: "Ayer", field: "ayer", sortable: true },
  { name: "semana", label: "Semana", field: "semana", sortable: true },
  { name: "mes", label: "Mes", field: "mes", sortable: true },
  { name: "anio", label: "Año", field: "anio", sortable: true },
];

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

export default {
  name: "TableComponent",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();

    return {
      columns,
      exportTable() {
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            props.tableData.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("table-export.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Se denegó la descarga del archivo...",
            color: "negative",
            icon: "warning",
          });
        }
      },
    };
  },
};
</script>
