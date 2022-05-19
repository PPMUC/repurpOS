export const HEATING_ZONES = {
  0: {
    name: "top plate",
    limits: [0, 400]
  },
  1: {
    name: "bottom plate",
    limits: [0, 400]
  }
};

export const REQUIRED_SENSOR_INFO = {
  pressure: {
    name: "plate pressure",
    units: "N",
    limits: [0, 1000],
    index: 0
  }
};

export const COM_PORT = "COM13";

// The interval in ms to update the arduino with new info
export const MCU_UPDATE_INTERVAL = 1000;

export const OPTIONAL_SENSOR_INFO = {
  hood: {
    name: "hood temperature",
    units: "C",
    limits: [0, 1000],
    index: 0
  },
  frame: {
    name: "frame temperature",
    units: "C",
    limits: [0, 1000],
    index: 1
  }
};

export const LIM_SWITCH_INFO = {
  frontT: {
    description: "front top switch",
    index: 0
  },
  frontB: {
    description: "front bottom switch",
    index: 1
  },
  leftT: {
    description: "left top switch",
    index: 2
  },
  leftB: {
    description: "left bottom switch",
    index: 3
  },
  backT: {
    description: "back top switch",
    index: 4
  },
  backB: {
    description: "back bottom switch",
    index: 5
  },
  rightT: {
    description: "right top switch",
    index: 6
  },
  rightB: {
    description: "right bottom switch",
    index: 7
  }
};

export const TEMP_TOLERANCE = 5;

export class CONTROL_STATE {
  constructor(
    time = 0,
    temp = [0, 0],
    required = false,
    miscRequiredSensor = {
      pressure: 0
    },
    miscOptionalSensor = {
      hood: 0,
      frame: 0
    }
  ) {
    this.time = time;
    this.temp = temp;
    this.required = required;
    this.miscRequiredSensor = miscRequiredSensor;
    this.miscOptionalSensor = miscOptionalSensor;
  }
  copyProperties() {
    return new CONTROL_STATE(
      this.time,
      [...this.temp],
      this.required,
      { ...this.miscRequiredSensor },
      { ...this.miscOptionalSensor }
    );
  }
}
