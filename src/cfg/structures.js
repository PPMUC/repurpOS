import { CONTROL_STATE } from "@/controller/machine_info";

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
