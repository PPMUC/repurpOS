export const HEATING_ZONES = {
  0: {
    name: "top plate",
    limits: [0, 1000]
  },
  1: {
    name: "bottom plate",
    limits: [0, 1000]
  }
};

export const REQUIRED_SENSOR_INFO = {
  pressure: {
    name: "plate pressure",
    units: "N",
    limits: [0, 1000]
  }
};

export const OPTIONAL_SENSOR_INFO = {
  hood: {
    name: "hood temperature",
    units: "&deg;C",
    limits: [0, 1000]
  },
  frame: {
    name: "frame temperature",
    units: "&deg;C",
    limits: [0, 1000]
  }
};

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

export const PROFILE_ADD_POINT_FORWARD_TIME = 30;
