import * as machine_info from "./machine_info";
const electron = window.require("electron");
const SerialPort = window.require("serialport");
const Readline = require("@serialport/parser-readline");
import * as Util from "@/classes/Util";
import { parse } from "@vue/compiler-dom";

var port, parser;

export default class machine_comms {
  constructor(app) {
    this.app = app;
    this._events = {
      dataReady: [],
      error: []
    };
    //Setup com port
    port = new SerialPort(machine_info.COM_PORT, {
      baudRate: 115200,
      autoOpen: false
    });
    port.on("error", (err) => {
      console.log(err);
      Util.showError(err);
    });
    //setup
    port.open((err) => {
      if (err) {
        Util.showError(err);
      }
      parser = new Readline();
      port.pipe(parser);
      parser.on("data", (data) => this.receiveData(data));
    });
  }

  setTemperatures() {
    // console.log(
    //   `Setting zone ${machine_info.HEATING_ZONES[zone].name} to ${temp}`
    // );
    // get states and make string
    let sendString = "a";
    let setpoints = this.app.$store.getters["machine/tempControllerSetpoints"];
    // console.log(setpoints);
    for (let setpoint of setpoints) {
      sendString += " " + setpoint;
    }
    // console.log(sendString);
    this._writeToMachine(sendString);
  }
  setAllTemperaturesOff() {
    for (const [key] of Object.entries(machine_info.HEATING_ZONES)) {
      this.app.$store.commit("machine/setSetpoint", [key, 0]);
    }
    this.setTemperatures();
  }

  //Turn light on
  lightOn() {
    console.log("Light on not implemented yet");
    Util.showError("Light on not implemented yet");
    //this._writeToMachine()
  }

  //Turn light off
  lightOff() {
    console.log("Light off not implemented yet");
    Util.showError("Light off not implemented yet");
  }

  _writeToMachine(message) {
    console.log("sending: " + message);
    port.write(message + "\n");
  }

  //Parse limit switches
  receiveLimit(data) {
    //Create array of elements sans whitespace
    let messageArray = data.split(/\s+/);
    messageArray = messageArray.filter((item) => item);

    //Using the index property, set states
    for (let limSwitch of this.app.$store.getters["machine/limitSwitches"]) {
      //Set limit switch state in store from message array according to predefined index
      limSwitch.state =
        messageArray[machine_info.LIM_SWITCH_INFO[limSwitch.name].index] ===
        "1";
    }
    // console.log(this.app.$store.getters["machine/limitSwitches"]);
    // console.log("limits changed");
  }

  receivePIDs(data) {
    // create message array without whitespace
    let messageArray = data.split(/\s+/);
    messageArray = messageArray.filter((item) => item);

    // TO BE COMPLETED =====================================================
  }

  receiveTemp(data) {
    // create message array without whitespace
    let messageArray = data.split(/\s+/);
    messageArray = messageArray.filter((item) => item);

    // set current temperatures using index property in required sensors
    for (let tempSensor of this.app.$store.getters["machine/optionalSensors"]) {
      tempSensor.current = Number(
        messageArray[machine_info.OPTIONAL_SENSOR_INFO[tempSensor.name].index]
      );
    }
    console.log(this.app.$store.getters["machine/optionalSensors"]);
    console.log("temperatures changed");
  }

  receivePressure(data) {
    // create message array without whitespace
    let messageArray = data.split(/\s+/);
    messageArray = messageArray.filter((item) => item);

    // set current pressures using index property in optional sensors
    for (let pressureSensor of this.app.$store.getters[
      "machine/requiredSensors"
    ]) {
      pressureSensor.current = Number(
        messageArray[
          machine_info.REQUIRED_SENSOR_INFO[pressureSensor.name].index
        ]
      );
    }
    console.log(this.app.$store.getters["machine/requiredSensors"]);
    console.log("pressures changed");
  }

  //Runs anytime any data is received on the serial port
  receiveData(data) {
    // console.log(this.app.$store);
    data = data.toString();
    console.log("received: " + data);
    let cmdChar = data.substr(0, 1);
    data = data.substr(1);
    switch (cmdChar) {
      case "L":
        this.receiveLimit(data);
        break;

      case "C":
        this.receivePIDs(data);
        break;

      case "T":
        this.receiveTemp(data);
        break;

      case "P":
        this.receivePressure(data);
        break;
    }
    this._emitDataReady();
  }

  //********************************************* */
  //Event emitters and all that
  on(name, listener) {
    if (!this._events[name]) {
      throw new Error(`Can't add a listener. Event "${name}" doesn't exist.`);
    }

    this._events[name].push(listener);
  }

  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      throw new Error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  _emitDataReady() {
    this._emit("dataReady");
  }
  _emitError(err) {
    this._emit("error", err);
  }
  _emit(name, data = {}) {
    const fireCallbacks = (callback) => {
      callback(data);
    };

    this._events[name].forEach(fireCallbacks);
  }
}
