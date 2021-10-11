import * as machine from "./machine";

export default {
  app: null,

  setTemperature(zone, temp) {
    console.log(`Setting zone ${machine.HEATING_ZONES[zone].name} to ${temp}`);
  },
  setAllTemperaturesOff() {
    for (const [key] of Object.entries(machine.HEATING_ZONES)) {
      this.setTemperature(key, 0);
    }
  }
};
