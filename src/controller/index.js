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
    this.machineRunCounter = 0;
    this.lastUpdateTime = null;
  }
  //Run safety checks
  //Return true if switches are closed
  isLimitSwitchesClosed() {
    for (const [key, value] of Object.entries(
      this.app.$store.state.machine.limitSwitches
    )) {
      //Return name of switch that isnt closed
      if (!value.state) {
        return key;
      }
    }
    return 1;
  }

  //Attempt to begin sheet press
  //Return 1 if succescesful
  attemptToStartMachine() {
    console.log(this.app.$store.state);
    if (!this.isLimitSwitchesClosed()) {
      Util.showError("Limit switch open. Failed to start");
      return 0;
    }

    //Set start time
    this.machineStartTime = Date.now();
    this.machineRunCounter = 0;
    this.lastUpdateTime = Date.now();

    this.mcuUpdateInterval = setInterval(
      () => this.sendMCUUpdate(),
      machine_info.MCU_UPDATE_INTERVAL
    );
    return 1;
  }

  sendMCUUpdate() {
    console.log("startin");
    let runCountSeconds = this.machineRunCounter / 1000;

    //Get relevant profile points
    let profile = this.app.$store.getters["profile/getCurrent"];
    let [lowProfile, index] = Util.getClosestObjectBelow(
      profile,
      "time",
      runCountSeconds
    );
    let highProfile = profile[index + 1];

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
      this.app.$store.commit("machine/setRequiredSensorSetpoint", [
        key,
        Math.round(setpoint)
      ]);
    }
    //Send it out
    this._comms.setTemperatures();

    //Increment counters if necessary
    let allowedToContinue = true;
    if (allowedToContinue) {
      this.machineRunCounter += Date.now() - this.lastUpdateTime;
      this.lastUpdateTime = Date.now();
    }
    console.log(this.machineRunCounter);
  }

  //Runs when theres new data from machine
  dataReady() {
    this.checkSafety();
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

  attemptToStopMachine() {
    console.log("Attempting to turn off");
    //Stop updating
    clearInterval(this.mcuUpdateInterval);
    console.log(this._comms);
    this._comms.setAllTemperaturesOff();
    return 1;
  }
}
