import arduino from "./arduino";

export default {
  app: null,
  //Run safety checks
  //Return true if switches are closed
  isLimitSwitchesClosed() {
    for (const [key, value] of Object.entries(
      this.app.$store.state.machine.limitSwitches
    )) {
      if (!value) {
        return key;
      }
    }
    return 1;
  },

  //Attempt to begin sheet press
  //Return 1 if succescesful
  attemptToStartMachine() {
    console.log(this.app.$store.state);
    console.log(this.isLimitSwitchesClosed());
    return 1;
  },

  attemptToStopMachine() {
    console.log("Attempting to turn off");
    arduino.setAllTemperaturesOff();
    return 1;
  }
};
