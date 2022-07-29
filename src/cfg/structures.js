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
  copyProperties() {}
  setNull() {
    for (let i = 0; i < this.temp.length; i++) {
      this.temp[i] = null;
    }
    for (let key in this.miscRequiredSensor) {
      this.miscRequiredSensor[key] = null;
    }
    for (let key in this.miscOptionalSensor) {
      this.miscOptionalSensor[key] = null;
    }
  }
}

export function CONTROL_STATE_COPY_PROPERTIES(oldState) {
  return new CONTROL_STATE(
    oldState.time,
    [...oldState.temp],
    oldState.required,
    { ...oldState.miscRequiredSensor },
    { ...oldState.miscOptionalSensor }
  );
}

export function CONTROL_STATE_SET_NULL(oldState) {
  for (let i = 0; i < oldState.temp.length; i++) {
    oldState.temp[i] = null;
  }
  for (let key in oldState.miscRequiredSensor) {
    oldState.miscRequiredSensor[key] = null;
  }
  for (let key in oldState.miscOptionalSensor) {
    oldState.miscOptionalSensor[key] = null;
  }
}
