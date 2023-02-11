import Setting from "../classes/Setting";

export const PROFILE_ADD_POINT_FORWARD_TIME = 30;

export const SETTINGS = [new Setting({ name: "volume" })];

//Pages to show the top bar on
export const SHOW_TOP_BAR_PAGES = ["Run", "Stop", "Settings", "Shortcuts"];

// Array length changes number of buttons, range from 0 to 2
export const FRONT_PAGE_BUTTONS = [
  {
    icon: "",
    name: "Light On"
  },
  {
    icon: "",
    name: "Light Off"
  }
];
