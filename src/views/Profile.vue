<template>
  <div class="home uk-padding-remove">
    <div class="uk-section uk-section-muted uk-padding-remove uk-margin-remove">
      <div class="uk-flex uk-padding-small uk-margin-remove uk-child-width-1-3" uk-grid>
        <div class="uk-button-group uk-margin-remove uk-padding-remove">
          <button :disabled="selectedMarker === -1" class="uk-button uk-button-default"
            uk-toggle="target: #modal-confirm-delete-point">
            <span uk-icon="icon: minus"></span></button>
          <button :disabled="selectedMarker === -1" class="uk-button uk-button-default"
            uk-toggle="target: #modal-edit-point">
            <span class="uk-text">Edit</span></button>
          <button class="uk-button uk-button-default" @click="addPoint">
            <span uk-icon="icon: plus"></span></button>
        </div>
        <div class="uk-flex uk-flex-center uk-padding-remove uk-margin-remove ">
          <button class="uk-button uk-button-small uk-button-default" :disabled="selectedMarker === -1"
            @click="decreaseSelection">
            <span uk-icon="icon: chevron-left;ratio: 2"></span></button>
          <p class="uk-margin-auto-vertical uk-margin-right uk-margin-left"
            :class="{'uk-text-muted': selectedMarker === -1, 'uk-text-small': selectedMarker === -1}">
            {{ selectedMarker === -1 ? 'Select a point to edit': selectedMarkerTime + 's' }} </p>
          <button class="uk-button uk-button-default uk-button-small" :disabled="selectedMarker === -1"
            @click="increaseSelection">
            <span uk-icon="icon: chevron-right;ratio: 2"></span></button>
        </div>
      </div>
    </div>
    <div class="uk-flex uk-margin-remove" uk-grid>
      <div class="uk-width-expand uk-padding-remove" id="chart">
        <ApexChart ref="chart" type="line" height="370" :options="chartOptions" :series="chartSeries"
          @markerClick="markerClick">
        </ApexChart>
      </div>
    </div>
    <hr class="uk-margin-remove-top">
    <div class="uk-margin uk-margin-large-bottom uk-text-right">
      <button class="uk-button uk-button-default" type="button"
        uk-toggle="target: #modal-confirm-cancel-profile">Cancel</button>
      <button class="uk-button uk-button-primary uk-margin-small-left uk-margin-small-right" type="button"
        @click="saveProfile">Use</button>
    </div>
    <!-- This is the modal -->
    <div id="modal-confirm-delete-point" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Are you sure?</h2>
        </div>
        <div class="uk-modal-body">
          <p>You are deleting this point. This action cannot be undone</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-margin-right uk-modal-close" type="button">Cancel</button>
          <button class="uk-button uk-button-danger uk-modal-close" type="button" @click="removePoint">Delete</button>
        </div>
      </div>
    </div>
    <div id="modal-confirm-cancel-profile" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Are you sure?</h2>
        </div>
        <div class="uk-modal-body">
          <p>You are leaving this profile. This action cannot be undone</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-margin-right uk-modal-close" type="button">Cancel</button>
          <button class="uk-button uk-button-danger uk-modal-close" type="button"
            @click="this.$router.go(-1)">Leave</button>
        </div>
      </div>
    </div>
    <div id="modal-edit-point" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Edit Point</h2>
        </div>
        <div class="uk-modal-body">
          <form class="uk-form-horizontal uk-margin-small">

            <div class="uk-margin uk-flex">
              <label class="uk-text uk-margin-auto-vertical uk-margin-right" for="form-time">Time (s)</label>
              <div class="uk-form-controls">
                <input class="uk-input uk-form-width-small" id="form-time" type="number" placeholder="100"
                  v-model="markerData.time">
              </div>
            </div>
            <!-- Temperatures-->
            <div class="uk-margin uk-flex" v-for="(val, index) in markerData.temp" :key="index">
              <label class="uk-text uk-text-capitalize uk-margin-auto-vertical uk-margin-right"
                for="form-horizontal-text">{{HEATING_ZONES[index].name}} temperature (&deg;C)</label>
              <div class="uk-form-controls">
                <input class="uk-input uk-form-width-small" id="form-time" type="number" placeholder="100"
                  v-model="markerData.temp[index]">
              </div>
            </div>
            <!-- Required Sensors-->
            <div class="uk-margin uk-flex" v-for="(val, index) in markerData.miscRequiredSensor" :key="index">
              <label class="uk-text uk-text-capitalize uk-margin-auto-vertical uk-margin-right"
                for="form-horizontal-text">{{REQUIRED_SENSOR_INFO[index].name}}
                ({{REQUIRED_SENSOR_INFO[index].units}})</label>
              <div class="uk-form-controls">
                <input class="uk-input uk-form-width-small" id="form-time" type="number" placeholder="100"
                  v-model="markerData.miscRequiredSensor[index]">
              </div>
            </div>
            <!--Is required point-->
            <div class="uk-margin uk-flex">
              <label class="uk-text uk-text-capitalize uk-margin-auto-vertical uk-margin-right"
                for="form-horizontal-text">Wait at this point until all conditions are met?</label>
              <div class="uk-form-controls">
                <input class="uk-checkbox uk-form-width-small" id="form-time" type="checkbox" placeholder="100"
                  v-model="markerData.required">
              </div>
            </div>

          </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-primary uk-modal-close" type="button"
            @click="finishedEditPoint">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
  // @ is an alias to /src
  //import ProfileChart from "@/components/ProfileChart"
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ApexChart from "vue3-apexcharts";
  import * as machineVariables from "@/controller/machine";
  import * as gui from "@/controller/GUI";

  export default {
    name: "Profile",
    components: {
      //ProfileChart,
      ApexChart,
    },
    setup() {

    },
    beforeMount() {
      console.log("Mounted")
      this.$store.dispatch('profile/setProposedProfileFromCurrent');
    },
    data: function () {
      return {
        chartOptions: {
          chart: {
            id: "vuechart",
            selection: {
              enabled: false
            },
            zoom: {
              enabled: this.enableZoom
            },
          },
          stroke: {
            width: 1,
            dashArray: [0, 3, 5]
          },
          markers: {
            size: 10,
            hover: {
              sizeOffset: 0
            }
          },
          xaxis: {
            tooltip: {
              enabled: false,
            },
            title: {
              text: "Time (s)"
            },
          }
        },
        enableZoom: false,
        selectedMarker: -1,
        selectedSeries: -1,
        markerData: {},
        HEATING_ZONES: machineVariables.HEATING_ZONES,
        REQUIRED_SENSOR_INFO: machineVariables.REQUIRED_SENSOR_INFO,
      };
    },
    computed: {
      ...mapGetters({
        currentSeries: 'profile/getChartSeriesCurrent',
        proposedSeries: 'profile/getChartSeriesProposed',
        currentProfile: 'profile/getCurrent',
        proposedProfile: 'profile/getProposed',
      }),
      chartSeries() {
        return this.proposedSeries;
      },
      selectedMarkerTime() {
        return this.proposedProfile[this.selectedMarker].time;
      }
    },
    methods: {
      saveProfile() {
        this.setCurrentProfileFromProposed();
        this.$router.go(-1)
        console.log(this.currentProfile);
      },
      markerClick: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {
        console.log(`Marker ${dataPointIndex} clicked`);
        chartContext.toggleDataPointSelection(seriesIndex, dataPointIndex)
        //Check if we turning on or off
        if (this.selectedMarker === dataPointIndex && this.selectedSeries === seriesIndex) {
          this.selectedMarker = -1;
          this.selectedSeries = -1;
        }
        else {
          this.selectedMarker = dataPointIndex;
          this.selectedSeries = seriesIndex;
        }
        this.markerData = this.proposedProfile[this.selectedMarker];
      },
      increaseSelection: function () {
        // this.$refs.chart.toggleDataPointSelection(this.selectedSeries, this.selectedMarker);
        this.$refs.chart.toggleDataPointSelection(this.selectedSeries, ++this.selectedMarker)
        // this.toggleMarkersAtIndex(this.selectedMarker);
        // this.toggleMarkersAtIndex(++this.selectedMarker);
      },
      decreaseSelection: function () {
        //this.$refs.chart.toggleDataPointSelection(this.selectedSeries, this.selectedMarker);
        this.$refs.chart.toggleDataPointSelection(this.selectedSeries, --this.selectedMarker)
      },
      // toggleMarkersAtIndex: function (index) {
      //   for (let i = 0; i < this.proposedSeries.length; i++) {
      //     this.$refs.chart.toggleDataPointSelection(i, index)
      //   }
      // },
      addPoint: function () {
        let newTime = 0;
        let newPoint;
        //Set time
        if (this.selectedMarker !== -1) {
          newPoint = this.proposedProfile[this.selectedMarker].copyProperties();
          newPoint.time = this.selectedMarkerTime + gui.PROFILE_ADD_POINT_FORWARD_TIME;
        }
        else {
          newPoint = new machineVariables.CONTROL_STATE(0);
        }
        //Set the point
        this.addProposedPoint(newPoint);
      },
      removePoint: function () {
        this.removeProposedPoint(this.proposedProfile[this.selectedMarker]);
      },
      finishedEditPoint: function () {
        this.sortProposedPoints();
      },
      ...mapActions({
        addProposedPoint: 'profile/addProposedPoint',
        setCurrentProfileFromProposed: 'profile/setCurrentProfileFromProposed'
      }),
      ...mapMutations({
        removeProposedPoint: 'profile/removeProposedPoint',
        sortProposedPoints: 'profile/sortProposedPoints',
      })
    }
  };

</script>