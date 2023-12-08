<template>
  <div class="q-pa-md col-8">
    <q-table
      flat
      bordered
      title="Lugares más visitados"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
      :rows-per-page-options="[]"
      icon-prev-page="las la-angle-left"
      icon-next-page="las la-angle-right"
      column-sort-order=""
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
    name: "name",
    required: true,
    label: "Descripción",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
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
  { name: "semana", label: "Semana", field: "semana" },
  { name: "mes", label: "Mes", field: "mes" },
  { name: "anio", label: "Año", field: "anio" },
];

const rows = [
  {
    name: "Entrada Principal",
    hoy: 20,
    ayer: 25,
    semana: 45,
    mes: 120,
    anio: 751,
  },
  {
    name: "Nutrición",
    hoy: 17,
    ayer: 41,
    semana: 124,
    mes: 414,
    anio: 956,
  },
  {
    name: "Cantina",
    hoy: 262,
    ayer: 16.0,
    semana: 23,
    mes: 60,
    anio: 337,
  },
  {
    name: "Sistemas",
    hoy: 305,
    ayer: 3.7,
    semana: 67,
    mes: 4,
    anio: 413,
  },
  {
    name: "Auditorio",
    hoy: 356,
    ayer: 16,
    semana: 49,
    mes: 3.9,
    anio: 327,
  },
];

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  name: "TableComponent",
  setup() {
    const $q = useQuasar();

    return {
      columns,
      rows,

      exportTable() {
        // naive encoding to csv format
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.map((row) =>
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
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
    };
  },
};
</script>
