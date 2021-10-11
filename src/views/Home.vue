<template>
  <div class="home">
    <div id="chart">
      <ApexChart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      ></ApexChart>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";
  import ApexChart from "vue3-apexcharts";

  export default {
    name: "Home",
    components: {
      HelloWorld,
      ApexChart
    },
    data: function () {
      return {
        chartOptions: {
          chart: {
            id: "vuechart-example"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 35, 50, 49, 60, 70, 91]
          }
        ]
      };
    }
  };
</script>
