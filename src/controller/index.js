import machine_comms from "./machine_comms";
import * as machine_info from "./machine_info";
import * as Util from "@/classes/Util";

export default class controller {
  constructor(app) {
    this.app = app;
    this._comms = new machine_comms(app);
    this._comms.on("dataReady", this.dataReady);

    this.mcuUpdateInterval = null;
    this.machineStartTime = null;
    this.lastUpdateTime = null;
  }
  //Run safety checks
  //Return 0 if switches are closed
  isLimitSwitchesClosed() {
    for (const [key, value] of Object.entries(
      this.app.$store.state.machine.limitSwitches
    )) {
      //Return name of switch that isnt closed
      if (!value.state) {
        return key;
      }
    }
    return 0;
  }

  //Attempt to begin sheet press
  //Return 1 if succescesful
  attemptToStartMachine() {
    // console.log(this.app.$store.state);
    let key = this.isLimitSwitchesClosed();
    // console.log(key);
    // console.log(machine_info.LIM_SWITCH_INFO);
    if (key != 0) {
      Util.showError(
        machine_info.LIM_SWITCH_INFO[key].description +
          " limit switch open. Failed to start"
      );
      return 0;
    }

    //Set start time
    this.machineStartTime = Date.now();
    this.app.$store.state.machine.machineRunCounter = 0;
    this.lastUpdateTime = Date.now();
    /* eslint-disable no-empty */
    //first clear so we dont duplicate
    try {
      clearInterval(this.mcuUpdateInterval);
    } catch {}
    this.mcuUpdateInterval = setInterval(
      () => this.sendMCUUpdate(),
      machine_info.MCU_UPDATE_INTERVAL
    );
    return 1;
  }

  /**
   * Runs every loop to update MCU of temperature values and other
   */
  sendMCUUpdate() {
    // console.log("startin");
    let runCountSeconds =
      this.app.$store.state.machine.machineRunCounter / 1000;

    // get limits
    this._comms._writeToMachine("l");

    //Get relevant profile points
    let profile = this.app.$store.getters["profile/getCurrent"];
    let [lowProfile, index] = Util.getClosestObjectBelow(
      profile,
      "time",
      runCountSeconds
    );

    let highProfile;
    let isLastPoint = false;
    // check if we are at the last point, otherwise high profile is the next point
    if (lowProfile == profile[profile.length - 1]) {
      console.log("Hit last point in profile");
      highProfile = profile[index];
      isLastPoint = true;
    } else {
      highProfile = profile[index + 1];
    }

    //Linearly extrapolate temperatures
    for (const [key] of Object.entries(machine_info.HEATING_ZONES)) {
      let setpoint = Util.linearExtrapolateData(
        lowProfile.time,
        lowProfile.temp[key],
        highProfile.time,
        highProfile.temp[key],
        runCountSeconds
      );
      this.app.$store.commit("machine/setSetpoint", [
        key,
        Math.round(setpoint)
      ]);
    }
    for (const [key] of Object.entries(machine_info.REQUIRED_SENSOR_INFO)) {
      let setpoint = Util.linearExtrapolateData(
        lowProfile.time,
        lowProfile.miscRequiredSensor[key],
        highProfile.time,
        highProfile.miscRequiredSensor[key],
        runCountSeconds
      );
      // console.log(lowProfile);
      // console.log(highProfile);
      this.app.$store.commit("machine/setRequiredSensorSetpoint", [
        key,
        Math.round(setpoint)
      ]);
    }
    //Send it out
    this._comms.setTemperatures();

    let allowedToContinue = true;
    //Check if we're at an inflection point (at a profile point)
    if (
      runCountSeconds - lowProfile.time <
      machine_info.MCU_UPDATE_INTERVAL / 1000
    ) {
      //We are at an inflection point
      if (lowProfile.required) {
        // console.log("We hit a required point");
        // console.log(profile);
        // check if requirements of profile are met
        allowedToContinue = this.checkHitProfile(this.app.$store);
      }
    }
    //Machine is paused. dont continue
    if (this.app.$store.state.machine.isPaused) {
      allowedToContinue = false;
    }
    //Increment counters if necessary
    if (allowedToContinue) {
      this.app.$store.state.machine.machineRunCounter +=
        Date.now() - this.lastUpdateTime;
      this.lastUpdateTime = Date.now();
    }
    console.log(this.app.$store.state.machine.machineRunCounter);

    // Stop machine if the last profile point has been reached
    if (isLastPoint) {
      this.app.$store.dispatch("machine/attemptToStopMachine");
    }
  }

  /**
   * Checks that we have satisfied all the requirements of a profile
   *
   * @returns {Boolean} True if all requirements are satsified within tolerances
   */
  checkHitProfile(profile) {
    for (
      let i = 0;
      i < profile.getters["machine/tempControllerCurrent"].length;
      i++
    ) {
      // console.log(profile.getters["machine/tempControllerCurrent"]);
      if (
        profile.getters["machine/tempControllerCurrent"][i] >
          profile.getters["machine/tempControllerSetpoints"][i] +
            machine_info.TEMP_TOLERANCE ||
        profile.getters["machine/tempControllerCurrent"][i] <
          profile.getters["machine/tempControllerSetpoints"][i] -
            machine_info.TEMP_TOLERANCE
      )
        return false;
    }
    return true;
  }

  //Runs when theres new data from machine
  dataReady() {
    // this.checkSafety();
  }

  checkSafety() {
    //Check all temp controllers
    for (const [key, tempCon] of Object.entries(
      this.app.$store.state.machine.temperatureControllers
    )) {
      //Check limits for temperatures
      if (
        tempCon.current > machine_info.HEATING_ZONES[key].limits[1] ||
        tempCon.current < machine_info.HEATING_ZONES[key].limits[0]
      ) {
        //Temps too high or low
        Util.showError("Temperature limits exceeded!");
        this.attemptToStopMachine();
      }
    }
    return 1;
  }

  // DON'T USE THIS FUNCTION (used in vue ux)
  attemptToStopMachine() {
    console.log("Attempting to turn off");
    //Stop updating
    clearInterval(this.mcuUpdateInterval);
    // console.log(this._comms);
    this._comms.setAllTemperaturesOff();
    return 1;
  }
}
