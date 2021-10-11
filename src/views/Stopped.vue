<template>
  <div class="home uk-padding-remove">
    <div class="uk-flex uk-margin-remove" uk-grid>
      <StatusNumbers class="uk-width-1-3"></StatusNumbers>
      <div class="uk-width-expand uk-padding-left" id="chart">
        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
  // @ is an alias to /src
  import StatusNumbers from "@/components/StatusNumbers"
  //import { Splitpanes, Pane } from 'splitpanes'

  export default {
    name: "Stopped",
    components: {
      StatusNumbers
      //Splitpanes,
      //Pane
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
        ],
      };
    }
  };
</script>