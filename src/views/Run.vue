<template>
  <div class="home uk-padding-remove">
    <div class="uk-flex uk-margin-remove" uk-grid>
        <StatusNumbers class = "uk-width-1-3"></StatusNumbers>
      <div class="uk-width-expand uk-padding-left" id="chart">
        <ApexChart
          ref="chart"
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
import Vue from "vue";
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
        annotations: {
          xaxis: [
            {
              x: this.$store.state.machine.machineRunCounter / 1000,
              borderColor: "#775DD0",
            },
          ],
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
    clearAnnotations() {
      this.$clearAnnotations();
    },
    addXaxisAnnotation() {
      this.$addXaxisAnnotation();
    },
    updateChart() {
      if (this.$store.state.machine.isRunning === true) {
        if (this.$refs.chart != null) {
          this.$refs.chart.clearAnnotations();
          this.$refs.chart.addXaxisAnnotation({
            x: this.$store.state.machine.machineRunCounter / 1000,
            borderColor: "#775DD0",
          });
          // this.chartOptions.annotations.xaxis[0].x =
          //   this.$store.state.machine.machineRunCounter / 1000;
          // this.$forceUpdate();
          return;
        }
      } else {
        return;
      }
    },
  },
  mounted: function () {
    window.setInterval(this.updateChart, 500);
  },
};
</script>
