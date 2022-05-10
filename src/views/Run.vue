<template>
  <div class="home uk-padding-remove">
    <div class="uk-flex uk-margin-remove" uk-grid>
      <StatusNumbers class="uk-width-1-3"></StatusNumbers>
      <div class="uk-width-expand uk-padding-left" id="chart">
        <ApexChart
          type="line"
          height="400"
          :options="chartOptions"
          :series="chartSeries"
        >
        </ApexChart>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src
import ProfileChart from "@/components/ProfileChart";
import StatusNumbers from "@/components/StatusNumbers";
import ApexChart from "vue3-apexcharts";
import { mapGetters } from "vuex";

export default {
  name: "Running",
  components: {
    StatusNumbers,
    ApexChart,
    //Splitpanes,
    //Pane
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart",
        },
        stroke: {
          width: 1,
          dashArray: [0, 3, 5],
        },
        markers: {
          size: 3,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      currentSeries: "profile/getChartSeriesCurrent",
      actualSeries: "profile/getChartSeriesActual",
    }),
    chartSeries() {
      return this.currentSeries.concat(this.actualSeries);
    },
  },
  methods: {
    addProgressLine() {
      // this.app.$store.state.machineRunCounter
    }
  },
};
</script>
