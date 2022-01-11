<template>
  <div class="home uk-padding-remove">
    <div class="uk-flex uk-margin-remove" uk-grid>
      <div class="uk-card uk-card-default uk-card-body uk-width-1-4">
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
          <li class="uk-active">
            <a href="#"
              ><span class="uk-margin-small-right" uk-icon="icon: table"></span>
              Item</a
            >
          </li>
          <li>
            <a href="#"
              ><span
                class="uk-margin-small-right"
                uk-icon="icon: thumbnails"
              ></span>
              Item</a
            >
          </li>
          <li class="uk-nav-divider"></li>
          <li>
            <a href="#"
              ><span class="uk-margin-small-right" uk-icon="icon: trash"></span>
              Item</a
            >
          </li>
        </ul>
      </div>
      <div class="uk-width-expand">
        <hr class="uk-margin-remove-top" />
        <div class="uk-margin uk-margin-large-bottom uk-text-right">
          <button
            class="uk-button uk-button-default"
            type="button"
            uk-toggle="target: #modal-confirm-cancel-profile"
          >
            Cancel
          </button>
          <button
            class="
              uk-button
              uk-button-primary
              uk-margin-small-left
              uk-margin-small-right
            "
            type="button"
            @click="saveProfile"
          >
            Use
          </button>
        </div>
      </div>
    </div>

    <!-- This is the modal -->
    <div id="modal-confirm-cancel-profile" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Are you sure?</h2>
        </div>
        <div class="uk-modal-body">
          <p>You are leaving the settings. Your changes will not be saved</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button
            class="uk-button uk-button-default uk-margin-right uk-modal-close"
            type="button"
          >
            Cancel
          </button>
          <button
            class="uk-button uk-button-danger uk-modal-close"
            type="button"
            @click="this.$router.go(-1)"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
  // @ is an alias to /src
  //import ProfileChart from "@/components/ProfileChart"
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import * as machineVariables from "@/controller/machine_info";
  import * as gui from "@/controller/GUI";

  export default {
    name: "Profile",
    components: {
      //ProfileChart,
    },
    setup() {},
    beforeMount() {
      console.log("Mounted");
      this.$store.dispatch("profile/setProposedProfileFromCurrent");
    },
    data: function () {
      return {
        enableZoom: false,
        selectedMarker: -1,
        selectedSeries: -1,
        markerData: {},
        HEATING_ZONES: machineVariables.HEATING_ZONES,
        REQUIRED_SENSOR_INFO: machineVariables.REQUIRED_SENSOR_INFO
      };
    },
    computed: {
      ...mapGetters({
        currentSeries: "profile/getChartSeriesCurrent",
        proposedSeries: "profile/getChartSeriesProposed",
        currentProfile: "profile/getCurrent",
        proposedProfile: "profile/getProposed"
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
        this.$router.go(-1);
        console.log(this.currentProfile);
      },
      markerClick: function (
        event,
        chartContext,
        { seriesIndex, dataPointIndex, config }
      ) {
        console.log(`Marker ${dataPointIndex} clicked`);
        chartContext.toggleDataPointSelection(seriesIndex, dataPointIndex);
        //Check if we turning on or off
        if (
          this.selectedMarker === dataPointIndex &&
          this.selectedSeries === seriesIndex
        ) {
          this.selectedMarker = -1;
          this.selectedSeries = -1;
        } else {
          this.selectedMarker = dataPointIndex;
          this.selectedSeries = seriesIndex;
        }
        this.markerData = this.proposedProfile[this.selectedMarker];
      },
      increaseSelection: function () {
        // this.$refs.chart.toggleDataPointSelection(this.selectedSeries, this.selectedMarker);
        this.$refs.chart.toggleDataPointSelection(
          this.selectedSeries,
          ++this.selectedMarker
        );
        // this.toggleMarkersAtIndex(this.selectedMarker);
        // this.toggleMarkersAtIndex(++this.selectedMarker);
      },
      decreaseSelection: function () {
        //this.$refs.chart.toggleDataPointSelection(this.selectedSeries, this.selectedMarker);
        this.$refs.chart.toggleDataPointSelection(
          this.selectedSeries,
          --this.selectedMarker
        );
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
          newPoint.time =
            this.selectedMarkerTime + gui.PROFILE_ADD_POINT_FORWARD_TIME;
        } else {
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
        addProposedPoint: "profile/addProposedPoint",
        setCurrentProfileFromProposed: "profile/setCurrentProfileFromProposed"
      }),
      ...mapMutations({
        removeProposedPoint: "profile/removeProposedPoint",
        sortProposedPoints: "profile/sortProposedPoints"
      })
    }
  };
</script>
