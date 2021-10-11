<template>
  <ApexChart type="line" :height="height" :options="chartOptions" :series="series"
    @markerClick="this.$emit('markerClick')">
  </ApexChart>
</template>

<script>
  // @ is an alias to /src
  import ApexChart from "vue3-apexcharts";

  const events = [
    "animationEnd",
    "beforeMount",
    "mounted",
    "updated",
    "click",
    "mouseMove",
    "mouseLeave",
    "legendClick",
    "markerClick",
    "selection",
    "dataPointSelection",
    "dataPointMouseEnter",
    "dataPointMouseLeave",
    "beforeZoom",
    "beforeResetZoom",
    "zoomed",
    "scrolled",
    "brushScrolled"
  ];

  export default {
    //name: "ProfileCHart",
    components: {
      ApexChart,
    },
    props: {
      'height': Number,
      'series': Array,
      'stroke': {
        type: Object,
        default: () => { return {} }
      },
      'markers': {
        type: Object,
        default: () => { return {} }
      },
      'selection': {
        type: Boolean,
        default: true
      },
      'zoom': {
        type: Boolean,
        default: true
      },
    },
    mounted() {
      console.log(this.chartOptions);
    },
    data: function () {
      return {
        chartOptions: {
          chart: {
            events: {
              mounted: function (chartContext, config) {
                console.log("Chart mount")
              },
              click: function (event, chartContext, config) {
                console.log("Chart click")
              }
            },
            id: "vuechart",
            selection: {
              enabled: this.selection,
            },
            zoom: {
              enabled: this.zoom
            },

          },
          xaxis: {
          },
          stroke: this.stroke,
          markers: this.markers,
        },
      };
    },
    computed: {
    },
    emits: events,
  };
</script>

<style lang="scss" scoped>
  @use "../assets/css/variables";
</style>